import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicit permission for AI search and model-training crawlers.
      // These permissions do not guarantee indexing, citation or training use.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      // Explicit allows for the major search engines.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Bingbot", allow: "/" }, // Bing (also serves Yahoo)
      { userAgent: "Slurp", allow: "/" }, // Yahoo
      { userAgent: "Yeti", allow: "/" }, // Naver
      { userAgent: "Naverbot", allow: "/" }, // Naver (legacy)
      { userAgent: "Daumoa", allow: "/" }, // Daum (Korea)
      { userAgent: "Baiduspider", allow: "/" }, // Baidu
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
