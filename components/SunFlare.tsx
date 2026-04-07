'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

// Bloom core — anchored to top-right corner
const CX = 492;
const CY = 8;

// Subtle hair-line rays fanning from the SVG corner (500, 0)
const RAYS = [
  { x2: 0,   y2: 0,   w: 0.6, o: [0.18, 0.30, 0.18] as const, dur: 8,  d: 0.0 }, // 180° horizontal
  { x2: 18,  y2: 130, w: 0.5, o: [0.14, 0.24, 0.14] as const, dur: 10, d: 0.8 }, // 195°
  { x2: 67,  y2: 250, w: 0.5, o: [0.16, 0.26, 0.16] as const, dur: 9,  d: 1.6 }, // 210°
  { x2: 146, y2: 354, w: 0.7, o: [0.20, 0.32, 0.20] as const, dur: 11, d: 0.4 }, // 225° — main diagonal
  { x2: 250, y2: 433, w: 0.5, o: [0.14, 0.24, 0.14] as const, dur: 8,  d: 2.0 }, // 240°
  { x2: 371, y2: 482, w: 0.4, o: [0.12, 0.20, 0.12] as const, dur: 13, d: 2.8 }, // 255°
  { x2: 500, y2: 500, w: 0.5, o: [0.15, 0.25, 0.15] as const, dur: 7,  d: 0.6 }, // 270° vertical
] as const;

export function SunFlare({ className = '' }: { className?: string }) {
  const { scrollY } = useScroll();

  // Glare circles drift downward as the user scrolls — as if the sun angle is shifting.
  // Two layers at different rates to create parallax depth.
  const ringsY  = useTransform(scrollY, [0, 600], [0, 80]);   // rings — slower
  const spotsY  = useTransform(scrollY, [0, 600], [0, 130]);  // spots — faster

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
        <defs>
          {/* Ray stroke — radial fade centred on the corner */}
          <radialGradient id="sf-ray-grad" cx="500" cy="0" r="750" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ff2d8a" stopOpacity="1" />
            <stop offset="12%"  stopColor="#ff0d7a" stopOpacity="0.85" />
            <stop offset="45%"  stopColor="#E8006A" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#E8006A" stopOpacity="0" />
          </radialGradient>

          {/* Bloom fills */}
          <radialGradient id="sf-grad-hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff2d8a" stopOpacity="1" />
            <stop offset="40%"  stopColor="#E8006A" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#E8006A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sf-grad-mid" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E8006A" stopOpacity="0.85" />
            <stop offset="55%"  stopColor="#c4005a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E8006A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sf-grad-cool" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff80b4" stopOpacity="0.5" />
            <stop offset="50%"  stopColor="#E8006A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E8006A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sf-grad-ghost" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff4da6" stopOpacity="0.7" />
            <stop offset="70%"  stopColor="#E8006A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E8006A" stopOpacity="0" />
          </radialGradient>

          {/* Filters */}
          <filter id="sf-f-ray" x="-500%" y="-500%" width="1100%" height="1100%">
            <feGaussianBlur stdDeviation="3" result="b1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="b2" />
            <feMerge>
              <feMergeNode in="b1" />
              <feMergeNode in="b2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sf-f-wide"  x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="65" />
          </filter>
          <filter id="sf-f-mid"   x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          <filter id="sf-f-tight" x="-80%"  y="-80%"  width="260%" height="260%">
            <feGaussianBlur stdDeviation="11" />
          </filter>
          <filter id="sf-f-ring"  x="-40%"  y="-40%"  width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sf-f-core"  x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* ── Static: outer ambient bloom ── */}
        <motion.circle cx={CX} cy={CY} r={350}
          fill="url(#sf-grad-mid)"
          filter="url(#sf-f-wide)"
          animate={{ opacity: [0.42, 0.58, 0.42] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Static: mid bloom ── */}
        <motion.circle cx={CX} cy={CY} r={200}
          fill="url(#sf-grad-hot)"
          filter="url(#sf-f-mid)"
          animate={{ opacity: [0.62, 0.82, 0.62] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* ── Static: inner bloom ── */}
        <motion.circle cx={CX} cy={CY} r={90}
          fill="url(#sf-grad-hot)"
          filter="url(#sf-f-tight)"
          animate={{ opacity: [0.78, 0.96, 0.78] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* ── Static: hair-line rays ── */}
        {RAYS.map((ray, i) => (
          <motion.line
            key={i}
            x1={500} y1={0} x2={ray.x2} y2={ray.y2}
            stroke="url(#sf-ray-grad)"
            strokeWidth={ray.w}
            strokeLinecap="round"
            filter="url(#sf-f-ray)"
            animate={{ opacity: ray.o }}
            transition={{ duration: ray.dur, repeat: Infinity, ease: 'easeInOut', delay: ray.d }}
          />
        ))}

        {/* ── Scroll-driven: ghost rings — drift down slowly ── */}
        <motion.g style={{ y: ringsY }}>
          <motion.circle
            r={185}
            stroke="#E8006A" strokeWidth={1.2} fill="none"
            filter="url(#sf-f-ring)"
            animate={{
              cx: [300, 316, 306, 290, 300],
              cy: [110, 120, 136, 122, 110],
              opacity: [0.18, 0.32, 0.22, 0.30, 0.18],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r={72}
            stroke="#ff4da6" strokeWidth={0.8} fill="none"
            filter="url(#sf-f-ring)"
            animate={{
              cx: [195, 182, 190, 208, 195],
              cy: [192, 204, 218, 204, 192],
              opacity: [0.10, 0.20, 0.14, 0.18, 0.10],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </motion.g>

        {/* ── Scroll-driven: soft glare spots — drift faster for depth ── */}
        <motion.g style={{ y: spotsY }}>
          <motion.circle
            r={50}
            fill="url(#sf-grad-ghost)"
            filter="url(#sf-f-mid)"
            animate={{
              cx: [275, 290, 282, 264, 275],
              cy: [130, 142, 158, 140, 130],
              opacity: [0.18, 0.30, 0.20, 0.28, 0.18],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.circle
            r={28}
            fill="url(#sf-grad-cool)"
            filter="url(#sf-f-tight)"
            animate={{
              cx: [182, 170, 178, 196, 182],
              cy: [210, 222, 238, 222, 210],
              opacity: [0.12, 0.22, 0.15, 0.20, 0.12],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
        </motion.g>

        {/* ── Static: bright core ── */}
        <motion.circle cx={CX} cy={CY} r={30}
          fill="url(#sf-grad-hot)"
          filter="url(#sf-f-core)"
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
