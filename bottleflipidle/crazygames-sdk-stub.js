// Offline stand-in for the CrazyGames SDK v3 (no network, ads auto-complete).
(function () {
  var P = function (v) { return Promise.resolve(v); };
  var store = {
    getItem: function (k) { try { return localStorage.getItem("cg_" + k); } catch (e) { return null; } },
    setItem: function (k, v) { try { localStorage.setItem("cg_" + k, String(v)); } catch (e) {} },
    removeItem: function (k) { try { localStorage.removeItem("cg_" + k); } catch (e) {} },
    clear: function () { try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf("cg_") === 0) localStorage.removeItem(k); }); } catch (e) {} },
    syncUnityGameData: function () {}
  };
  window.CrazyGames = { SDK: {
    environment: "disabled",
    isQaTool: false,
    init: function () { return P(); },
    ad: {
      hasAdblock: function () { return P(false); },
      requestAd: function (type, cb) { setTimeout(function () { cb && cb.adStarted && cb.adStarted(); cb && cb.adFinished && cb.adFinished(); }, 0); }
    },
    banner: { requestBanner: function () { return P(); }, requestOverlayBanners: function () {}, requestResponsiveBanner: function () { return P(); }, clearBanner: function () {}, clearAllBanners: function () {} },
    game: { gameplayStart: function () {}, gameplayStop: function () {}, happytime: function () {}, loadingStart: function () {}, loadingStop: function () {},
      inviteLink: function () { return location.href; }, showInviteButton: function () { return location.href; }, hideInviteButton: function () {}, isInstantMultiplayer: false },
    user: {
      isUserAccountAvailable: false,
      systemInfo: { countryCode: "US", locale: "en-US", device: { type: "desktop" }, os: { name: "", version: "" }, browser: { name: "", version: "" }, applicationType: "web" },
      addAuthListener: function () {}, removeAuthListener: function () {},
      getUser: function () { return P(null); },
      getUserToken: function () { return Promise.reject({ code: "userNotAuthenticated" }); },
      getXsollaUserToken: function () { return Promise.reject({ code: "userNotAuthenticated" }); },
      showAuthPrompt: function () { return Promise.reject({ code: "userNotAuthenticated" }); },
      showAccountLinkPrompt: function () { return Promise.reject({ code: "userNotAuthenticated" }); },
      addScore: function () {}
    },
    analytics: { trackOrder: function () {} },
    data: store
  } };
})();
