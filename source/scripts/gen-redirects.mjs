// GitHub Pages ignores Netlify/Cloudflare-style `_redirects` files, so old URLs
// would 404 there. After `next build`, this writes a tiny HTML page at each old
// URL that sends visitors (and Google) to the new one with an instant
// meta-refresh plus a canonical tag — GitHub Pages' supported redirect method.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const SITE = "https://thevalley-beauty.com";
const PREFIXED_LOCALES = ["zh", "ko", "ja", "ms"];

// Renamed or merged pages: old path -> new path (locale-neutral, no slashes).
// Applied to English (root) and every prefixed locale.
const RENAMED = {
  "treatments/onda-pro": "treatments/sculpt-pro",
  "treatments/onda-pro-microwave-lifting": "treatments/sculpt-pro",
  "treatments/onda-body-contouring": "treatments/sculpt-pro",
  "treatments/hifu": "treatments/hifu-lifting",
  "treatments/cell-light": "treatments/cell-light-therapy",
  "magazine/onda-pro-treatment-what-it-actually-does-kuala-lumpur":
    "magazine/sculpt-pro-treatment-what-it-actually-does-kuala-lumpur",
};

function page(target) {
  const url = `${SITE}${target}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
</head><body><a href="${target}">${url}</a></body></html>
`;
}

let written = 0;
function write(fromPath, toPath) {
  const dir = path.join(OUT, fromPath);
  const file = path.join(dir, "index.html");
  if (fs.existsSync(file)) return; // never overwrite a real page
  if (!fs.existsSync(path.join(OUT, toPath, "index.html"))) {
    console.warn(`gen-redirects: target missing, skipped ${fromPath} -> ${toPath}`);
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, page(`/${toPath}${toPath ? "/" : ""}`.replace(/\/+$/, "/")));
  written++;
}

// 1. Renamed pages, in every locale.
for (const [from, to] of Object.entries(RENAMED)) {
  write(from, to);
  for (const l of PREFIXED_LOCALES) write(`${l}/${from}`, `${l}/${to}`);
}

// 2. English used to live under /en/. Mirror every English page at /en/...
const skip = new Set(["_next", "_not-found", "404", "images", "en", ...PREFIXED_LOCALES]);
function walk(rel) {
  const abs = path.join(OUT, rel);
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (!entry.isDirectory() || (rel === "" && skip.has(entry.name))) continue;
    const child = rel ? `${rel}/${entry.name}` : entry.name;
    if (fs.existsSync(path.join(OUT, child, "index.html"))) write(`en/${child}`, child);
    walk(child);
  }
}
write("en", "");
walk("");

console.log(`gen-redirects: wrote ${written} redirect pages`);
