import type { Locale } from "@/lib/i18n/config";

export const ENGLISH_SEO_TITLES = {
  home: "Aesthetic Clinic Kuala Lumpur | The Valley Beauty",
  treatments: "Aesthetic Treatments Kuala Lumpur | The Valley Beauty",
  about: "About The Valley | Aesthetic Clinic Kuala Lumpur",
  contact: "Book an Aesthetic Consultation | Kuala Lumpur",
  magazine: "Aesthetic & Cosmetic Surgery Guide | Kuala Lumpur",
  results: "Before & After Results Kuala Lumpur | The Valley Beauty",
  reviews: "Aesthetic Clinic Reviews Kuala Lumpur | The Valley Beauty",
  montKiara: "Mont Kiara Aesthetic Clinic | The Valley Beauty",
  sriHartamas: "Sri Hartamas Cosmetic Surgery | The Valley Beauty",
  treatmentsByKey: {
    liposuction: "Liposuction Kuala Lumpur | The Valley Beauty",
    rhinoplasty: "Rhinoplasty Kuala Lumpur | The Valley Beauty",
    eye: "Eye Treatment Kuala Lumpur | The Valley Beauty",
    facelift: "Facelift Kuala Lumpur | The Valley Beauty",
    breast: "Breast Implant Kuala Lumpur | The Valley Beauty",
    chin: "Chin Implant Kuala Lumpur | The Valley Beauty",
    bodySculpt: "Body Sculpting Kuala Lumpur | The Valley Beauty",
    hifu: "HIFU Treatment Kuala Lumpur | The Valley Beauty",
    picoLaser: "Pico Laser Kuala Lumpur | The Valley Beauty",
    hairRemoval: "Laser Hair Removal Kuala Lumpur | The Valley Beauty",
    cellLight: "LED Light Therapy Kuala Lumpur | The Valley Beauty",
    whiteningDrip: "Whitening Drip Kuala Lumpur | The Valley Beauty",
    onda: "Sculpt Pro Coolwaves Kuala Lumpur | The Valley Beauty",
    titanium: "Titanium Ultrasound Lifting Kuala Lumpur | The Valley Beauty",
  },
} as const;

export function englishTitle(locale: Locale, optimized: string, fallback: string): string {
  return locale === "en" ? optimized : fallback;
}
