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
// Self-hosted shim: neutralises cross-origin requests made at runtime (analytics, ad,
// telemetry, JSONP/script/pixel injections) so the game runs fully offline.
// Same-origin requests are untouched.
(function () {
  function external(u) {
    try { var x = new URL(u, location.href); return /^(https?|wss?):$/.test(x.protocol) && x.origin !== location.origin; } catch (e) { return false; }
  }
  var EMPTY = { script: "data:text/javascript,", img: "data:image/gif;base64,R0lGODlhAQABAAAAACw=", link: "data:text/css,", iframe: "about:blank" };
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u) {
    var a = Array.prototype.slice.call(arguments);
    if (external(u)) { a[0] = "GET"; a[1] = "data:application/json,{}"; }
    return open.apply(this, a);
  };
  if (window.fetch) {
    var f = window.fetch;
    window.fetch = function (r, o) {
      var u = typeof r === "string" ? r : (r && r.url);
      if (external(u)) return Promise.resolve(new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } }));
      return f.apply(this, arguments);
    };
  }
  if (navigator.sendBeacon) {
    var b = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (u) { return external(u) ? true : b.apply(null, arguments); };
  }
  function guard(proto, prop, kind) {
    var d = proto && Object.getOwnPropertyDescriptor(proto, prop);
    if (!d || !d.set) return;
    Object.defineProperty(proto, prop, {
      configurable: true, enumerable: d.enumerable, get: d.get,
      set: function (v) { return d.set.call(this, external(String(v)) ? EMPTY[kind] : v); }
    });
  }
  guard(window.HTMLScriptElement && HTMLScriptElement.prototype, "src", "script");
  guard(window.HTMLImageElement && HTMLImageElement.prototype, "src", "img");
  guard(window.HTMLIFrameElement && HTMLIFrameElement.prototype, "src", "iframe");
  guard(window.HTMLLinkElement && HTMLLinkElement.prototype, "href", "link");
  var setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (n, v) {
    var t = this.tagName, k = String(n).toLowerCase();
    if ((k === "src" || k === "href") && external(String(v))) {
      if (t === "SCRIPT") v = EMPTY.script; else if (t === "IMG") v = EMPTY.img; else if (t === "IFRAME") v = EMPTY.iframe; else if (t === "LINK") v = EMPTY.link;
    }
    return setAttr.call(this, n, v);
  };
})();
