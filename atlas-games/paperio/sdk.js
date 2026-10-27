// Local GameMonetize SDK stub (self-hosted build): no network, ads finish instantly.
(function () {
  function ev(name) { try { var o = window.SDK_OPTIONS; o && o.onEvent && o.onEvent({ name: name, message: name, status: "success" }); } catch (e) {} }
  window.sdk = {
    showBanner: function () { ev("SDK_GAME_PAUSE"); setTimeout(function () { ev("SDK_GAME_START"); }, 0); },
    play: function () {}, preloadAd: function () { return Promise.resolve(); }
  };
  function ready() { setTimeout(function () { ev("SDK_READY"); }, 0); }
  if (document.readyState === "complete") ready(); else window.addEventListener("load", ready);
})();
