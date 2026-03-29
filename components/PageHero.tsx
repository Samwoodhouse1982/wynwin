'use client';

import { motion, type Variants } from 'framer-motion';
import { SunFlare } from '@/components/SunFlare';

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
    <section className={`${dark ? 'bg-navy' : 'bg-cream dark:bg-navy-light'} py-20 lg:py-28 overflow-hidden relative`}>
      {/* Angled grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: dark ? 0.04 : 0.06 }}>
        <motion.div
          className="absolute -inset-[120px]"
          style={{
            backgroundImage:
              `repeating-linear-gradient(45deg,transparent,transparent 60px,${dark ? '#fff' : '#0a1628'} 60px,${dark ? '#fff' : '#0a1628'} 61px),repeating-linear-gradient(-45deg,transparent,transparent 60px,${dark ? '#fff' : '#0a1628'} 60px,${dark ? '#fff' : '#0a1628'} 61px)`,
          }}
          animate={{ x: [0, 85], y: [0, 85] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Glow blob */}
      {dark && (
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink rounded-full opacity-5 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      )}

      {/* Sun flare — top right */}
      <SunFlare className="absolute top-0 right-0 w-[520px] h-[520px] opacity-70" />

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
            className={`text-5xl md:text-6xl font-bold mb-4 leading-tight ${dark ? 'text-white' : 'text-navy dark:text-white'}`}
          >
            {headline}
          </motion.h1>
          {subline && (
            <motion.p
              variants={item}
              className={`text-xl max-w-xl ${dark ? 'text-white/60' : 'text-navy/60 dark:text-white/60'}`}
            >
              {subline}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
