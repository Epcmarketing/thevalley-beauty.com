"use client";

import { useEffect, useRef, useState } from "react";

export function CaseCarousel({ faceImages, name }: { faceImages: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const touch = useRef<number | null>(null);
  const slides = [
    { images: faceImages, label: "Face" },
    { images: ["/images/non-surgical/cell-light-therapy-legs-case-kuala-lumpur.jpeg"], label: "Legs" },
    { images: ["/images/non-surgical/cell-light-therapy-arms-case-kuala-lumpur.jpeg"], label: "Arms" },
  ];
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || hover || focused || reduced) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive(i => (i + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, hover, focused, reduced, active]);
  const move = (step: number) => setActive(i => (i + step + 3) % 3);
  return <div className="mt-6" aria-label={`${name} patient cases`} aria-roledescription="carousel"
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
    <div className="overflow-hidden rounded-sm border border-sand bg-cream" style={{ touchAction: "pan-y" }}
      onTouchStart={e => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={e => { if (touch.current !== null) { const delta = e.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1); } touch.current = null; }}>
      <div className="flex transition-transform duration-500 motion-reduce:transition-none" style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((slide, index) => <figure key={slide.label} className="w-full shrink-0" aria-hidden={active !== index}>
          <div className="grid aspect-square grid-flow-col auto-cols-fr sm:aspect-[4/3]">
            {slide.images.map((src, i) => <img key={src} src={src} loading="lazy"
              alt={`${name} ${slide.label.toLowerCase()} patient case${slide.images.length > 1 ? ` — ${i === 0 ? "before" : "after"}` : ""}, The Valley Beauty, Kuala Lumpur`}
              className="h-full min-h-0 w-full min-w-0 object-contain" />)}
          </div>
          <figcaption className="border-t border-sand p-4 text-xs text-taupe">{name} · {slide.label} · Kuala Lumpur</figcaption>
        </figure>)}
      </div>
    </div>
    <div className="mt-4 flex items-center justify-center gap-4">
      <button type="button" aria-label="Previous case" className="rounded-full border border-sand px-4 py-2" onClick={() => move(-1)}>←</button>
      <span className="text-xs text-taupe">{active + 1} / 3</span>
      <button type="button" aria-label="Next case" className="rounded-full border border-sand px-4 py-2" onClick={() => move(1)}>→</button>
      {!reduced && <button type="button" className="text-xs text-taupe underline" onClick={() => setPaused(p => !p)}>{paused ? "Play" : "Pause"}</button>}
    </div>
  </div>;
}
