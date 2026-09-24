// GitHub Pages serves this export from a project sub-path. Force internal
// links to use a full page load so navigation still works if Next.js client
// routing or its RSC request is delayed or cached incorrectly.
document.addEventListener(
  "click",
  (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[href^="/thevalley-beauty.com/"]');
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(link.href);
  },
  true,
);

const basePath = "/thevalley-beauty.com";
const treatmentLinks = [
  ["Liposuction", "liposuction"],
  ["Rhinoplasty", "rhinoplasty"],
  ["Eye Treatment", "eye-treatment"],
  ["Facelift", "facelift"],
  ["Breast Implant", "breast-implant"],
  ["Chin Implant", "chin-implant"],
  ["Body Sculpting", "body-sculpting"],
  ["HIFU Lifting", "hifu-lifting"],
  ["Pico Laser", "pico-laser"],
  ["Hair Removal", "hair-removal"],
  ["Cell Light Therapy", "cell-light-therapy"],
  ["Whitening Drip", "whitening-drip"],
  ["Sculpt Pro Coolwaves™", "sculpt-pro"],
  ["Titanium Ultrasound Lifting", "titanium-ultrasound"],
];

function menuLink(label, path) {
  const link = document.createElement("a");
  link.href = `${basePath}${path}`;
  link.textContent = label;
  link.style.cssText =
    "display:block;padding:12px 4px;color:#2a2420;text-decoration:none;font-family:serif;font-size:22px;line-height:1.2";
  return link;
}

function closeFallbackMenu() {
  document.getElementById("github-pages-menu")?.remove();
  document.body.style.overflow = "";
}

function openFallbackMenu(mode) {
  closeFallbackMenu();

  const overlay = document.createElement("div");
  overlay.id = "github-pages-menu";
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:9999;background:rgba(42,36,32,.42);overflow:auto;padding:112px 16px 32px";
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeFallbackMenu();
  });

  const panel = document.createElement("nav");
  panel.setAttribute("aria-label", mode === "mobile" ? "Mobile navigation" : "Treatments");
  panel.style.cssText =
    "position:relative;margin:0 auto;max-width:1120px;background:#fbf7ef;border:1px solid #e5d7c2;padding:32px;box-shadow:0 24px 60px rgba(42,36,32,.25)";

  const close = document.createElement("button");
  close.type = "button";
  close.setAttribute("aria-label", "Close menu");
  close.textContent = "×";
  close.style.cssText =
    "position:absolute;right:18px;top:10px;border:0;background:transparent;font-size:34px;cursor:pointer;color:#2a2420";
  close.addEventListener("click", closeFallbackMenu);
  panel.appendChild(close);

  if (mode === "mobile") {
    const main = document.createElement("div");
    main.style.cssText =
      "display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:2px 24px;padding:8px 34px 24px 0;border-bottom:1px solid #e5d7c2;margin-bottom:24px";
    [
      ["Home", "/"],
      ["All Treatments", "/treatments/"],
      ["About", "/about/"],
      ["Results", "/#gallery"],
      ["Reviews", "/#reviews"],
      ["Magazine", "/magazine/"],
      ["Contact", "/contact/"],
    ].forEach(([label, path]) => main.appendChild(menuLink(label, path)));
    panel.appendChild(main);
  }

  const heading = document.createElement("p");
  heading.textContent = "TREATMENTS";
  heading.style.cssText =
    "margin:0 0 18px;color:#b58c4d;font-size:13px;letter-spacing:.24em;font-family:sans-serif";
  panel.appendChild(heading);

  const grid = document.createElement("div");
  grid.style.cssText =
    "display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:2px 36px";
  treatmentLinks.forEach(([label, slug]) =>
    grid.appendChild(menuLink(label, `/treatments/${slug}/`)),
  );
  panel.appendChild(grid);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

document.addEventListener(
  "click",
  (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest("button");
    if (!button) return;

    const isTreatments = button.textContent?.trim().startsWith("Treatments");
    const isMobileMenu = button.getAttribute("aria-label") === "Menu";
    if (!isTreatments && !isMobileMenu) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    openFallbackMenu(isMobileMenu ? "mobile" : "treatments");
  },
  true,
);
