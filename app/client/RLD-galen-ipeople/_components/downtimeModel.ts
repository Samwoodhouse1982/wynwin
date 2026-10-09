// Ported unchanged from the supplied standalone page. All figures are USD
// millions and illustrative, see the "How we modeled this" note on the page.

export const MIN_H = 1;
export const MAX_H = 120;

// Modeled anchors: the original 12, 24 and 48 hour scenarios.
export const ANCHORS = [12, 24, 48];
const DEF = [2.8, 9.2, 25.7];
const PROD = [4.1, 18.4, 57.1];
const DEV = [1.4, 2.1, 3.2];
const BACK = [0.3, 0.7, 1.3];
const IMP = [0.15, 0.25, 0.35];

// 15% at 12h, +10 points per doubling, proportional below 12h.
function imp(h: number) {
  if (h <= 12) return (0.15 * h) / 12;
  return Math.min(0.5, 0.15 + 0.1 * Math.log2(h / 12));
}

// Rate per impaired hour, interpolated on log2(hours) between anchors, flat outside.
function rateAt(h: number, vals: number[]) {
  const r = vals.map((v, i) => v / (ANCHORS[i] * IMP[i]));
  if (h <= ANCHORS[0]) return r[0];
  if (h >= ANCHORS[2]) return r[2];
  const i = h < ANCHORS[1] ? 0 : 1;
  const t =
    (Math.log2(h) - Math.log2(ANCHORS[i])) /
    (Math.log2(ANCHORS[i + 1]) - Math.log2(ANCHORS[i]));
  return r[i] + (r[i + 1] - r[i]) * t;
}

// Piecewise linear in hours through (0,0) and the anchors, last slope extended.
function lin(h: number, vals: number[]) {
  const xs = [0, ...ANCHORS];
  const ys = [0, ...vals];
  for (let i = 0; i < xs.length - 1; i++) {
    if (h <= xs[i + 1]) return ys[i] + ((ys[i + 1] - ys[i]) * (h - xs[i])) / (xs[i + 1] - xs[i]);
  }
  const s = (ys[3] - ys[2]) / (xs[3] - xs[2]);
  return ys[3] + s * (h - xs[3]);
}

export interface Model {
  /** lost, recaptured, staff productivity, device recovery, chart backfill */
  parts: number[];
  total: number;
  deferred: number;
}

export function model(h: number): Model {
  const p = imp(h);
  const units = h * p;
  const deferred = units * rateAt(h, DEF);
  const lost = deferred * p;
  const parts = [lost, deferred - lost, units * rateAt(h, PROD), lin(h, DEV), lin(h, BACK)];
  return { parts, total: parts.reduce((a, b) => a + b, 0), deferred };
}

export const SCALE = model(MAX_H).total;

export function fmt(n: number) {
  return n >= 100 ? `$${Math.round(n)}M` : `$${n.toFixed(1)}M`;
}
