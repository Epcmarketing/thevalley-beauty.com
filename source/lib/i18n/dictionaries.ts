import "server-only";
import type { Locale } from "./config";

type EnglishDictionary = typeof import("../../dictionaries/en.json");
type MagazineSection = {
  heading: string;
  body: string[];
  image?: string;
  imageAlt?: string;
  subsections?: { heading: string; body: string[] }[];
};
export type Dictionary = Omit<EnglishDictionary, "magazine"> & {
  magazine: Omit<EnglishDictionary["magazine"], "posts"> & {
    posts: Omit<EnglishDictionary["magazine"]["posts"], "picoLaserAftercare"> & {
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
