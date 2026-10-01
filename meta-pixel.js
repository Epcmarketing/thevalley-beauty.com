(function () {
  if (window.__valleyPixelInstalled) return;
  window.__valleyPixelInstalled = true;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '2442960263170612');
  fbq('track', 'PageView');
  var pending = false;
  document.addEventListener('click', function (event) {
    var link = event.target instanceof Element && event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    var url = new URL(link.href, location.href);
    if (!['wa.me', 'wasap.my', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) return;
    event.preventDefault();
    if (pending) return;
    pending = true;
    // Reserve the tab during the user gesture so delayed navigation is not blocked.
    var tab = link.target === '_blank' ? window.open('about:blank', '_blank') : null;
    if (tab) tab.opener = null;
    setTimeout(function () {
      try { fbq('track', 'Contact'); }
      finally {
        if (tab && !tab.closed) tab.location.href = url.href;
        else location.href = url.href;
        setTimeout(function () { pending = false; }, 2000);
      }
    }, 1500);
  });
})();
