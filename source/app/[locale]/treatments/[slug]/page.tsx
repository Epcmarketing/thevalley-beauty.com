import Link from "next/link";
import treatmentSeo from "@/lib/treatmentSeo.json";
import { CaseCarousel } from "@/components/CaseCarousel";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  isLocale,
  intlLocales,
  localeBase,
  localeRoot,
  buildAlternates,
  contentUrlPath,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  treatments,
  getTreatmentBySlug,
  imagesForTreatment,
} from "@/lib/treatments";
import { SITE_URL, clinic, WHATSAPP_NUMBER } from "@/lib/clinic";
import { ENGLISH_SEO_TITLES, englishTitle } from "@/lib/seoTitles";
import { ENGLISH_SEO_DESCRIPTIONS, englishDescription } from "@/lib/seoDescriptions";

type ProcKey = keyof Awaited<ReturnType<typeof getDictionary>>["procedures"];

export function generateStaticParams() {
  return intlLocales.flatMap((locale) =>
    treatments.map((t) => ({ locale, slug: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!isLocale(locale) || !treatment) return {};
  const dict = await getDictionary(locale);
  const item = dict.treatmentsMenu.items[treatment.key as keyof typeof dict.treatmentsMenu.items];
  const proc = dict.procedures[treatment.key as ProcKey];

  const localTitle = {
    en: `${item.name} in Kuala Lumpur`,
    zh: `吉隆坡${item.name}`,
    ja: `クアラルンプールの${item.name}`,
    ko: `쿠알라룸푸르 ${item.name}`,
    ms: `${item.name.replace(/\s*\([^)]*\)/g, "")} di Kuala Lumpur`,
  }[locale];
  const fallbackTitle = `${localTitle} | ${dict.brand.nameFull}`;
  const optimizedTitle = ENGLISH_SEO_TITLES.treatmentsByKey[
    treatment.key as keyof typeof ENGLISH_SEO_TITLES.treatmentsByKey
  ];
  const localizedSeo = treatmentSeo[treatment.key as keyof typeof treatmentSeo][locale];
  const title = localizedSeo?.title ?? (locale === "zh" && slug === "body-sculpting" ? "吉隆坡非手术身体塑形 | 悦谷美容医学中心" : englishTitle(locale, optimizedTitle, fallbackTitle));
  const optimizedDescription = ENGLISH_SEO_DESCRIPTIONS.treatmentsByKey[
    treatment.key as keyof typeof ENGLISH_SEO_DESCRIPTIONS.treatmentsByKey
  ];
  const description = localizedSeo?.description ?? (locale === "zh" && slug === "body-sculpting" ? "在吉隆坡 Sri Hartamas 悦谷美容医学中心了解非手术身体塑形。诊所邻近满家乐，咨询局部轮廓改善、疗程适合程度、效果限制与恢复安排。" : englishDescription(locale, optimizedDescription, proc.overview));

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: buildAlternates(locale, `treatments/${slug}`),
    openGraph: {
      type: "article",
      title,
      description,
      url: contentUrlPath(locale, `treatments/${slug}`),
      images: [{ url: "/images/og-cover.png", width: 1200, height: 630 }],
    },
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!isLocale(locale) || !treatment) notFound();

  const dict = await getDictionary(locale);
  const ui = dict.procedureUi;
  const item = dict.treatmentsMenu.items[treatment.key as keyof typeof dict.treatmentsMenu.items];
  const proc = dict.procedures[treatment.key as ProcKey];
  const images = imagesForTreatment(treatment);
  const isEnglishHifu = locale === "en" && slug === "hifu-lifting";
  const localizedSeo = treatmentSeo[treatment.key as keyof typeof treatmentSeo][locale];
  const bodyHeadings = localizedSeo?.headings;
  const faq = proc.faq;
  const base = localeBase(locale);
  const home = base || "/";
  const categoryLabel = treatment.category === "surgical" ? ui.surgical : ui.nonSurgical;

  const peers = treatments.filter((t) => t.category === treatment.category);
  const currentIndex = peers.findIndex((t) => t.slug === treatment.slug);
  const related = [...peers.slice(currentIndex + 1), ...peers.slice(0, currentIndex)].slice(0, 3);

  const pageUrl = `${SITE_URL}${contentUrlPath(locale, `treatments/${slug}`)}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        "@id": `${pageUrl}#procedure`,
        name: item.name,
        description: proc.overview,
        url: pageUrl,
        procedureType:
          treatment.category === "surgical"
            ? "https://schema.org/SurgicalProcedure"
            : "https://schema.org/NoninvasiveProcedure",
        provider: { "@type": "MedicalClinic", name: clinic.legalName, "@id": `${SITE_URL}/#clinic` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${SITE_URL}${localeRoot(locale)}` },
          { "@type": "ListItem", position: 2, name: ui.treatments, item: `${SITE_URL}${contentUrlPath(locale, "treatments")}` },
          { "@type": "ListItem", position: 3, name: item.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      {/* Hero */}
      <header className="relative overflow-hidden bg-ink pt-36 pb-20 text-ivory lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_88%_30%,rgba(176,141,87,0.28),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={home} className="hover:text-gold">{ui.home}</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={`${base}/treatments`} className="hover:text-gold">{ui.treatments}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-gold">{item.name}</li>
            </ol>
          </nav>

          <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">{categoryLabel}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-ivory text-balance lg:text-6xl">
            {localizedSeo?.h1 ?? (locale === "en" ? (isEnglishHifu ? "HIFU Treatment in Kuala Lumpur" : item.name + " in Kuala Lumpur") : (locale === "zh" && slug === "body-sculpting" ? "吉隆坡非手术身体塑形" : item.name))}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{proc.overview}</p>
          {locale === "en" && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">Visit The Valley Beauty Medical Spa in Desa Sri Hartamas, Kuala Lumpur, Malaysia. We welcome visitors from Mont Kiara and Bangsar at our Sri Hartamas location. Discuss your goals and a personalised treatment plan during your consultation.</p>}
          <Link
            href={`${base}/contact`}
            className="mt-9 inline-block rounded-full bg-gold px-8 py-4 text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
          >
            {ui.book}
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className="bg-ivory py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-3 lg:px-10">
          <div className="lg:col-span-2 lg:pr-10">
            {locale === "en" && slug === "eye-treatment" && (
              <section className="mb-14 rounded-sm border border-sand bg-cream p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">Start with your concern</p>
                <h2 className="mt-3 font-display text-3xl text-ink">What would you like to discuss about your eyelids?</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div><h3 className="font-display text-xl text-ink">Heavy or hooded upper lids</h3><p className="mt-2 leading-relaxed text-ink-soft">Explain whether your concern is excess skin, eyelid shape or a tired-looking appearance. Bring questions about upper-eyelid surgery and the changes you hope to achieve.</p></div>
                  <div><h3 className="font-display text-xl text-ink">Under-eye bags</h3><p className="mt-2 leading-relaxed text-ink-soft">If you are researching eye bag removal in KL, discuss the specific changes beneath your eyes. Ask whether lower-eyelid surgery is appropriate for your concern and what its limitations are.</p></div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-taupe">A search term or photograph cannot determine suitability. Your consultation should cover your goals, eye health, previous procedures, alternatives and recovery arrangements.</p>
                <a href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hello, I would like to arrange an eyelid surgery consultation at The Valley Beauty in Sri Hartamas.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm text-white hover:bg-gold-deep">Ask about eyelid surgery on WhatsApp →</a>
              </section>
            )}
            {/* Benefits */}
            <section>
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{bodyHeadings?.benefits ?? ui.benefits}</h2>
              <ul className="mt-6 space-y-4">
                {proc.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg leading-relaxed text-ink-soft">
                    <span className="mt-1.5 text-gold">✦</span>
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* Who it's for */}
            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{bodyHeadings?.whoFor ?? ui.whoFor}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{renderWithLinks(proc.whoFor, base)}</p>
            </section>

            {/* What the procedure involves */}
            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{bodyHeadings?.how ?? ui.how}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{renderWithLinks(proc.how, base)}</p>
            </section>

            {/* Recovery */}
            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{bodyHeadings?.recovery ?? ui.recovery}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{renderWithLinks(proc.recovery, base)}</p>
            </section>

            {/* Risks & considerations */}
            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{bodyHeadings?.considerations ?? ui.considerations}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{renderWithLinks(proc.considerations, base)}</p>
            </section>

            {/* Before & After */}
            {images.length > 0 && (
              <section className="mt-14 border-t border-sand pt-10">
                <h2 className="font-display text-3xl text-ink">{bodyHeadings?.results ?? ui.results}</h2>
                {slug === "cell-light-therapy" ? <CaseCarousel faceImages={images} name={item.name} /> : <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {images.map((src, i) => (
                    <figure
                      key={src}
                      className="overflow-hidden rounded-sm border border-sand bg-cream"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${item.name} — ${dict.results.title} ${i + 1} · ${dict.brand.name}, Kuala Lumpur`}
                        loading="lazy"
                        className="w-full"
                      />
                    </figure>
                  ))}
                </div>}
                <p className="mt-4 text-xs text-taupe">{dict.results.note}</p>
              </section>
            )}

            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="font-display text-3xl text-ink">{bodyHeadings?.nextSteps ?? ui.results}</h2>
              <p className="mt-4 text-sm leading-relaxed text-taupe">{dict.results.note}</p>
              <div className="mt-6 flex flex-wrap gap-6 text-base text-gold-deep">
                <Link href={base + "/results/"} className="underline">{dict.results.title} →</Link>
                <Link href={base + "/reviews/"} className="underline">{dict.nav.reviews} →</Link>
                <Link href={base + "/contact/"} className="underline">{ui.book} →</Link>
              </div>
            </section>

            {locale === "en" && slug === "eye-treatment" && (
              <section className="mt-14 border-t border-sand pt-10">
                <h2 className="font-display text-3xl text-ink">Read more before your consultation</h2>
                <p className="mt-4 leading-relaxed text-ink-soft">Use these guides to prepare your questions, then discuss your own situation during a consultation.</p>
                <div className="mt-5 space-y-4">
                  <Link className="block text-gold-deep underline underline-offset-4" href="/magazine/under-eye-bag-removal-lower-eyelid-surgery-kuala-lumpur/">Under-eye bags and lower-eyelid surgery →</Link>
                  <Link className="block text-gold-deep underline underline-offset-4" href="/magazine/double-eyelid-surgery-vs-eyelid-lift-ptosis/">Double-eyelid surgery, eyelid lift and ptosis: understanding the differences →</Link>
                </div>
              </section>
            )}
            {/* FAQ */}
            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="font-display text-3xl text-ink">{bodyHeadings?.faq ?? ui.faq}</h2>
              <dl className="mt-6 space-y-6">
                {faq.map((f, i) => (
                  <div key={i}>
                    <dt className="font-display text-xl text-ink"><h3>{f.q}</h3></dt>
                    <dd className="mt-2 text-base leading-relaxed text-ink-soft">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
            {isEnglishHifu && <section className="mt-14 border-t border-sand pt-10">
              <h2 className="font-display text-3xl text-ink">Explore results and patient reviews</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">Browse treatment photos and original patient feedback before arranging your consultation. Individual results vary.</p>
              <div className="mt-6 flex flex-wrap gap-6 text-base text-gold-deep">
                <Link href="/results/" className="underline">View before &amp; after results →</Link>
                <Link href="/reviews/" className="underline">Read patient reviews →</Link>
                <Link href="/contact/" className="underline">Book a HIFU consultation →</Link>
                <Link href="/sri-hartamas-cosmetic-surgery/" className="underline">Find our aesthetic clinic in Desa Sri Hartamas →</Link>
                <Link href="/magazine/hifu-candidacy-guide-kuala-lumpur/" className="underline">Read the HIFU suitability guide →</Link>
                <Link href="/magazine/hifu-vs-onda-vs-titanium-ultrasound-which-lift/" className="underline">Compare lifting treatments →</Link>
                <a href="https://wa.me/60109118518?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20HIFU%20treatment%20and%20pricing." target="_blank" rel="noopener noreferrer" className="underline">Ask about HIFU on WhatsApp →</a>
              </div>
            </section>}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-sm border border-sand bg-cream p-7">
              <p className="font-display text-2xl text-ink">{dict.cta.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{ui.consultNote}</p>
              <Link
                href={`${base}/contact`}
                className="mt-6 block rounded-full bg-gold px-6 py-3.5 text-center text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
              >
                {ui.book}
              </Link>
              <Link
                href={`${base}/treatments`}
                className="mt-4 block text-center text-xs tracking-[0.14em] uppercase text-gold-deep hover:text-gold"
              >
                {ui.allTreatments} →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-10">
            <div className="border-t border-sand pt-12">
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{bodyHeadings?.related ?? ui.related}</h2>
              <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-sand bg-sand sm:grid-cols-3">
                {related.map((t) => {
                  const ri = dict.treatmentsMenu.items[t.key as keyof typeof dict.treatmentsMenu.items];
                  return (
                    <Link
                      key={t.slug}
                      href={`${base}/treatments/${t.slug}`}
                      className="group bg-ivory p-7 transition-colors hover:bg-cream"
                    >
                      <h3 className="font-display text-2xl text-ink group-hover:text-gold-deep">{ri.name}</h3>
                      <p className="mt-2 text-sm text-taupe">{ri.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// Render paragraph text with inline [label](relative/path) tokens converted
// to internal <Link>s. Paths are appended to the locale base so the same
// dictionary string works across all languages.
function renderWithLinks(text: string, base: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link
        key={`l-${key++}`}
        href={`${base}/${m[2].replace(/^\/+/, "")}`}
        className="text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
      >
        {m[1]}
      </Link>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
