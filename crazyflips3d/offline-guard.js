// Keeps the game fully offline: any request to another origin (Unity analytics,
// GameAnalytics, etc.) fails locally as a network error instead of hitting the net.
(function () {
  function isRemote(u) {
    try { var x = new URL(u, location.href); return /^https?:$/.test(x.protocol) && x.origin !== location.origin; }
    catch (e) { return false; }
  }
  var X = XMLHttpRequest.prototype, open = X.open, send = X.send, setRH = X.setRequestHeader;
  X.open = function (method, url) {
    this._offlineBlocked = isRemote(url);
    if (this._offlineBlocked) return;
    return open.apply(this, arguments);
  };
  X.setRequestHeader = function () { if (!this._offlineBlocked) return setRH.apply(this, arguments); };
  X.send = function () {
    if (!this._offlineBlocked) return send.apply(this, arguments);
    var xhr = this;
    setTimeout(function () {
      ["error", "loadend"].forEach(function (t) {
        var ev = new ProgressEvent(t);
        if (typeof xhr["on" + t] === "function") xhr["on" + t](ev);
        xhr.dispatchEvent(ev);
      });
    }, 0);
  };
  if (window.fetch) {
    var f = window.fetch;
    window.fetch = function (input, init) {
      var u = typeof input === "string" ? input : (input && input.url);
      if (isRemote(u)) return Promise.reject(new TypeError("offline"));
      return f.apply(this, arguments);
    };
  }
  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };
  if (window.WebSocket) window.WebSocket = function () { throw new Error("offline"); };
})();
