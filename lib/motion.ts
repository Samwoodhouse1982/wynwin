// ============================================================
// Motion tokens
// ============================================================
// Ten components each defined their own durations, offsets, staggers and
// easings — seven distinct durations and five staggers across the site — so
// adjacent sections settled at different speeds and nothing shared an easing
// curve. That is what makes motion feel busy rather than designed, and it made
// a global tempo change ("everything 20% snappier") a ten-file edit.
//
// Rule of thumb: page heroes use `slow`, section content uses `base`, and
// hover/press feedback uses `fast`.

import type { Variants } from 'framer-motion';

/** Expressive ease-out — quick to start, settles softly. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DUR = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
} as const;

/** How far an element travels before settling. */
export const OFFSET = 24;

/** Gap between staggered children. */
export const STAGGER = 0.08;

/** Reveal once, a little before the element reaches the fold. */
export const VIEWPORT = { once: true, margin: '-80px' } as const;

const settle = { duration: DUR.base, ease: EASE_OUT };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: OFFSET },
  show: { opacity: 1, y: 0, transition: settle },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -OFFSET },
  show: { opacity: 1, x: 0, transition: settle },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: OFFSET },
  show: { opacity: 1, x: 0, transition: settle },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: settle },
};

export const DIRECTION_VARIANTS: Record<string, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  none: fadeIn,
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};
