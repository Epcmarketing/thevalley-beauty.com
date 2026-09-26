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
    liposuction: "Explore personalised liposuction and body contouring in Kuala Lumpur, near Mont Kiara and Sri Hartamas. View real results and book a private consultation.",
    rhinoplasty: "Explore personalised rhinoplasty in Kuala Lumpur near Mont Kiara and Sri Hartamas. Discover natural-looking nose surgery and book a private consultation.",
    eye: "Explore personalised eye treatments in Kuala Lumpur near Mont Kiara and Sri Hartamas. View rejuvenation options, real results and book a consultation.",
    facelift: "Explore personalised facelift surgery in Kuala Lumpur near Mont Kiara and Sri Hartamas. Discover natural facial rejuvenation and book a private consultation.",
    breast: "Explore personalised breast implant surgery in Kuala Lumpur near Mont Kiara and Sri Hartamas. Review natural augmentation options and book a consultation.",
    chin: "Explore personalised chin implant surgery in Kuala Lumpur near Mont Kiara and Sri Hartamas. Refine facial balance and book a private consultation.",
    bodySculpt: "Explore non-surgical body sculpting in Kuala Lumpur near Mont Kiara and Sri Hartamas. Target stubborn areas with a personalised plan. Book a consultation.",
    hifu: "Explore HIFU face lifting in Kuala Lumpur near Mont Kiara and Sri Hartamas. Discover non-surgical skin tightening and book a personalised consultation.",
    picoLaser: "Explore Pico laser treatment in Kuala Lumpur near Mont Kiara and Sri Hartamas. Target pigmentation, tone and texture. Book a private skin consultation.",
    hairRemoval: "Explore laser hair removal in Kuala Lumpur near Mont Kiara and Sri Hartamas. Get a personalised face or body treatment plan. Book a consultation.",
    cellLight: "Explore LED light therapy in Kuala Lumpur near Mont Kiara and Sri Hartamas. Support clearer, rejuvenated skin with a personalised consultation.",
    whiteningDrip: "Explore whitening drip treatment in Kuala Lumpur near Mont Kiara and Sri Hartamas. Learn about personalised IV brightening and book a consultation.",
    onda: "Explore Sculpt Pro Coolwaves body contouring in Kuala Lumpur near Mont Kiara and Sri Hartamas. Target stubborn areas and book a private consultation.",
    titanium: "Explore Titanium ultrasound lifting in Kuala Lumpur near Mont Kiara and Sri Hartamas. Discover personalised face contouring and book a consultation.",
  },
} as const;

export function englishDescription(locale: Locale, optimized: string, fallback: string): string {
  return locale === "en" ? optimized : fallback;
}
