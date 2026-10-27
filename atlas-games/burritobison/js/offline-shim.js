// Self-hosted shim: neutralises cross-origin requests made at runtime (analytics, ad,
// telemetry, JSONP/script/pixel injections) so the game runs fully offline.
// Same-origin requests are untouched.
(function () {
  // Optional: window.OFFLINE_SHIM_ALLOW = /regex/ of hosts a game genuinely needs (e.g. its login/multiplayer backend).
  function external(u) {
    try {
      var x = new URL(u, location.href);
      if (!/^(https?|wss?):$/.test(x.protocol) || x.origin === location.origin) return false;
      return !(window.OFFLINE_SHIM_ALLOW && window.OFFLINE_SHIM_ALLOW.test(x.hostname));
    } catch (e) { return false; }
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
