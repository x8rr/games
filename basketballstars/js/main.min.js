// Local GameDistribution SDK stub (self-hosted build): no network, ads resolve instantly.
(function () {
  var opts = window.GD_OPTIONS || {};
  function ev(name) { try { opts.onEvent && opts.onEvent({ name: name, message: name, status: "success" }); } catch (e) {} }
  var AdType = { Interstitial: "interstitial", Rewarded: "rewarded", Display: "display", Midroll: "midroll", Preroll: "preroll" };
  window.gdsdk = {
    AdType: AdType,
    showAd: function (t) { ev("SDK_GAME_PAUSE"); return new Promise(function (r) { setTimeout(function () { if (t === AdType.Rewarded) ev("SDK_REWARDED_WATCH_COMPLETE"); ev("SDK_GAME_START"); r(); }, 0); }); },
    preloadAd: function () { return Promise.resolve(); },
    cancelAd: function () { return Promise.resolve(); },
    showBanner: function () {}, openConsole: function () {}
  };
  window.gdApi = window.gdsdk;
  setTimeout(function () { ev("SDK_READY"); }, 0);
})();
