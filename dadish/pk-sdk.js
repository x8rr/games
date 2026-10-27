// Local PokiSDK stub (self-hosted build): no network, ads resolve instantly, rewarded ads grant the reward.
(function () {
  var noop = function () {};
  var res = function (v) { return function () { return Promise.resolve(v); }; };
  var sdk = {
    init: res(), initWithVideoHB: res(), setDebug: noop, setDebugTouchOverlayController: noop,
    gameLoadingStart: noop, gameLoadingProgress: noop, gameLoadingFinished: noop,
    gameplayStart: noop, gameplayStop: noop, gameInteractive: noop, roundStart: noop, roundEnd: noop,
    commercialBreak: function (cb) { try { cb && cb(); } catch (e) {} return Promise.resolve(); },
    rewardedBreak: function (opt) { try { opt && typeof opt === "function" && opt(); opt && opt.onStart && opt.onStart(); } catch (e) {} return Promise.resolve(true); },
    displayAd: function (c, s, cb) { try { cb && cb(); } catch (e) {} }, destroyAd: noop,
    happyTime: noop, customEvent: noop, logError: noop, sendHighscore: noop, setPlayerAge: noop, setLogging: noop,
    enableEventTracking: noop, disableProgrammatic: noop, togglePlayerAdvertisingConsent: noop,
    getURLParam: function (k) { try { return new URLSearchParams(location.search).get("gd" + k) || new URLSearchParams(location.search).get(k) || ""; } catch (e) { return ""; } },
    shareableURL: function () { return Promise.resolve(location.href); },
    isAdBlocked: function () { return false; }, getLanguage: function () { return (navigator.language || "en").slice(0, 2); },
    measure: noop, playtestSetCanvas: noop, playtestCaptureHtmlOnce: noop, playtestCaptureHtmlForce: noop, playtestCaptureHtmlOn: noop, playtestCaptureHtmlOff: noop,
    getLeaderboard: res([]), openExternalLink: noop, movePill: noop, getUser: res(null), login: res(null), getToken: res(null)
  };
  window.PokiSDK_OK = true;
  window.PokiSDK = new Proxy(sdk, { get: function (t, k) { return k in t ? t[k] : noop; } });
})();
