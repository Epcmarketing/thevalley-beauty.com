import type { Locale } from "@/lib/i18n/config";

export const ENGLISH_SEO_TITLES = {
  home: "Aesthetic Clinic Kuala Lumpur | The Valley Beauty",
  treatments: "Aesthetic Treatments Kuala Lumpur | The Valley Beauty",
  about: "About The Valley | Aesthetic Clinic Kuala Lumpur",
  contact: "Book an Aesthetic Consultation | Kuala Lumpur",
  magazine: "Aesthetic & Cosmetic Surgery Guide | Kuala Lumpur",
  montKiara: "Mont Kiara Aesthetic Clinic | The Valley Beauty",
  sriHartamas: "Sri Hartamas Cosmetic Surgery | The Valley Beauty",
  treatmentsByKey: {
    liposuction: "Liposuction Kuala Lumpur | Body Contouring Clinic",
    rhinoplasty: "Rhinoplasty Kuala Lumpur | Natural Nose Surgery",
    eye: "Eye Treatment Kuala Lumpur | Eyelid Rejuvenation",
    facelift: "Facelift Kuala Lumpur | Face & Neck Lift Clinic",
    breast: "Breast Implant Kuala Lumpur | Natural Augmentation",
    chin: "Chin Implant Kuala Lumpur | Facial Profile Surgery",
    bodySculpt: "Body Sculpting Kuala Lumpur | Non-Surgical Contouring",
    hifu: "HIFU Kuala Lumpur | Non-Surgical Face Lifting",
    picoLaser: "Pico Laser Kuala Lumpur | Pigmentation Treatment",
    hairRemoval: "Laser Hair Removal Kuala Lumpur | Face & Body",
    cellLight: "LED Light Therapy Kuala Lumpur | Skin Rejuvenation",
    whiteningDrip: "Whitening Drip Kuala Lumpur | IV Brightening",
    onda: "Sculpt Pro Coolwaves Kuala Lumpur | Body Contouring",
    titanium: "Titanium Ultrasound Kuala Lumpur | Face Lifting",
  },
} as const;

export function englishTitle(locale: Locale, optimized: string, fallback: string): string {
  return locale === "en" ? optimized : fallback;
}
