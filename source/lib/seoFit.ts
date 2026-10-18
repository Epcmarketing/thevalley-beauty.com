import type { Locale } from "@/lib/i18n/config";

// Search results truncate titles and descriptions by pixel width, not by
// character count. CJK characters render roughly twice as wide as Latin ones,
// so they count double here. Limits approximate Google's desktop snippet.
const TITLE_MAX = 65;
const DESCRIPTION_MAX = 160;

function width(text: string): number {
  let w = 0;
  for (const ch of text) w += ch.codePointAt(0)! > 0x2e80 ? 2 : 1;
  return w;
}

// Cut to fit `max`, preferring a word boundary for Latin text, then add "…".
function truncate(text: string, max: number): string {
  let out = "";
  for (const ch of text) {
    if (width(out + ch) > max - 1) break;
    out += ch;
  }
  const lastSpace = out.lastIndexOf(" ");
  if (lastSpace > out.length * 0.6) out = out.slice(0, lastSpace);
  return `${out.replace(/[\s,，、;；:：—–-]+$/u, "")}…`;
}

const SHORT_BRAND: Record<Locale, string> = {
  en: "The Valley Beauty",
  ms: "The Valley Beauty",
  zh: "悦谷美容",
  ja: "ザ・ヴァレー",
  ko: "더 밸리",
};

// Fit a "<headline> | <brand>" title: try the full brand, then the short brand,
// then the headline alone, then the headline's first clause, then truncate.
export function fitTitle(title: string, locale: Locale): string {
  if (width(title) <= TITLE_MAX) return title;
  const sep = title.match(/\s*[|｜]\s*(?=[^|｜]*$)/);
  const head = sep ? title.slice(0, sep.index).trim() : title.trim();
  const candidates = [`${head} | ${SHORT_BRAND[locale]}`, head];
  // A long headline often has a self-contained first clause before a dash or
  // colon ("Ask who gives your anaesthesia — the question that…").
  const clause = head.split(/\s+[—–]\s+|\s*——\s*|[：:]\s*/u)[0]?.trim();
  if (clause && clause !== head && width(clause) >= 24) {
    candidates.push(`${clause} | ${SHORT_BRAND[locale]}`, clause);
  }
  for (const c of candidates) if (width(c) <= TITLE_MAX) return c;
  return truncate(head, TITLE_MAX);
}

// Fit a description by keeping whole sentences while they fit; if even the
// first sentence is too long, cut it at a word boundary.
export function fitDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (width(clean) <= DESCRIPTION_MAX) return clean;
  const sentences = clean.match(/[^.!?。！？]+[.!?。！？]+["”」』)）]?\s*/gu) ?? [clean];
  let out = "";
  for (const s of sentences) {
    if (width(out + s) > DESCRIPTION_MAX) break;
    out += s;
  }
  out = out.trim();
  // One short sentence makes a thin snippet; show more of the text instead.
  return width(out) >= 110 ? out : truncate(clean, DESCRIPTION_MAX);
}
