'use client';

import { motion, type Variants } from 'framer-motion';

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  stagger?: boolean;
  once?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  stagger = false,
  once = true,
}: RevealProps) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: '-80px' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay }}
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
  duration = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[direction]}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}
