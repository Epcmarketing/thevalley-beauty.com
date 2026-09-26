import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, clinic } from "@/lib/clinic";

const slug = "bangsar-aesthetic-clinic";
const pageUrl = `${SITE_URL}/${slug}/`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Aesthetic Clinic Near Bangsar | The Valley Beauty",
  description:
    "Aesthetic treatments and cosmetic surgery near Bangsar, Kuala Lumpur. Visit The Valley Beauty in Desa Sri Hartamas for liposuction, HIFU, pico laser and more.",
  alternates: { canonical: `/${slug}/` },
  openGraph: {
    type: "website",
    title: "Aesthetic Clinic Near Bangsar | The Valley Beauty",
    description:
      "Aesthetic treatments and cosmetic surgery for Bangsar patients at our Desa Sri Hartamas clinic in Kuala Lumpur.",
    url: `/${slug}/`,
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630 }],
  },
};

const faq = [
  {
    q: "Where is the clinic located in relation to Bangsar?",
    a: "The Valley Beauty is located at Lot 22-1, Wisma Rapid, Jalan 30/70A, Desa Sri Hartamas, 50480 Kuala Lumpur. Bangsar patients can reach the clinic by car or ride-hailing service; journey time varies with traffic.",
  },
  {
    q: "Which treatments are available for Bangsar patients?",
    a: "Our clinic offers cosmetic surgery, body contouring and skin treatments including liposuction, rhinoplasty, eye treatment, facelift, HIFU lifting, pico laser, laser hair removal and LED light therapy.",
  },
  {
    q: "Can I book a consultation before choosing a treatment?",
    a: "Yes. Every treatment plan begins with a private consultation so the team can assess your goals, suitability, expected result, downtime and aftercare before you decide.",
  },
];

export default function BangsarAestheticClinicPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${SITE_URL}/#clinic`,
        name: clinic.legalName,
        url: pageUrl,
        telephone: clinic.telephone,
        priceRange: clinic.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address.street,
          addressLocality: clinic.address.locality,
          addressRegion: clinic.address.region,
          postalCode: clinic.address.postalCode,
          addressCountry: clinic.address.country,
        },
        areaServed: { "@type": "Place", name: "Bangsar, Kuala Lumpur" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Bangsar", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <article className="bg-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />

      <header className="relative overflow-hidden bg-ink pt-32 pb-20 text-ivory lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.16em] uppercase text-ivory/55">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span className="mx-2" aria-hidden>·</span>
            <span className="text-gold">Bangsar</span>
          </nav>
          <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">Serving Bangsar</p>
          <h1 className="mt-5 font-display text-[2.4rem] leading-[1.12] text-ivory text-balance lg:text-[3.6rem] lg:leading-[1.08]">
            Aesthetic Clinic Near Bangsar, Kuala Lumpur
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80">
            Cosmetic surgery, body contouring and advanced skin treatments for Bangsar patients at our Desa Sri Hartamas clinic. Consultations are available in English, Bahasa Malaysia and Mandarin Chinese.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/contact/" className="rounded-full bg-gold px-7 py-3 text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep">
              Book a consultation
            </Link>
            <Link href="/treatments/" className="border-b border-ivory/40 pb-1 text-xs tracking-[0.14em] uppercase text-ivory/85 hover:text-gold">
              Explore treatments →
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[44rem] px-6 py-16 lg:px-8 lg:py-24">
        <Section number="01" title="Aesthetic care for patients from Bangsar">
          The Valley Beauty welcomes patients from Bangsar, Bangsar South and nearby Kuala Lumpur neighbourhoods. Our clinic is physically located in Desa Sri Hartamas, where every plan begins with a private assessment of your goals, medical history and expected downtime.
        </Section>
        <Section number="02" title="Cosmetic surgery and non-surgical treatments">
          Surgical options include <InlineLink href="/treatments/liposuction/">liposuction</InlineLink>, <InlineLink href="/treatments/rhinoplasty/">rhinoplasty</InlineLink>, eye treatment, facelift, breast implant and chin implant. Non-surgical care includes <InlineLink href="/treatments/hifu-lifting/">HIFU lifting</InlineLink>, <InlineLink href="/treatments/pico-laser/">pico laser</InlineLink>, body sculpting, laser hair removal and LED light therapy.
        </Section>
        <Section number="03" title="Choosing the right treatment">
          A consultation compares suitable surgical and non-surgical options, realistic outcomes, recovery time and aftercare. The aim is to recommend the most appropriate route for your anatomy and priorities—not simply the most intensive procedure.
        </Section>
        <Section number="04" title="Travelling from Bangsar to our clinic">
          The clinic is at Lot 22-1, Wisma Rapid, Jalan 30/70A, Desa Sri Hartamas, 50480 Kuala Lumpur. Travel time from Bangsar varies with traffic, so our team can help you plan your appointment and provide the exact map location by WhatsApp.
        </Section>

        <section className="mt-16 border-t border-sand pt-12">
          <h2 className="font-display text-[1.7rem] text-ink lg:text-[2rem]">FAQ — Bangsar</h2>
          <dl className="mt-7 space-y-7">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-lg text-ink">{item.q}</dt>
                <dd className="mt-2 text-[1.02rem] leading-[1.85] text-ink-soft">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-14 border-t border-sand pt-10">
          <Link href="/contact/" className="inline-flex rounded-full bg-gold px-7 py-3 text-xs tracking-[0.14em] uppercase text-white hover:bg-gold-deep">
            Book a consultation
          </Link>
        </div>
      </div>
    </article>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-lg text-gold/70">{number}</span>
        <h2 className="font-display text-[1.7rem] leading-snug text-ink lg:text-[2rem]">{title}</h2>
      </div>
      <p className="mt-5 text-[1.075rem] leading-[1.9] text-ink-soft">{children}</p>
    </section>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="text-gold-deep underline decoration-gold/40 underline-offset-4 hover:text-gold">{children}</Link>;
}
