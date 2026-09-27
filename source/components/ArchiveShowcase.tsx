"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { surgicalGallery, nonSurgicalGallery, reviewImages } from "@/lib/galleryData";
import { treatments } from "@/lib/treatments";
import { withBasePath } from "@/lib/basePath";
import { clinic } from "@/lib/clinic";
import "./archive-showcase.css";

// Excerpts checked against the original messages; no invented names or ratings.
const messageExcerpts = [
  { text: "Service is good! 👍🏻 Laser treatment is effective and can see results! 😍", file: "review-01.png", topic: "Laser treatment", lang: "en" },
  { text: "恢复到很好 医生手工很好", file: "review-02.jpg", topic: "Recovery feedback", lang: "zh" },
  { text: "你们服务很好 在你们那里做项目，很舒服很满意", file: "review-03.jpg", topic: "Patient care", lang: "zh" },
  { text: "时时刻刻都一直来问候我和妈咪", file: "review-04.jpg", topic: "Follow-up care", lang: "zh" },
];

export function ArchiveShowcase({ dict, base, mode }: { dict: Dictionary; base: string; mode: "results" | "reviews" }) {
  const [filter, setFilter] = useState("all");
  const reviews = mode === "reviews";
  const items = [...surgicalGallery.map(item => ({ ...item, category: "surgical" })), ...nonSurgicalGallery.map(item => ({ ...item, category: "non-surgical" }))];
  const questions = reviews ? [
    ["Where can I read more reviews?", "Visit our Google profile using the link above to read reviews on Google. You can also browse the patient messages on this page."],
    ["Will my experience and results be the same?", "Every patient is different. Reviews describe individual experiences and do not guarantee a particular outcome. Discuss your goals and suitability during a consultation."],
    ["Can I share my own experience?", "Yes. You can leave an honest review on our Google profile or contact our team directly with feedback about your visit."],
  ] : [
    ["How should I use these before and after photos?", "These examples help you discuss your goals with our team. Results vary between individuals; photographs cannot predict your own outcome."],
    ["How long do results typically last?", "This depends on the treatment, your individual circumstances and aftercare. Visit the treatment page and speak with our team about recovery and maintenance."],
    ["Which treatment is right for me?", "Book a consultation at our Desa Sri Hartamas, Kuala Lumpur clinic to discuss your goals, suitability, expected benefits and risks."],
  ];
  return <article className="archive-showcase">
    <header className="archive-hero">
      <p className="archive-eyebrow">{reviews ? "Reviews" : "Results"}</p>
      <h1>{reviews ? "Patient Stories" : "Before & After"}</h1>
      <p className="archive-subtitle">{reviews ? "Experiences shared by our patients" : "Treatment results from our Kuala Lumpur clinic"}</p>
      <span className="archive-side">{reviews ? "REAL PEOPLE · PERSONAL STORIES" : "INDIVIDUAL RESULTS · PERSONAL CARE"}</span>
    </header>
    <div className="archive-content">
      {reviews ? <>
        <a className="archive-google" href={clinic.googleProfile} target="_blank" rel="noopener noreferrer">Read our Google reviews <span aria-hidden="true">↗</span></a>
        <section className="archive-review-intro"><h2>The Valley Beauty Reviews in Kuala Lumpur</h2><p>Read patient feedback about treatment, recovery and follow-up care at The Valley Beauty Medical Spa in Desa Sri Hartamas, Kuala Lumpur, near Mont Kiara. These excerpts link to the original WhatsApp messages below.</p></section>
        <div className="archive-quotes">{messageExcerpts.map((quote, i) => <figure key={i}>
          <span className="archive-quote-mark" aria-hidden="true">“</span><blockquote lang={quote.lang}>{quote.text}</blockquote>
          <figcaption><span>{quote.topic}</span><a href={withBasePath(`/images/reviews/${quote.file}`)} target="_blank" rel="noopener noreferrer">Original message ↗</a></figcaption>
        </figure>)}</div>
        <div className="archive-section-title"><h2>WhatsApp Reviews</h2><span>Patient messages</span></div>
        <div className="archive-messages">{reviewImages.map((file, i) => <a key={file} href={withBasePath(`/images/reviews/${file}`)} target="_blank" rel="noopener noreferrer" aria-label={`Open patient message ${i + 1} at full size`}>
          <img src={withBasePath(`/images/reviews/${file}`)} alt={`Patient message ${i + 1} shared with The Valley Beauty`} loading="lazy" />
          <span>View full message ↗</span>
        </a>)}</div>
        <a className="archive-google" href={clinic.googleProfile} target="_blank" rel="noopener noreferrer">Read more Google reviews →</a>
      </> : <>
        <div className="archive-filters" aria-label="Filter treatment results">{[["all", "All"], ["surgical", dict.results.tabs.surgical], ["non-surgical", dict.results.tabs.nonSurgical]].map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div>
        <div className="archive-grid">{items.filter(item => filter === "all" || item.category === filter).map((item, i) => {
          const info = dict.treatmentsMenu.items[item.labelKey as keyof Dictionary["treatmentsMenu"]["items"]];
          const treatment = treatments.find(t => t.key === item.labelKey);
          return <section className="archive-card" key={`${item.category}-${item.labelKey}-${i}`}>
            <div className="archive-photo">{item.beforeFile ? <div className="archive-pair">{[item.beforeFile, item.afterFile].map((file, n) => <div key={file}><img src={withBasePath(`/images/${item.category}/${file}`)} alt={`${info?.name} ${n === 0 ? "before" : "after"}`} loading="lazy"/><span>{n === 0 ? dict.results.beforeLabel : dict.results.afterLabel}</span></div>)}</div> : <img src={withBasePath(`/images/${item.category}/${item.file}`)} alt={`${info?.name || item.labelKey} treatment example`} loading="lazy"/>}</div>
            <h2>{info?.name || item.labelKey}</h2>
            {treatment && <Link href={`${base}/treatments/${treatment.slug}/`}>View treatment <span aria-hidden="true">→</span></Link>}
          </section>;
        })}</div>
        <p className="archive-note">{dict.results.note}</p>
      </>}
      <section className="archive-faq"><div className="archive-section-title"><h2>Questions about {reviews ? "patient reviews" : "our results"}</h2><span>Find the answers you need</span></div>
        {questions.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </section>
    </div>
  </article>;
}
