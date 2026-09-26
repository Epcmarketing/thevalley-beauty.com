import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Results } from "@/components/Results";
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
  const title = englishTitle(locale, ENGLISH_SEO_TITLES.results, `${dict.nav.gallery} | ${dict.brand.nameFull}`);
  const description = englishDescription(locale, ENGLISH_SEO_DESCRIPTIONS.results, dict.results.subtitle);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: buildAlternates(locale, "results"),
    openGraph: { type: "website", title, description, url: `/${locale === "en" ? "" : `${locale}/`}results/`, images: [{ url: "/images/og-cover.png", width: 1200, height: 630 }] },
  };
}

export default async function ResultsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const home = localeBase(locale) || "/";
  return (
    <article className="bg-ivory">
      <header className="bg-ink pt-36 pb-16 text-ivory lg:pt-44 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="text-[11px] tracking-[0.16em] uppercase text-ivory/55" aria-label="Breadcrumb">
            <Link href={home} className="hover:text-gold">{dict.nav.home}</Link><span className="mx-2">·</span><span className="text-gold">{dict.nav.gallery}</span>
          </nav>
          <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">{dict.results.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight lg:text-6xl">Before &amp; After Results in Kuala Lumpur</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ivory/75">Explore real patient outcomes across liposuction, pico laser, facial procedures and other aesthetic treatments at our clinic near Mont Kiara and Sri Hartamas. Results vary by patient.</p>
        </div>
      </header>
      <Results dict={dict} />
    </article>
  );
}
