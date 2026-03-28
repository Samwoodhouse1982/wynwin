'use client';

import { motion } from 'framer-motion';

// ── Logo shape coordinates ────────────────────────────────────────────────────
//
// The WYN WIN mark is two nested, elongated skewed parallelograms —
// think stacked planes tilting forward. The long axis runs upper-left →
// lower-right, the shape tapers at top and bottom like a tall kite.
//
// All coordinates assume a 500 × 500 viewBox.
//
// OUTER shape — the larger plane (back layer)
const OUTER = '245,8 422,178 255,492 78,322';
// INNER shape — smaller plane (front layer), offset right+down
const INNER = '278,68 392,192 234,444 120,318';

// Tiny accent version (scaled down to ~80px, offset to centre of a 80×80 box)
const ACCENT_OUTER = '40,2 72,30 42,78 10,50';
const ACCENT_INNER = '47,12 65,32 38,70 20,50';

// ── Filters ───────────────────────────────────────────────────────────────────
const Defs = ({ id }: { id: string }) => (
  <defs>
    <filter id={`${id}-pink`} x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id={`${id}-white`} x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id={`${id}-bloom`} x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="22" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// ── Helper — parse polygon string into [cx, cy] centroid ─────────────────────
function centroid(pts: string): [number, number] {
  const pairs = pts.trim().split(/\s+/).map((p) => p.split(',').map(Number));
  const cx = pairs.reduce((s, [x]) => s + x, 0) / pairs.length;
  const cy = pairs.reduce((s, [, y]) => s + y, 0) / pairs.length;
  return [cx, cy];
}

const [OCX, OCY] = centroid(OUTER); // ≈ 250, 250
const [ICX, ICY] = centroid(INNER); // ≈ 256, 256

// ── HeroDiamonds ─────────────────────────────────────────────────────────────
// The main hero graphic — two interacting logo-mark planes animated on the
// right side of the hero. Used in HeroSection.
export function HeroDiamonds() {
  return (
    <svg viewBox="0 0 500 500" fill="none" aria-hidden="true" className="w-full h-full">
      <Defs id="hd" />

      {/* ── Background echo rings (very faint, different speeds) ── */}
      {(['10,48 470,198 490,452 30,302', '30,28 450,218 470,472 50,282'] as const).map(
        (pts, i) => (
          <motion.polygon
            key={i}
            points={pts}
            stroke="white"
            strokeWidth="0.5"
            opacity={0.04}
            style={{ transformOrigin: `${OCX}px ${OCY}px` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + i * 20, repeat: Infinity, ease: 'linear' }}
          />
        )
      )}

      {/* ── Outer plane — pink, rocks forward ── */}
      <motion.g
        style={{ transformOrigin: `${OCX}px ${OCY}px` }}
        animate={{ rotate: [0, 3, 0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glow halo */}
        <polygon
          points={OUTER}
          stroke="#E8006A"
          strokeWidth="3"
          opacity="0.3"
          filter="url(#hd-pink)"
        />
        {/* Main stroke */}
        <polygon points={OUTER} stroke="#E8006A" strokeWidth="2" opacity="0.9" />
        {/* Dashed inner echo */}
        <polygon
          points={OUTER}
          stroke="#E8006A"
          strokeWidth="0.75"
          opacity="0.2"
          strokeDasharray="8 8"
          transform="scale(0.88) translate(30 30)"
        />
        {/* Corner accent dots */}
        {OUTER.split(' ').map((p, i) => {
          const [cx, cy] = p.split(',').map(Number);
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill="#E8006A"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.6, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
            />
          );
        })}
      </motion.g>

      {/* ── Inner plane — white, rocks back (opposite phase) ── */}
      <motion.g
        style={{ transformOrigin: `${ICX}px ${ICY}px` }}
        animate={{ rotate: [0, -3, 0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <polygon
          points={INNER}
          stroke="white"
          strokeWidth="3"
          opacity="0.1"
          filter="url(#hd-white)"
        />
        <polygon points={INNER} stroke="white" strokeWidth="1.5" opacity="0.6" />
        <polygon
          points={INNER}
          stroke="white"
          strokeWidth="0.5"
          opacity="0.15"
          strokeDasharray="6 6"
          transform="scale(0.9) translate(25 25)"
        />
        {INNER.split(' ').map((p, i) => {
          const [cx, cy] = p.split(',').map(Number);
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              fill="white"
              animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 + 2 }}
            />
          );
        })}
      </motion.g>

      {/* ── Overlap bloom — glows where the two planes interact ── */}
      <motion.ellipse
        cx="285"
        cy="258"
        rx="40"
        ry="70"
        fill="#E8006A"
        animate={{ opacity: [0.05, 0.16, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
        filter="url(#hd-bloom)"
        transform="rotate(-32 285 258)"
      />

      {/* ── Animated dashed spine connecting outer & inner centres ── */}
      <motion.line
        x1={OCX} y1={OCY} x2={ICX} y2={ICY}
        stroke="white"
        strokeWidth="0.75"
        opacity="0.25"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -8] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Floating particle logo-marks ── */}
      {(
        [
          { tx: -170, ty: -210, s: 0.18, delay: 0,   color: '#E8006A' },
          { tx:  180, ty: -210, s: 0.14, delay: 1.4, color: 'white'   },
          { tx:  200, ty:  190, s: 0.16, delay: 0.7, color: 'white'   },
          { tx: -190, ty:  190, s: 0.13, delay: 2.1, color: '#E8006A' },
          { tx:   -5, ty: -240, s: 0.12, delay: 0.4, color: 'white'   },
          { tx:    5, ty:  240, s: 0.10, delay: 1.8, color: '#E8006A' },
          { tx:  240, ty:   -5, s: 0.11, delay: 1.1, color: 'white'   },
          { tx: -240, ty:    5, s: 0.09, delay: 2.5, color: '#E8006A' },
          { tx: -120, ty: -230, s: 0.08, delay: 3.0, color: 'white'   },
          { tx:  120, ty:  230, s: 0.08, delay: 0.9, color: '#E8006A' },
        ] as { tx: number; ty: number; s: number; delay: number; color: string }[]
      ).map(({ tx, ty, s, delay, color }, i) => (
        <motion.g
          key={i}
          transform={`translate(${250 + tx} ${250 + ty}) scale(${s})`}
          animate={{ opacity: [0.12, 0.45, 0.12], y: [0, -10, 0] }}
          transition={{ duration: 3.5 + delay * 0.3, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <polygon points={OUTER} stroke={color} strokeWidth="3" opacity="1" fill="none" />
        </motion.g>
      ))}
    </svg>
  );
}

// ── DiamondCorner ─────────────────────────────────────────────────────────────
// Partial logo-mark for page hero top-right corners — mostly off-screen.
export function DiamondCorner({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
        <defs>
          <filter id="dc-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Back echo — slow rotation */}
        <motion.polygon
          points={OUTER}
          stroke="#E8006A"
          strokeWidth="0.8"
          opacity="0.12"
          style={{ transformOrigin: `${OCX}px ${OCY}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        {/* Main outer */}
        <motion.polygon
          points={OUTER}
          stroke="#E8006A"
          strokeWidth="1.5"
          opacity="0.5"
          style={{ transformOrigin: `${OCX}px ${OCY}px` }}
          animate={{ rotate: [0, 2.5, 0, -2.5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#dc-glow)"
        />
        {/* Inner plane */}
        <motion.polygon
          points={INNER}
          stroke="white"
          strokeWidth="1"
          opacity="0.25"
          style={{ transformOrigin: `${ICX}px ${ICY}px` }}
          animate={{ rotate: [0, -2.5, 0, 2.5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </svg>
    </div>
  );
}

// ── DiamondAccent ─────────────────────────────────────────────────────────────
// Tiny inline spinning logo-mark — used as an eyebrow ornament.
export function DiamondAccent({
  color = '#E8006A',
  size = 16,
  speed = 10,
}: {
  color?: string;
  size?: number;
  speed?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      style={{ transformOrigin: 'center', display: 'inline-block', flexShrink: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      <polygon points={ACCENT_OUTER} stroke={color} strokeWidth="4" fill={color} fillOpacity="0.15" />
      <polygon points={ACCENT_INNER} stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
    </motion.svg>
  );
}

// ── SectionDiamondBg ──────────────────────────────────────────────────────────
// Very faint animated logo-marks in the background of navy sections.
export function SectionDiamondBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 900 600"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute w-full h-full opacity-[0.04]"
      >
        {/* Outer plane — back-right */}
        <motion.g
          transform="translate(550 50) scale(0.9)"
          style={{ transformOrigin: `${OCX + 550}px ${OCY + 50}px` }}
          animate={{ rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polygon points={OUTER} stroke="white" strokeWidth="1.5" />
        </motion.g>
        {/* Inner plane — front-right, counter-rock */}
        <motion.g
          transform="translate(600 80) scale(0.75)"
          style={{ transformOrigin: `${ICX + 600}px ${ICY + 80}px` }}
          animate={{ rotate: [0, -2, 0, 2, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <polygon points={INNER} stroke="#E8006A" strokeWidth="2" />
        </motion.g>
      </svg>
    </div>
  );
}
