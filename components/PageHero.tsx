'use client';

import { motion, type Variants } from 'framer-motion';
import { SunFlare } from '@/components/SunFlare';
import { DUR, EASE_OUT, STAGGER } from '@/lib/motion';

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  subline?: string;
}

// Previously took a `dark` prop defaulting to true, which made the hero navy in
// both themes — so light mode never reached the top of any inner page. Nothing
// ever passed the prop, so it is gone and the hero simply follows the theme.
export default function PageHero({ eyebrow, headline, subline }: PageHeroProps) {
  return (
    <section className="bg-cream dark:bg-navy py-14 sm:py-20 lg:py-28 overflow-hidden relative">
      {/* Angled grid — colour comes from the theme token, since white lines are
          invisible on a light ground. Static: the drift ran parallel to one
          stripe family and snapped on every loop, at an imperceptible opacity. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] dark:opacity-[0.04]">
        <div
          className="absolute -inset-[120px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg,transparent,transparent 60px,var(--grid-line) 60px,var(--grid-line) 61px),repeating-linear-gradient(-45deg,transparent,transparent 60px,var(--grid-line) 60px,var(--grid-line) 61px)',
          }}
        />
      </div>

      {/* Glow blob */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink rounded-full opacity-[0.05] blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Sun flare — top right. Entirely pink, so it reads on cream as a warm
          bloom; it just sits back further on a light ground. */}
      <SunFlare className="absolute top-0 right-0 w-[520px] h-[520px] opacity-45 dark:opacity-70" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-pink font-semibold text-sm uppercase tracking-widest mb-4"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-navy dark:text-white"
          >
            {headline}
          </motion.h1>
          {subline && (
            <motion.p
              variants={item}
              className="text-xl max-w-xl text-navy/60 dark:text-white/60"
            >
              {subline}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
