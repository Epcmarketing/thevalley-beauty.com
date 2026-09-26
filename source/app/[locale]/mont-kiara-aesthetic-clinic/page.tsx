import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocale,
  intlLocales,
  buildAlternates,
  contentUrlPath,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/clinic";
import { getAreaBySlug } from "@/lib/localAreas";
import { LocalLandingPage } from "@/components/LocalLandingPage";
import { ENGLISH_SEO_TITLES, englishTitle } from "@/lib/seoTitles";
import { ENGLISH_SEO_DESCRIPTIONS, englishDescription } from "@/lib/seoDescriptions";

const SLUG = "mont-kiara-aesthetic-clinic";

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const c = dict.localAreas.montKiara;
  const title = englishTitle(locale, ENGLISH_SEO_TITLES.montKiara, c.metaTitle);
  const description = englishDescription(locale, ENGLISH_SEO_DESCRIPTIONS.montKiara, c.metaDescription);

  return {
    title,
    description,
    alternates: buildAlternates(locale, SLUG),
    openGraph: {
      type: "website",
      title,
      description,
      url: contentUrlPath(locale, SLUG),
      images: [{ url: `${SITE_URL}/images/og-cover.png`, width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function MontKiaraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const area = getAreaBySlug(SLUG);
  if (!area) notFound();
  return <LocalLandingPage area={area} dict={dict} locale={locale as Locale} />;
}
