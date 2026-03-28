'use client';

import { motion } from 'framer-motion';

// ── Simple diamond (rhombus) centred at 250,250 in a 500×500 viewBox ─────────
const D = '250,50 460,250 250,450 40,250';
const CORNERS = D.split(' ').map((p) => p.split(',').map(Number) as [number, number]);

// Accent mark — tiny rhombus for eyebrow ornament (80×80 viewBox)
const ACCENT = '40,4 76,40 40,76 4,40';

// ── Concertina: squash vertically → normal → squash horizontally → normal ────
const SQUEEZE_ANIM = {
  scaleX: [1, 0.55, 1, 1.55, 1],
  scaleY: [1, 1.6,  1, 0.58, 1],
};
const SQUEEZE_T = {
  duration: 4,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  times: [0, 0.25, 0.5, 0.75, 1],
};

// ── HeroDiamonds ─────────────────────────────────────────────────────────────
// Right-side graphic on the home hero. Diamond window with light shining through.
export function HeroDiamonds() {
  return (
    <svg viewBox="0 0 500 500" fill="none" aria-hidden="true" className="w-full h-full">
      <defs>
        {/* Soft edge glow */}
        <filter id="hd-edge" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Wide ambient bloom */}
        <filter id="hd-bloom" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        {/* Corner sparkle */}
        <filter id="hd-spark" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        {/* Sweeping flare */}
        <filter id="hd-sweep" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="22" />
        </filter>

        {/* Diamond mask — light visible only through the diamond window */}
        <mask id="hd-mask">
          <motion.g
            style={{ transformOrigin: '250px 250px' }}
            animate={SQUEEZE_ANIM}
            transition={SQUEEZE_T}
          >
            <polygon points={D} fill="white" />
          </motion.g>
        </mask>
      </defs>

      {/* ── Ambient light source visible through the diamond window ── */}
      <g mask="url(#hd-mask)">
        {/* Base warm glow */}
        <motion.circle
          cx="260" cy="210" r="200"
          fill="white"
          filter="url(#hd-bloom)"
          animate={{ opacity: [0.35, 0.6, 0.35], cy: [210, 230, 210] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Pink tint towards edges */}
        <motion.circle
          cx="250" cy="250" r="240"
          fill="#E8006A"
          filter="url(#hd-bloom)"
          animate={{ opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Sweeping light shaft — the flare that the diamond interrupts */}
        <motion.g
          animate={{ x: [-350, 550], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
            times: [0, 0.1, 0.9, 1],
          }}
        >
          <rect
            x="180" y="-20" width="140" height="540"
            fill="white"
            filter="url(#hd-sweep)"
            transform="rotate(-18 250 250)"
          />
        </motion.g>
      </g>

      {/* ── Diamond frame — the window edges that catch the light ── */}
      <motion.g
        style={{ transformOrigin: '250px 250px' }}
        animate={SQUEEZE_ANIM}
        transition={SQUEEZE_T}
      >
        {/* Outer glow halo on edges */}
        <polygon
          points={D}
          stroke="white"
          strokeWidth="14"
          opacity="0.12"
          filter="url(#hd-edge)"
        />
        {/* Main pink edge */}
        <polygon
          points={D}
          stroke="#E8006A"
          strokeWidth="2.5"
          opacity="0.9"
          filter="url(#hd-edge)"
        />
        {/* Thin white inner highlight */}
        <polygon points={D} stroke="white" strokeWidth="0.75" opacity="0.6" />

        {/* Corner sparkles — light refracting at each vertex */}
        {CORNERS.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="12"
            fill="white"
            filter="url(#hd-spark)"
            animate={{ opacity: [0.2, 0.85, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

// ── DiamondCorner ─────────────────────────────────────────────────────────────
// Corner decoration for page heroes — same window concept, no sweep.
export function DiamondCorner({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
        <defs>
          <filter id="dc-edge" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dc-bloom" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="dc-spark" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="9" />
          </filter>

          <mask id="dc-mask">
            <motion.g
              style={{ transformOrigin: '250px 250px' }}
              animate={SQUEEZE_ANIM}
              transition={SQUEEZE_T}
            >
              <polygon points={D} fill="white" />
            </motion.g>
          </mask>
        </defs>

        {/* Light through diamond window */}
        <g mask="url(#dc-mask)">
          <motion.circle
            cx="260" cy="210" r="200"
            fill="white"
            filter="url(#dc-bloom)"
            animate={{ opacity: [0.3, 0.55, 0.3], cy: [210, 230, 210] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="250" cy="250" r="240"
            fill="#E8006A"
            filter="url(#dc-bloom)"
            animate={{ opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </g>

        {/* Diamond frame */}
        <motion.g
          style={{ transformOrigin: '250px 250px' }}
          animate={SQUEEZE_ANIM}
          transition={SQUEEZE_T}
        >
          <polygon
            points={D}
            stroke="white"
            strokeWidth="14"
            opacity="0.1"
            filter="url(#dc-edge)"
          />
          <polygon
            points={D}
            stroke="#E8006A"
            strokeWidth="2.5"
            opacity="0.7"
            filter="url(#dc-edge)"
          />
          <polygon points={D} stroke="white" strokeWidth="0.75" opacity="0.5" />

          {CORNERS.map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r="10"
              fill="white"
              filter="url(#dc-spark)"
              animate={{ opacity: [0.15, 0.7, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}

// ── DiamondAccent ─────────────────────────────────────────────────────────────
// Tiny inline spinning rhombus — eyebrow ornament.
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
      <polygon points={ACCENT} stroke={color} strokeWidth="4" fill={color} fillOpacity="0.15" />
    </motion.svg>
  );
}

// ── SectionDiamondBg ──────────────────────────────────────────────────────────
// Very faint concertinaing diamond in the background of navy sections.
export function SectionDiamondBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 900 600"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute w-full h-full"
      >
        <motion.g
          transform="translate(540 50) scale(0.85)"
          style={{ transformOrigin: '790px 300px' }}
          animate={SQUEEZE_ANIM}
          transition={{ ...SQUEEZE_T, duration: 6 }}
        >
          <polygon points={D} stroke="white" strokeWidth="1" opacity="0.06" />
          <polygon points={D} stroke="#E8006A" strokeWidth="0.5" opacity="0.04" />
        </motion.g>
      </svg>
    </div>
  );
}
