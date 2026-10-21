import type { Locale } from "@/lib/i18n/config";
import { fitDescription } from "@/lib/seoFit";

export const ENGLISH_SEO_DESCRIPTIONS = {
  home: "Discover cosmetic surgery and aesthetic treatments in Kuala Lumpur near Mont Kiara and Sri Hartamas. View real results and book a private consultation.",
  treatments: "Explore cosmetic surgery, body contouring and advanced skin treatments in Kuala Lumpur near Mont Kiara. Compare options and book a private consultation.",
  about: "Meet The Valley Beauty team in Desa Sri Hartamas, Kuala Lumpur. Discover personalised care, multilingual consultations and book a private appointment.",
  contact: "Book a private aesthetic consultation in Desa Sri Hartamas, Kuala Lumpur, near Mont Kiara. Speak with our multilingual team about a personalised plan.",
  magazine: "Read practical guides to cosmetic surgery, skin treatments and recovery from our Kuala Lumpur clinic near Mont Kiara. Explore expert insights and options.",
  montKiara: "Explore aesthetic treatments and cosmetic surgery near Mont Kiara, Kuala Lumpur. Personalised multilingual care in Sri Hartamas. Book a consultation.",
  sriHartamas: "Explore HIFU, skin treatments and cosmetic surgery at The Valley Beauty in Desa Sri Hartamas, Kuala Lumpur. Find our clinic and book a private consultation.",
  bangsar: "Explore aesthetic treatments and cosmetic surgery near Bangsar, Kuala Lumpur, at our Sri Hartamas clinic. View treatment options and book a consultation.",
  results: "View real before and after results for cosmetic surgery and aesthetic treatments in Kuala Lumpur. Explore patient outcomes and book a private consultation.",
  reviews: "Read real patient reviews of our aesthetic and cosmetic surgery clinic in Kuala Lumpur near Mont Kiara. Discover their experiences and book a consultation.",
  treatmentsByKey: {
    liposuction: "Liposuction in Kuala Lumpur to remove stubborn fat from the abdomen, flanks, thighs, arms or chin. Sri Hartamas clinic near Mont Kiara. Book a consultation.",
    rhinoplasty: "Rhinoplasty in Kuala Lumpur to refine the bridge, tip or proportions of your nose for natural facial balance. Sri Hartamas, near Mont Kiara. Book a consultation.",
    eye: "Eyelid and eye treatments in Kuala Lumpur for excess skin, puffiness and tired-looking eyes. Sri Hartamas clinic near Mont Kiara. Book a private consultation.",
    facelift: "Facelift in Kuala Lumpur to lift sagging cheeks, jawline and neck while keeping your natural expression. Sri Hartamas, near Mont Kiara. Book a consultation.",
    breast: "Breast implants in Kuala Lumpur, with implant type, shape, size and placement planned around your frame. Sri Hartamas, near Mont Kiara. Book a consultation.",
    chin: "Chin implant in Kuala Lumpur to add projection and balance your profile, jawline and neck. Sri Hartamas clinic near Mont Kiara. Book a private consultation.",
    bodySculpt: "Non-surgical body sculpting in Kuala Lumpur for stubborn fat and contour refinement, with no downtime. Sri Hartamas, near Mont Kiara. Book a consultation.",
    hifu: "HIFU face and neck lifting in Kuala Lumpur: non-surgical, no downtime, with the lift building over 2–3 months. Sri Hartamas, near Mont Kiara. Book a consultation.",
    picoLaser: "Pico laser in Kuala Lumpur for dark spots, pigmentation, uneven tone and dull skin. Sri Hartamas clinic near Mont Kiara. Book a private consultation.",
    hairRemoval: "Laser hair removal in Kuala Lumpur — a planned course of sessions for smoother, lower-maintenance skin. Sri Hartamas, near Mont Kiara. Book a consultation.",
    cellLight: "LED cell light therapy in Kuala Lumpur to calm, rejuvenate and support skin recovery, with no downtime. Sri Hartamas, near Mont Kiara. Book a consultation.",
    whiteningDrip: "Whitening IV drip in Kuala Lumpur, given by trained medical staff after a health check, to support skin radiance. Sri Hartamas, near Mont Kiara. Book now.",
    onda: "Sculpt Pro Coolwaves™ in Kuala Lumpur: microwave energy for skin laxity and stubborn fat pockets. Sri Hartamas clinic near Mont Kiara. Book a consultation.",
    titanium: "Titanium Ultrasound Lifting in Kuala Lumpur: next-generation focused ultrasound to lift and firm the face. Sri Hartamas, near Mont Kiara. Book a consultation.",
  },
} as const;

// Hand-written descriptions for non-English pages whose on-page copy is too
// short to work as a search snippet.
const LOCALIZED_SEO_DESCRIPTIONS: Partial<Record<Locale, Record<string, string>>> = {
  zh: {
    about: "了解位于吉隆坡 Desa Sri Hartamas、邻近满家乐的悦谷美容医学中心，查看服务理念、疗程选择与联络资料，预约咨询并讨论个人需求。",
    reviews: "阅读客户通过 WhatsApp 分享的真实评价，了解他们在悦谷美容医学中心的体验。诊所位于吉隆坡 Desa Sri Hartamas，邻近满家乐，欢迎预约私人咨询。",
    results: "浏览吉隆坡悦谷美容医学中心的真实术前术后案例，涵盖整形外科与医学美容疗程。诊所位于 Desa Sri Hartamas，邻近满家乐，欢迎预约咨询。",
  },
  ja: {
    contact: "クアラルンプールのDesa Sri Hartamas、Mont Kiara近くにあるThe Valley Beautyへのお問い合わせ。所在地と連絡先を確認し、WhatsAppでカウンセリングをご予約いただけます。",
    reviews: "WhatsAppで寄せられたお客様の実際のメッセージをご紹介します。クアラルンプールのDesa Sri Hartamas、Mont Kiara近くのクリニックです。カウンセリングのご予約はこちら。",
    results: "クアラルンプールの美容・形成外科クリニックによる実際のビフォーアフター症例。Desa Sri Hartamas、Mont Kiara近く。カウンセリングのご予約はこちら。",
  },
  ko: {
    reviews: "고객들이 WhatsApp으로 직접 보내 주신 실제 후기를 확인하세요. 쿠알라룸푸르 Desa Sri Hartamas, Mont Kiara 인근 클리닉에서 상담을 예약하실 수 있습니다.",
    results: "쿠알라룸푸르 미용·성형외과 클리닉의 실제 전후 사례를 확인하세요. Desa Sri Hartamas, Mont Kiara 인근에 위치하며 상담 예약이 가능합니다.",
  },
  ms: {
    reviews: "Baca mesej sebenar yang dikongsi pelanggan kami melalui WhatsApp tentang pengalaman mereka di klinik estetik kami di Desa Sri Hartamas, berhampiran Mont Kiara.",
    results: "Lihat hasil sebelum dan selepas sebenar untuk pembedahan kosmetik dan rawatan estetik di klinik kami di Desa Sri Hartamas, Kuala Lumpur, berhampiran Mont Kiara.",
  },
};

export function englishDescription(locale: Locale, optimized: string, fallback: string, key?: string): string {
  return locale === "en" ? optimized : fitDescription(LOCALIZED_SEO_DESCRIPTIONS[locale]?.[key ?? ""] ?? fallback);
}
