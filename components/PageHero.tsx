'use client';

import { motion, type Variants } from 'framer-motion';
import { DiamondCorner } from '@/components/DiamondGraphic';

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  subline?: string;
  dark?: boolean;
}

export default function PageHero({ eyebrow, headline, subline, dark = true }: PageHeroProps) {
  return (
    <section className={`${dark ? 'bg-navy' : 'bg-cream'} py-20 lg:py-28 overflow-hidden relative`}>
      {/* Glow blob */}
      {dark && (
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink rounded-full opacity-5 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      )}

      {/* Diamond graphic — top-right corner, mostly cropped */}
      <DiamondCorner className="absolute -top-16 -right-16 w-64 h-64 lg:w-80 lg:h-80 opacity-60" />

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
            className={`text-5xl md:text-6xl font-bold mb-4 leading-tight ${dark ? 'text-white' : 'text-navy'}`}
          >
            {headline}
          </motion.h1>
          {subline && (
            <motion.p
              variants={item}
              className={`text-xl max-w-xl ${dark ? 'text-white/60' : 'text-navy/60'}`}
            >
              {subline}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
