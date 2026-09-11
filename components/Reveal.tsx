'use client';

import { motion } from 'framer-motion';
import {
  DIRECTION_VARIANTS,
  DUR,
  EASE_OUT,
  staggerContainer,
  VIEWPORT,
} from '@/lib/motion';

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  stagger?: boolean;
  once?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = DUR.base,
  direction = 'up',
  stagger = false,
  once = VIEWPORT.once,
}: RevealProps) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: VIEWPORT.margin }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={DIRECTION_VARIANTS[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: VIEWPORT.margin }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

// Child item for use inside a stagger container
export function RevealItem({
  children,
  className,
  direction = 'up',
  duration = DUR.base,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={DIRECTION_VARIANTS[direction]}
      transition={{ duration, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
