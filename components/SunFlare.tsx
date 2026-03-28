'use client';

import { motion } from 'framer-motion';

const CX = 478;
const CY = 22;

export function SunFlare({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
        <defs>
          {/* Gradient fills — rich centre fading to transparent */}
          <radialGradient id="sf-grad-hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff2d8a" stopOpacity="1" />
            <stop offset="40%"  stopColor="#E8006A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E8006A" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="sf-grad-mid" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E8006A" stopOpacity="0.6" />
            <stop offset="60%"  stopColor="#c4005a" stopOpacity="0.2" />
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

          {/* Blur filters */}
          <filter id="sf-f-wide"  x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="70" />
          </filter>
          <filter id="sf-f-mid"   x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
          <filter id="sf-f-tight" x="-80%"  y="-80%"  width="260%" height="260%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="sf-f-ring"  x="-40%"  y="-40%"  width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sf-f-core"  x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* ── Outer ambient bloom — very wide, very soft ── */}
        <motion.circle cx={CX} cy={CY} r={320}
          fill="url(#sf-grad-mid)"
          filter="url(#sf-f-wide)"
          animate={{ opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Mid bloom ── */}
        <motion.circle cx={CX} cy={CY} r={180}
          fill="url(#sf-grad-hot)"
          filter="url(#sf-f-mid)"
          animate={{ opacity: [0.32, 0.50, 0.32] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* ── Inner bloom ── */}
        <motion.circle cx={CX} cy={CY} r={80}
          fill="url(#sf-grad-hot)"
          filter="url(#sf-f-tight)"
          animate={{ opacity: [0.50, 0.72, 0.50] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* ── Large ghost ring — drifts slowly in a gentle ellipse ── */}
        <motion.circle
          r={185}
          stroke="#E8006A" strokeWidth={1.2} fill="none"
          filter="url(#sf-f-ring)"
          animate={{
            cx: [300, 316, 306, 290, 300],
            cy: [110,  120,  136,  122,  110],
            opacity: [0.18, 0.32, 0.22, 0.30, 0.18],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Secondary ghost spot — orbits slowly around its centre ── */}
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

        {/* ── Smaller ghost ring — counter-drifts ── */}
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

        {/* ── Tertiary soft spot ── */}
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

        {/* ── Bright core point ── */}
        <motion.circle cx={CX} cy={CY} r={22}
          fill="url(#sf-grad-hot)"
          filter="url(#sf-f-core)"
          animate={{ opacity: [0.70, 1, 0.70] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
