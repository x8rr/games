// Local Y8 / id.net SDK stub (self-hosted build): no network, no login, ads resolve instantly.
(function () {
  var noop = function () {};
  function later(cb, v) { if (typeof cb === "function") setTimeout(function () { cb(v); }, 0); }
  var subs = {};
  var ID = {
    Event: {
      subscribe: function (name, cb) { (subs[name] = subs[name] || []).push(cb); if (name === "id.init" || name === "auth.authResponseChange") {} },
      unsubscribe: noop
    },
    init: function () { setTimeout(function () { (subs["id.init"] || []).forEach(function (cb) { try { cb({}); } catch (e) {} }); }, 0); },
    ads: { init: noop, display: function (cb) { later(cb); }, displayAd: function (cb) { later(cb); } },
    getLoginStatus: function (cb) { later(cb, { status: "uninitialized" }); },
    login: function (cb) { later(cb, null); }, register: function (cb) { later(cb, null); }, logout: noop,
    api: function (path, method, params, cb) { later(typeof params === "function" ? params : cb, { jsondata: "null" }); },
    isLoggedIn: function () { return false; }, isVisible: function () { return false; },
    protection: { isBlacklisted: function (cb) { later(cb, false); }, isSponsor: function (cb) { later(cb, false); } },
    GameAPI: {
      Achievements: { list: function (o, cb) { later(cb, { success: false }); }, save: function (o, cb) { later(cb, { success: false }); }, listCustom: function (o, cb) { later(cb, { success: false }); } },
      Leaderboards: { list: function (o, cb) { later(cb, { success: false }); }, save: function (o, cb) { later(cb, { success: false }); }, listCustom: function (o, cb) { later(cb, { success: false }); }, saveCustom: function (o, cb) { later(cb, { success: false }); } }
    }
  };
  window.ID = ID;
  if (typeof window.idAsyncInit === "function") setTimeout(window.idAsyncInit, 0);
})();
