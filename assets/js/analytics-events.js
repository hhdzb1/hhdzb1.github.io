(function () {
  "use strict";

  // Keep native navigation immediate, even if analytics is blocked or slow.
  document.addEventListener("click", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest("a[data-site-event]") : null;
    if (!link || !window.umami || typeof window.umami.track !== "function") return;

    try {
      var pending = window.umami.track(link.getAttribute("data-site-event"));
      if (pending && typeof pending.catch === "function") pending.catch(function () {});
    } catch (_) {
      // Analytics must never interfere with opening a project or CV.
    }
  }, { passive: true });
})();
