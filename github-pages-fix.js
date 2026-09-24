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
