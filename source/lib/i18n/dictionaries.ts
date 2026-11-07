import "server-only";
import type { Locale } from "./config";

type EnglishDictionary = typeof import("../../dictionaries/en.json");
type MagazineSection = {
  heading: string;
  body: string[];
  image?: string;
  imageAlt?: string;
  comparison?: { caption: string; headers: string[]; rows: string[][] };
  questions?: string[];
  subsections?: { heading: string; body: string[] }[];
};
export type Dictionary = Omit<EnglishDictionary, "magazine"> & {
  magazine: Omit<EnglishDictionary["magazine"], "posts"> & {
    posts: Omit<EnglishDictionary["magazine"]["posts"], "picoLaserAftercare" | "hifuCandidacyGuide"> & {
      hifuCandidacyGuide: Omit<EnglishDictionary["magazine"]["posts"]["hifuCandidacyGuide"], "sections" | "dateModified" | "coverAlt" | "lead" | "seoTitle" | "metaDescription"> & {
        sections: MagazineSection[];
        dateModified?: string;
        coverAlt?: string;
        lead?: string;
        seoTitle?: string;
        metaDescription?: string;
      };
      picoLaserAftercare: Omit<EnglishDictionary["magazine"]["posts"]["picoLaserAftercare"], "sections" | "dateModified"> & {
        sections: MagazineSection[];
        dateModified?: string;
      };
    };
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("../../dictionaries/en.json").then((m) => m.default),
  zh: () => import("../../dictionaries/zh.json").then((m) => m.default),
  ko: () => import("../../dictionaries/ko.json").then((m) => m.default),
  ja: () => import("../../dictionaries/ja.json").then((m) => m.default),
  ms: () => import("../../dictionaries/ms.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
