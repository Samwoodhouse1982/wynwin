'use client';

import { useState } from 'react';
import styles from './Downtime.module.css';
import { REF_REVENUE_M, fmtAuto, model } from './downtimeModel';

const NAMES = [
  'Revenue permanently lost',
  'Revenue deferred, later recaptured',
  'Staff productivity',
  'Device recovery',
  'Chart backfill',
];
const GROUPS = ['Revenue', 'Revenue', 'Operational', 'Operational', 'Operational'];
const COLORS = ['--c-lost', '--c-recap', '--c-prod', '--c-device', '--c-backfill'];

// Organisation size runs on a log scale, because a $250M system and a $30B
// system are not meaningfully compared on a straight line.
const MIN_REV = 250;
const MAX_REV = 30000;
const STEPS = 1000;

const OUTAGES: [number, string][] = [
  [12, '12 hours'],
  [24, '24 hours'],
  [48, '48 hours'],
  [72, '3 days'],
  [120, '5 days'],
];

const REV_TICKS: [number, string, boolean][] = [
  [250, '$250M', false],
  [1000, '$1B', true],
  [5000, '$5B', false],
  [21000, '$21B', false],
  [30000, '$30B', true],
];

const fracOf = (rev: number) => Math.log(rev / MIN_REV) / Math.log(MAX_REV / MIN_REV);
const stepOf = (rev: number) => Math.round(fracOf(rev) * STEPS);
const pos = (frac: number) => `calc(14px + (100% - 28px) * ${frac})`;

// Round to two significant figures so the readout isn't $4,837,201,113.
function revFromStep(step: number) {
  const raw = MIN_REV * Math.pow(MAX_REV / MIN_REV, step / STEPS);
  const unit = Math.pow(10, Math.floor(Math.log10(raw)) - 1);
  return Math.round(raw / unit) * unit;
}

function fmtRevenue(m: number) {
  return m >= 1000 ? `$${+(m / 1000).toFixed(m >= 10000 ? 0 : 1)}B` : `$${Math.round(m)}M`;
}

export default function WhatIf() {
  const [step, setStep] = useState(stepOf(REF_REVENUE_M));
  const [hours, setHours] = useState(24);

  const rev = revFromStep(step);
  const atRef = Math.abs(rev - REF_REVENUE_M) / REF_REVENUE_M < 0.02;
  const scale = (atRef ? REF_REVENUE_M : rev) / REF_REVENUE_M;
  const m = model(hours);
  const parts = m.parts.map((v) => v * scale);
  const total = m.total * scale;
  const deferred = m.deferred * scale;

  return (
    <section className={`${styles.panel} ${styles.whatif}`} aria-labelledby="whatif-h">
      <h2 id="whatif-h">What if this had happened at your system?</h2>
      <p className={styles.hint}>
        Set the size of your organisation and an outage length. Every figure below rescales to
        match.
      </p>

      <div className={styles.slider}>
        <div className={styles.sliderHead}>
          <label htmlFor="org-size" className={styles.fieldLabel}>
            Annual patient care revenue
          </label>
          {atRef ? (
            <span className={`${styles.badge} ${styles.badgeExact}`}>Modeled system</span>
          ) : (
            <button type="button" className={styles.reset} onClick={() => setStep(stepOf(REF_REVENUE_M))}>
              Reset to the modeled system ($21B)
            </button>
          )}
        </div>
        <div className={`${styles.hrs} ${styles.num}`} aria-live="polite">
          {fmtRevenue(rev)}
          <small>per year</small>
        </div>
        <div className={styles.rangebox}>
          <input
            id="org-size"
            type="range"
            className={styles.range}
            min={0}
            max={STEPS}
            step={1}
            value={step}
            aria-valuetext={`${fmtRevenue(rev)} annual patient care revenue`}
            style={{ '--fill': `${(step / STEPS) * 100}%` } as React.CSSProperties}
            onChange={(e) => setStep(+e.target.value)}
          />
          {REV_TICKS.map(([r, label, minor]) => (
            <button
              key={r}
              type="button"
              className={`${styles.tick} ${styles.num} ${minor ? styles.minor : ''}`}
              style={{ left: pos(fracOf(r)) }}
              aria-label={`Set annual patient care revenue to ${label}`}
              onClick={() => setStep(stepOf(r))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <span className={styles.fieldLabel}>Outage length</span>
        <div className={styles.chips} role="group" aria-label="Outage length">
          {OUTAGES.map(([h, label]) => (
            <button
              key={h}
              type="button"
              aria-pressed={hours === h}
              className={`${styles.chip} ${hours === h ? styles.chipOn : ''}`}
              onClick={() => setHours(h)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.lost}`}>
          <div className={styles.statLabel}>Revenue that never comes back</div>
          <div className={`${styles.statVal} ${styles.num}`}>{fmtAuto(parts[0])}</div>
          <div className={`${styles.statNote} ${styles.num}`}>of {fmtAuto(deferred)} in delayed care</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Total modeled impact</div>
          <div className={`${styles.statVal} ${styles.num}`}>{fmtAuto(total)}</div>
          <div className={`${styles.statNote} ${styles.num}`}>
            for a {hours}-hour outage at {fmtRevenue(rev)} revenue
          </div>
        </div>
      </div>

      <div className={styles.breakdown}>
        {NAMES.map((name, i) => (
          <div key={name} className={styles.row}>
            <span className={styles.sw} style={{ background: `var(${COLORS[i]})` }} />
            <span>
              {name} <span className={styles.grp}>{GROUPS[i]}</span>
            </span>
            <span className={`${styles.rowVal} ${styles.num}`}>{fmtAuto(parts[i])}</span>
          </div>
        ))}
        <div className={`${styles.row} ${styles.total}`}>
          <span />
          <span>Total modeled impact</span>
          <span className={`${styles.rowVal} ${styles.num}`}>{fmtAuto(total)}</span>
        </div>
      </div>

      <p className={styles.assume}>
        This scales every line in proportion to your annual patient care revenue, compared with the
        $21 billion system we modeled. It is a rough guide, not an estimate for your organisation.
        Device recovery and chart backfill really depend on your device count and paper volume, and
        your payer mix, staffing and service lines will move the rest. Outages beyond 48 hours are
        projections.
      </p>
    </section>
  );
}
