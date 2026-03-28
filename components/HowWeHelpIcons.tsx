'use client';

import { motion } from 'framer-motion';

// Icon for "Remove operational bottlenecks"
// Three paths converge through a central mint node, dots travel along them
export function BottleneckIcon() {
  const lineStyle = {
    stroke: '#0D1B3E' as const,
    strokeOpacity: 0.18,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
  };

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Converging lines */}
      <line x1={4} y1={10} x2={21} y2={24} {...lineStyle} />
      <line x1={4} y1={24} x2={21} y2={24} {...lineStyle} />
      <line x1={4} y1={38} x2={21} y2={24} {...lineStyle} />
      {/* Spreading lines */}
      <line x1={27} y1={24} x2={44} y2={10} {...lineStyle} />
      <line x1={27} y1={24} x2={44} y2={24} {...lineStyle} />
      <line x1={27} y1={24} x2={44} y2={38} {...lineStyle} />

      {/* Central node — pulses */}
      <motion.circle
        cx={24} cy={24} r={5}
        fill="#00C896"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />

      {/* Dot — top path */}
      <motion.circle cx={4} cy={10} r={2.5} fill="#E8006A"
        animate={{ cx: [4, 24, 44], cy: [10, 24, 10], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      {/* Dot — middle path */}
      <motion.circle cx={4} cy={24} r={2.5} fill="#E8006A"
        animate={{ cx: [4, 24, 44], cy: [24, 24, 24], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      {/* Dot — bottom path */}
      <motion.circle cx={4} cy={38} r={2.5} fill="#E8006A"
        animate={{ cx: [4, 24, 44], cy: [38, 24, 38], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1.0 }}
      />
    </svg>
  );
}

// Icon for "Get stuck in"
// Pink circle slides out from behind left circle to create Venn overlap
export function TeamIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Left circle — client team, static */}
      <circle
        cx={16} cy={24} r={12}
        stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.2}
        fill="none"
      />

      {/* Right circle — WYN WIN, emerges from left and slides to overlap position */}
      <motion.circle
        cx={16} cy={24} r={12}
        stroke="#E8006A" strokeWidth={1.5}
        fill="none"
        animate={{ cx: [16, 32, 32, 16], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
      />

      {/* Overlap indicator — pulses mint when circles are joined */}
      <motion.circle
        cx={24} cy={24} r={5}
        fill="#00C896"
        animate={{
          opacity: [0, 0, 0.85, 0.85, 0],
          scale:   [0.4, 0.4, 1.1,  1.0,  0.4],
        }}
        transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.25, 0.42, 0.7, 1] }}
      />
    </svg>
  );
}

// Icon for "Fast, flexible, and reliable"
// Mint arc draws itself around a circle, pink checkmark appears inside
export function SpeedIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Track ring */}
      <circle
        cx={24} cy={24} r={18}
        stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.12}
        fill="none"
      />

      {/* Animated arc sweeps round */}
      <motion.circle
        cx={24} cy={24} r={18}
        stroke="#00C896" strokeWidth={2.5} strokeLinecap="round"
        fill="none"
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.45, 0.75, 1] }}
      />

      {/* Checkmark draws in when arc completes */}
      <motion.path
        d="M15 24 L21 30 L33 17"
        stroke="#E8006A" strokeWidth={2.5}
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
        animate={{ pathLength: [0, 0, 1, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.4, 0.65, 0.78, 1] }}
      />
    </svg>
  );
}
