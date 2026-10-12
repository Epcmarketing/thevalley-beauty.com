import type { Locale } from "@/lib/i18n/config";

export const ENGLISH_SEO_DESCRIPTIONS = {
  home: "Discover cosmetic surgery and aesthetic treatments in Kuala Lumpur near Mont Kiara and Sri Hartamas. View real results and book a private consultation.",
  treatments: "Explore cosmetic surgery, body contouring and advanced skin treatments in Kuala Lumpur near Mont Kiara. Compare options and book a private consultation.",
  about: "Meet The Valley Beauty team in Desa Sri Hartamas, Kuala Lumpur. Discover personalised care, multilingual consultations and book a private appointment.",
  contact: "Book a private aesthetic consultation in Desa Sri Hartamas, Kuala Lumpur, near Mont Kiara. Speak with our multilingual team about a personalised plan.",
  magazine: "Read practical guides to cosmetic surgery, skin treatments and recovery from our Kuala Lumpur clinic near Mont Kiara. Explore expert insights and options.",
  montKiara: "Explore aesthetic treatments and cosmetic surgery near Mont Kiara, Kuala Lumpur. Personalised multilingual care in Sri Hartamas. Book a consultation.",
  sriHartamas: "Explore cosmetic surgery and aesthetic treatments in Desa Sri Hartamas, Kuala Lumpur. Personalised multilingual care. Book a private consultation.",
  bangsar: "Explore aesthetic treatments and cosmetic surgery near Bangsar, Kuala Lumpur, at our Sri Hartamas clinic. View treatment options and book a consultation.",
  results: "View real before and after results for cosmetic surgery and aesthetic treatments in Kuala Lumpur. Explore patient outcomes and book a private consultation.",
  reviews: "Read real patient reviews of our aesthetic and cosmetic surgery clinic in Kuala Lumpur near Mont Kiara. Discover their experiences and book a consultation.",
  treatmentsByKey: {
    liposuction: "Explore liposuction in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    rhinoplasty: "Explore rhinoplasty in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    eye: "Explore eye treatment in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    facelift: "Explore facelift in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    breast: "Explore breast implant in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    chin: "Explore chin implant in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    bodySculpt: "Explore body sculpting in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    hifu: "Explore hifu treatment in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    picoLaser: "Explore pico laser in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    hairRemoval: "Explore laser hair removal in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    cellLight: "Explore led light therapy in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    whiteningDrip: "Explore whitening drip in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    onda: "Explore sculpt pro coolwaves in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
    titanium: "Explore titanium ultrasound lifting in Desa Sri Hartamas, Kuala Lumpur, Malaysia. View treatment information and patient feedback. Book a private consultation.",
  },
} as const;

export function englishDescription(locale: Locale, optimized: string, fallback: string): string {
  return locale === "en" ? optimized : fallback;
}
