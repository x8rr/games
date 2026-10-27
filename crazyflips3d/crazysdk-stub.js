// Offline stand-in for the CrazyGames SDK v3 (no network, no ads).
(function () {
  var P = function (v) { return Promise.resolve(v); };
  var noop = function () {};
  var store = {
    getItem: function (k) { try { return localStorage.getItem("crazyflips3d:" + k); } catch (e) { return null; } },
    setItem: function (k, v) { try { localStorage.setItem("crazyflips3d:" + k, v); } catch (e) {} },
    removeItem: function (k) { try { localStorage.removeItem("crazyflips3d:" + k); } catch (e) {} },
    clear: function () { try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf("crazyflips3d:") === 0) localStorage.removeItem(k); }); } catch (e) {} },
    syncUnityGameData: noop
  };
  window.CrazyGames = { SDK: {
    environment: "local",
    init: function () { return P(); },
    ad: {
      requestAd: function (type, cb) {
        cb = cb || {};
        setTimeout(function () { cb.adStarted && cb.adStarted(); setTimeout(function () { cb.adFinished && cb.adFinished(); }, 50); }, 0);
        return P();
      },
      prefetchAd: noop, hasAdblock: function () { return P(false); },
      addAdblockPopupListener: noop, removeAdblockPopupListener: noop
    },
    banner: { requestBanner: function () { return P(); }, requestResponsiveBanner: function () { return P(); }, requestOverlayBanners: noop, clearBanner: noop, clearAllBanners: noop },
    game: {
      settings: { disableChat: true, muteAudio: false },
      inviteParams: null,
      gameplayStart: noop, gameplayStop: noop, happytime: noop, loadingStart: noop, loadingStop: noop,
      addSettingsChangeListener: noop, removeSettingsChangeListener: noop,
      addJoinRoomListener: noop, removeJoinRoomListener: noop,
      inviteLink: function () { return ""; }, showInviteButton: function () { return ""; }, hideInviteButton: noop,
      setGameContext: noop, clearGameContext: noop, updateRoom: noop, leftRoom: noop
    },
    user: {
      isUserAccountAvailable: false,
      systemInfo: { countryCode: "US", locale: "en-US", device: { type: "desktop" }, os: { name: "", version: "" }, browser: { name: "", version: "" }, applicationType: "web" },
      getUser: function () { return P(null); },
      getUserToken: function () { return Promise.reject({ code: "userNotAuthenticated", message: "offline" }); },
      getXsollaUserToken: function () { return Promise.reject({ code: "userNotAuthenticated", message: "offline" }); },
      showAuthPrompt: function () { return Promise.reject({ code: "userNotAuthenticated", message: "offline" }); },
      showAccountLinkPrompt: function () { return Promise.reject({ code: "userNotAuthenticated", message: "offline" }); },
      listFriends: function () { return P({ friends: [], page: 1, size: 0, hasMore: false, total: 0 }); },
      addAuthListener: noop, removeAuthListener: noop, addScore: noop, submitScore: noop
    },
    data: store,
    analytics: { trackOrder: noop }
  } };
})();
