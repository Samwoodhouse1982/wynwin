'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Downtime.module.css';
import { ANCHORS, MAX_H, MIN_H, SCALE, fmt, model } from './downtimeModel';

const NAMES = [
  'Revenue permanently lost',
  'Revenue deferred, later recaptured',
  'Staff productivity',
  'Device recovery',
  'Chart backfill',
];
const GROUPS = ['Revenue', 'Revenue', 'Operational', 'Operational', 'Operational'];
const COLORS = ['--c-lost', '--c-recap', '--c-prod', '--c-device', '--c-backfill'];
const TIP_HALF = 125;

const TICKS: [number, string, boolean][] = [
  [12, '12h', false],
  [24, '24h', false],
  [48, '48h', false],
  [72, '3 days', true],
  [96, '4 days', true],
  [120, '5 days', false],
];

// Chart geometry for the hour-by-hour curve.
const W = 640;
const H = 230;
const L = 52;
const R = 14;
const T = 12;
const B = 30;
const PW = W - L - R;
const PH = H - T - B;
const Y_MAX = Math.ceil(SCALE / 50) * 50;
const X = (h: number) => L + ((h - MIN_H) / (MAX_H - MIN_H)) * PW;
const Y = (v: number) => T + PH - (v / Y_MAX) * PH;

const pos = (h: number) => `calc(14px + (100% - 28px) * ${(h - MIN_H) / (MAX_H - MIN_H)})`;

function days(h: number) {
  const d = h / 24;
  return `${d === Math.round(d) ? d : d.toFixed(1)} ${d === 1 ? 'day' : 'days'}`;
}

interface Tip {
  i: number;
  x: number;
  left: number;
}

export default function DowntimeExplorer() {
  const [hours, setHours] = useState(24);
  const [tip, setTip] = useState<Tip | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const segRefs = useRef<(HTMLDivElement | null)[]>([]);

  const m = useMemo(() => model(hours), [hours]);

  // The curve itself never changes, only the marker on it, so build it once.
  const paths = useMemo(() => {
    let total = '';
    let lost = '';
    for (let h = MIN_H; h <= MAX_H; h++) {
      const mm = model(h);
      const cmd = h === MIN_H ? 'M' : 'L';
      total += `${cmd}${X(h).toFixed(1)},${Y(mm.total).toFixed(1)}`;
      lost += `${cmd}${X(h).toFixed(1)},${Y(mm.parts[0]).toFixed(1)}`;
    }
    return { total, lost };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTip(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function setH(next: number) {
    setHours(Math.max(MIN_H, Math.min(MAX_H, Math.round(next))));
    setTip(null);
  }

  // Click or drag on the chart: turn the pointer position into an outage length.
  function hoursFromPointer(e: React.PointerEvent) {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * W;
    setH(MIN_H + ((x - L) / PW) * (MAX_H - MIN_H));
  }

  function showTip(i: number, x: number) {
    const width = wrapRef.current?.getBoundingClientRect().width ?? 0;
    const left = Math.max(TIP_HALF, Math.min(width - TIP_HALF, x));
    setTip({ i, x, left });
  }

  function segCenter(i: number) {
    const wr = wrapRef.current?.getBoundingClientRect();
    const sr = segRefs.current[i]?.getBoundingClientRect();
    if (!wr || !sr) return 0;
    return sr.left - wr.left + sr.width / 2;
  }

  const hl = hours === 1 ? '1 hour' : `${hours} hours`;
  const exact = ANCHORS.includes(hours);
  const between = hours > 12 && hours < 48;
  const badgeText = exact
    ? 'Modeled scenario'
    : between
      ? 'Between modeled scenarios'
      : 'Projected beyond modeled range';
  const badgeClass = `${styles.badge} ${exact ? styles.badgeExact : between ? '' : styles.badgeExtra}`;

  const tipPct = tip && m.total > 0 ? Math.round((m.parts[tip.i] / m.total) * 100) : 0;
  const yTicks = Array.from({ length: Y_MAX / 50 + 1 }, (_, k) => k * 50);

  return (
    <section className={styles.panel} aria-labelledby="chart-h">
      <h2 id="chart-h">Modeled cost by outage length</h2>
      <p className={styles.hint}>Drag the slider to any outage length, from 1 hour to 5 days.</p>

      <div className={styles.slider}>
        <div className={styles.sliderHead}>
          <label htmlFor="hours">Outage length</label>
          <span className={badgeClass}>{badgeText}</span>
        </div>
        <div className={`${styles.hrs} ${styles.num}`} aria-live="polite">
          {hl}
          <small>{days(hours)}</small>
        </div>
        <div className={styles.rangebox}>
          <input
            id="hours"
            type="range"
            className={styles.range}
            min={MIN_H}
            max={MAX_H}
            step={1}
            value={hours}
            aria-valuetext={`${hl}, ${fmt(m.total)} total`}
            style={{ '--fill': `${((hours - MIN_H) / (MAX_H - MIN_H)) * 100}%` } as React.CSSProperties}
            onChange={(e) => setH(+e.target.value)}
          />
          <div
            className={styles.modeled}
            style={{ left: pos(12), width: `calc((100% - 28px) * ${36 / (MAX_H - MIN_H)})` }}
          >
            <span>Modeled range</span>
          </div>
          {TICKS.map(([h, label, minor]) => (
            <button
              key={h}
              type="button"
              className={`${styles.tick} ${styles.num} ${minor ? styles.minor : ''}`}
              style={{ left: pos(h) }}
              aria-label={`Set outage length to ${h} hours`}
              onClick={() => setH(h)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.lost}`}>
          <div className={styles.statLabel}>Lost revenue</div>
          <div className={`${styles.statVal} ${styles.num}`}>{fmt(m.parts[0])}</div>
          <div className={`${styles.statNote} ${styles.num}`}>of {fmt(m.deferred)} in delayed care</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Total modeled impact</div>
          <div className={`${styles.statVal} ${styles.num}`}>{fmt(m.total)}</div>
          <div className={`${styles.statNote} ${styles.num}`}>for a {hours}-hour outage</div>
        </div>
      </div>

      <div className={styles.barwrap} ref={wrapRef}>
        <div
          className={`${styles.bar} ${tip ? styles.hovering : ''}`}
          role="group"
          aria-label={`Modeled cost for a ${hl} outage: ${fmt(m.total)} total, of which ${fmt(m.parts[0])} revenue permanently lost`}
        >
          {m.parts.map((v, i) => (
            <div
              key={i}
              ref={(el) => {
                segRefs.current[i] = el;
              }}
              className={`${styles.seg} ${tip?.i === i ? styles.active : ''}`}
              tabIndex={0}
              role="img"
              aria-label={`${NAMES[i]}, ${GROUPS[i].toLowerCase()}: ${fmt(v)}`}
              style={{ width: `${(v / SCALE) * 100}%`, background: `var(${COLORS[i]})` }}
              onMouseMove={(e) => {
                const wr = wrapRef.current?.getBoundingClientRect();
                if (wr) showTip(i, e.clientX - wr.left);
              }}
              onMouseLeave={() => setTip(null)}
              onFocus={() => showTip(i, segCenter(i))}
              onBlur={() => setTip(null)}
              onClick={() => showTip(i, segCenter(i))}
            />
          ))}
        </div>
        {tip && (
          <div
            className={styles.tip}
            style={{ left: tip.left, '--arrow': `${tip.x - tip.left}px` } as React.CSSProperties}
          >
            <div className={styles.tn}>
              <i style={{ background: `var(${COLORS[tip.i]})` }} />
              {NAMES[tip.i]}
            </div>
            <div className={`${styles.tv} ${styles.num}`}>{fmt(m.parts[tip.i])}</div>
            <div className={`${styles.tg} ${styles.num}`}>
              {GROUPS[tip.i]} · {tipPct}% of {fmt(m.total)} at {hours}h
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.scale} ${styles.num}`} aria-hidden="true">
        <span>$0</span>
        <span>{fmt(SCALE)} (5-day total)</span>
      </div>

      <div className={styles.breakdown}>
        {NAMES.map((name, i) => (
          <div
            key={name}
            className={`${styles.row} ${tip?.i === i ? styles.hl : ''}`}
            onMouseEnter={() => {
              if (m.parts[i] > 0) showTip(i, segCenter(i));
            }}
            onMouseLeave={() => setTip(null)}
          >
            <span className={styles.sw} style={{ background: `var(${COLORS[i]})` }} />
            <span>
              {name} <span className={styles.grp}>{GROUPS[i]}</span>
            </span>
            <span className={`${styles.rowVal} ${styles.num}`}>{fmt(m.parts[i])}</span>
          </div>
        ))}
        <div className={`${styles.row} ${styles.total}`}>
          <span />
          <span>Total modeled impact</span>
          <span className={`${styles.rowVal} ${styles.num}`}>{fmt(m.total)}</span>
        </div>
      </div>

      <div className={styles.curve}>
        <h3>How cost builds hour by hour</h3>
        <p className={styles.hint}>Click or drag along the chart to change the outage length.</p>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Line chart of total modeled impact and permanently lost revenue from 1 to 120 hours"
        >
          <rect x={L} y={T} width={X(12) - L} height={PH} className={styles.extraband} />
          <rect x={X(48)} y={T} width={L + PW - X(48)} height={PH} className={styles.extraband} />
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={L} x2={L + PW} y1={Y(v)} y2={Y(v)} className={styles.ax} />
              <text x={L - 8} y={Y(v) + 4} textAnchor="end" className={styles.lbl}>
                ${v}M
              </text>
            </g>
          ))}
          {[1, 12, 24, 48, 72, 96, 120].map((h) => (
            <text key={h} x={X(h)} y={H - 8} textAnchor="middle" className={styles.lbl}>
              {h}h
            </text>
          ))}
          <path d={paths.total} className={styles.tot} />
          <path d={paths.lost} className={styles.lostl} />
          {ANCHORS.map((h) => (
            <circle key={h} cx={X(h)} cy={Y(model(h).total)} r={5} className={styles.anchor} />
          ))}
          <line x1={X(hours)} x2={X(hours)} y1={T} y2={T + PH} className={styles.cur} />
          <circle cx={X(hours)} cy={Y(m.total)} r={5} className={styles.dotT} />
          <circle cx={X(hours)} cy={Y(m.parts[0])} r={4.5} className={styles.dotL} />
          {/* Transparent hit area over the plot. The slider above stays the
              keyboard route, so this is hidden from assistive tech. */}
          <rect
            x={L}
            y={T}
            width={PW}
            height={PH}
            className={styles.curveHit}
            aria-hidden="true"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              dragging.current = true;
              hoursFromPointer(e);
            }}
            onPointerMove={(e) => {
              if (dragging.current) hoursFromPointer(e);
            }}
            onPointerUp={() => {
              dragging.current = false;
            }}
            onPointerCancel={() => {
              dragging.current = false;
            }}
          />
        </svg>
        <div className={styles.key}>
          <span>
            <i style={{ background: 'var(--brand)' }} />
            Total modeled impact
          </span>
          <span>
            <i style={{ background: 'var(--c-lost)' }} />
            Revenue permanently lost
          </span>
          <span>
            <i style={{ background: 'var(--warn-bg)', height: 10 }} />
            Projected beyond modeled range
          </span>
        </div>
      </div>

      <p className={styles.chartnote}>
        USD millions. The three circles mark the modeled scenarios at 12, 24 and 48 hours; values
        between and beyond them are projected from those scenarios. Illustrative figures; see how
        we modeled this below.
      </p>
    </section>
  );
}
