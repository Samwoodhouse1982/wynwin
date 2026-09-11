'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';

// ─────────────────────────────────────────────────────────
// Strategy & Intelligence
// Three target rings draw in from outside in, centre pulses
// ─────────────────────────────────────────────────────────
export function StrategyIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Crosshair ticks */}
      <line x1={22} y1={2}  x2={22} y2={8}  stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.18} strokeLinecap="round" />
      <line x1={22} y1={36} x2={22} y2={42} stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.18} strokeLinecap="round" />
      <line x1={2}  y1={22} x2={8}  y2={22} stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.18} strokeLinecap="round" />
      <line x1={36} y1={22} x2={42} y2={22} stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.18} strokeLinecap="round" />

      {/* Outer ring */}
      <motion.circle cx={22} cy={22} r={17}
        stroke="#E8006A" strokeWidth={1.5} fill="none"
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.28, 0.78, 1] }}
      />
      {/* Middle ring */}
      <motion.circle cx={22} cy={22} r={11}
        stroke="#0D1B3E" strokeWidth={1.5} fill="none" strokeOpacity={0.25}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.28, 0.78, 1], delay: 0.22 }}
      />
      {/* Inner ring */}
      <motion.circle cx={22} cy={22} r={5}
        stroke="#0D1B3E" strokeWidth={1.5} fill="none" strokeOpacity={0.25}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.28, 0.78, 1], delay: 0.44 }}
      />
      {/* Centre dot — appears last, then fades with everything */}
      <motion.circle cx={22} cy={22} r={2.5} fill="#E8006A"
        animate={{ scale: [0, 1.3, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.52, 0.62, 0.78, 1] }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Brand & Creative
// 8 sparkle rays burst from centre, staggered
// ─────────────────────────────────────────────────────────
export function BrandIcon() {
  // [x1, y1, x2, y2] — inner point → outer point, centre (22,22), inner r=8, outer r=17
  const RAYS = [
    [30, 22, 39, 22],   //   0° right
    [28, 28, 34, 34],   //  45° lower-right
    [22, 30, 22, 39],   //  90° down
    [16, 28, 10, 34],   // 135° lower-left
    [14, 22,  5, 22],   // 180° left
    [16, 16, 10, 10],   // 225° upper-left
    [22, 14, 22,  5],   // 270° up
    [28, 16, 34, 10],   // 315° upper-right
  ] as const;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {RAYS.map(([x1, y1, x2, y2], i) => (
        <motion.line key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#E8006A" strokeWidth={2} strokeLinecap="round"
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      <motion.circle cx={22} cy={22} r={4} fill="#E8006A"
        animate={{ scale: [0.7, 1.4, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Operations & Management
// Dashed gear ring rotates, centre dot pulses
// ─────────────────────────────────────────────────────────
export function OperationsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* translate(22,22) centres the rotation origin reliably in SVG */}
      <g transform="translate(22,22)">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={0} cy={0} r={16}
            stroke="#E8006A" strokeWidth={3}
            strokeDasharray="5 2.5" strokeLinecap="round"
            fill="none"
          />
        </motion.g>
      </g>
      {/* Static inner ring */}
      <circle cx={22} cy={22} r={8}
        stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.18}
        fill="none"
      />
      {/* Centre pulse */}
      <motion.circle cx={22} cy={22} r={2.5} fill="#E8006A"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Sourcing & Procurement
// Magnifying glass draws in; inner crosshair reveals
// ─────────────────────────────────────────────────────────
export function SourcingIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Lens */}
      <motion.circle cx={17} cy={17} r={12}
        stroke="#E8006A" strokeWidth={2} fill="none"
        animate={{ pathLength: [0, 1, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.28, 0.6, 0.85, 1] }}
      />
      {/* Handle */}
      <motion.line x1={26} y1={26} x2={38} y2={38}
        stroke="#E8006A" strokeWidth={2.5} strokeLinecap="round"
        animate={{ pathLength: [0, 0, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.22, 0.42, 0.85, 1] }}
      />
      {/* Inner crosshair — vertical */}
      <motion.line x1={17} y1={9} x2={17} y2={25}
        stroke="#0D1B3E" strokeWidth={1} strokeLinecap="round" strokeOpacity={0.3}
        animate={{ pathLength: [0, 0, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.34, 0.5, 0.85, 1] }}
      />
      {/* Inner crosshair — horizontal */}
      <motion.line x1={9} y1={17} x2={25} y2={17}
        stroke="#0D1B3E" strokeWidth={1} strokeLinecap="round" strokeOpacity={0.3}
        animate={{ pathLength: [0, 0, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.34, 0.5, 0.85, 1] }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Logistics & Event Support
// Pink dot travels a triangular route between locations
// ─────────────────────────────────────────────────────────
export function LogisticsIcon() {
  const VERTICES = [[22, 6], [38, 36], [6, 36]] as const;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Static route */}
      <path d="M 22 6 L 38 36 L 6 36 Z"
        stroke="#0D1B3E" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round"
        fill="none" strokeOpacity={0.15}
      />
      {/* Location pins — staggered pulse */}
      {VERTICES.map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r={3}
          fill="#0D1B3E"
          animate={{ scale: [1, 1.7, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
      {/* Travelling dot */}
      <motion.circle r={3.5} fill="#E8006A"
        animate={{ cx: [22, 38, 6, 22], cy: [6, 36, 36, 6] }}
        transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.33, 0.67, 1] }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Projects & Campaigns
// Three bars rise sequentially like a campaign build-up
// ─────────────────────────────────────────────────────────
export function CampaignsIcon() {
  const BARS = [
    { x: 7,  maxH: 16, delay: 0 },
    { x: 19, maxH: 26, delay: 0.28 },
    { x: 31, maxH: 34, delay: 0.56 },
  ] as const;
  const BASE_Y = 42;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {BARS.map(({ x, maxH, delay }, i) => (
        <g key={i}>
          <rect x={x} y={BASE_Y - maxH} width={8} height={maxH} rx={2} fill="#0D1B3E" fillOpacity={0.08} />
          <motion.rect
            x={x} width={8} rx={2} fill="#E8006A"
            animate={{
              height: [0, maxH, maxH, 0],
              y: [BASE_Y, BASE_Y - maxH, BASE_Y - maxH, BASE_Y],
            }}
            transition={{ duration: 3.2, repeat: Infinity, delay, times: [0, 0.32, 0.72, 1] }}
          />
        </g>
      ))}
      <line x1={3} y1={BASE_Y} x2={41} y2={BASE_Y} stroke="#0D1B3E" strokeWidth={1.5} strokeOpacity={0.18} strokeLinecap="round" />
    </svg>
  );
}

// Lookup map — keyed by pillar id
export const SERVICE_ICON_MAP: Record<string, ComponentType> = {
  strategy:   StrategyIcon,
  brand:      BrandIcon,
  projects:   CampaignsIcon,
  operations: OperationsIcon,
  logistics:  LogisticsIcon,
};
