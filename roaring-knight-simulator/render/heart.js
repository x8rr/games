

const trackers = new WeakMap();

export function heartImageIndex(state) {
  const inv = state.invTimer ?? 0;
  const f = state.frame ?? 0;
  let t = trackers.get(state);
  if (!t) {
    t = { start: f, lastInv: 0, lastFrame: -1 };
    trackers.set(state, t);
  }
  if (f !== t.lastFrame) {

    if (inv > 0 && (t.lastInv <= 0 || inv > t.lastInv || f < t.lastFrame)) t.start = f;
    t.lastInv = inv;
    t.lastFrame = f;
  }
  if (inv <= 0) return 0;
  return Math.floor((f - t.start) * 0.25) % 2;
}
