import type { Metadata } from "next";
import { ArchiveShowcase } from "@/components/ArchiveShowcase";
import { notFound } from "next/navigation";
import { Testimonials } from "@/components/Testimonials";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildAlternates, intlLocales, isLocale, localeBase } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/clinic";
import { ENGLISH_SEO_TITLES, englishTitle } from "@/lib/seoTitles";
import { ENGLISH_SEO_DESCRIPTIONS, englishDescription } from "@/lib/seoDescriptions";

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const title = englishTitle(locale, ENGLISH_SEO_TITLES.reviews, `${dict.nav.reviews} | ${dict.brand.nameFull}`);
  const description = englishDescription(locale, ENGLISH_SEO_DESCRIPTIONS.reviews, dict.testimonials.subtitle);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: buildAlternates(locale, "reviews"),
    openGraph: { type: "website", title, description, url: `/${locale === "en" ? "" : `${locale}/`}reviews/`, images: [{ url: "/images/og-cover.png", width: 1200, height: 630 }] },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <ArchiveShowcase dict={dict} base={localeBase(locale)} mode="reviews" />;
}
