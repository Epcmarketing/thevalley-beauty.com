"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ID = "G-T2XESL5EYC";
const KEY = "valley-analytics-consent-v1";
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function start() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", ID, {
    send_page_view: false, allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname,
    page_referrer: "", page_title: location.pathname,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(script);
}

export function Analytics() {
  const path = usePathname();
  const [consent, setConsent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch { /* Storage may be blocked. */ }
    setConsent(saved);
    setOpen(saved !== "yes" && saved !== "no");
  }, []);

  useEffect(() => {
    if (consent !== "yes") return;
    start();
    // Only public pathnames: never query strings, form contents or WhatsApp URLs.
    window.gtag?.("set", { page_location: location.origin + path, page_title: path, page_referrer: "" });
    window.gtag?.("event", "page_view", { send_to: ID });
    let lastClick = 0;
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (!["wa.me", "wasap.my", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) return;
      if (Date.now() - lastClick < 3500) return;
      lastClick = Date.now();
      window.gtag?.("event", "whatsapp_click", {
        send_to: ID, button_location: link.closest("header") ? "header" : link.closest("footer") ? "footer" : link.closest("main") ? "content" : "floating",
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [consent, path]);

  function choose(value: string) {
    try { localStorage.setItem(KEY, value); } catch { /* Keep this session's choice. */ }
    if (value === "no" && window.gtag) {
      // Stop collection immediately; reload removes Google's running timers.
      (window as unknown as Record<string, unknown>)[`ga-disable-${ID}`] = true;
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.trim().split("=")[0];
        if (!name.startsWith("_ga")) continue;
        for (const domain of ["", `;domain=${location.hostname}`, ";domain=.thevalley-beauty.com"])
          document.cookie = `${name}=;max-age=0;path=/${domain}`;
      }
      location.reload();
    }
    setConsent(value);
    setOpen(false);
  }

  return <>
    <div className="bg-ivory px-6 py-3 text-center">
      <button className="underline" onClick={() => setOpen(true)}>Analytics preferences</button>
    </div>
    {open && <section aria-label="Analytics preferences" className="fixed bottom-24 left-4 right-4 z-[100] max-w-lg rounded-lg border border-sand bg-ivory p-5 text-ink shadow-lg">
      <p>Allow Google Analytics cookies to measure page visits, engagement and WhatsApp button clicks? This sends usage data to Google, not form contents or chat messages. Optional; you can change this choice below. This preference controls Google Analytics only.</p>
      <div className="mt-4 flex gap-4">
        <button className="rounded border border-gold px-4 py-2" onClick={() => choose("no")}>Decline analytics</button>
        <button className="rounded border border-gold px-4 py-2" onClick={() => choose("yes")}>Allow analytics</button>
      </div>
    </section>}
  </>;
}
