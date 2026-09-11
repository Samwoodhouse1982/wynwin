'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroServiceShowcase from '@/components/HeroServiceShowcase';
import { SunFlare } from '@/components/SunFlare';
import { BRAND, HOME, SERVICES } from '@/lib/constants';
import { DUR, EASE_OUT, STAGGER } from '@/lib/motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT } },
};

export default function HeroSection({ ready = false }: { ready?: boolean }) {
  const { headline, body, ctas } = HOME.hero;

  return (
    <section className="relative bg-cream dark:bg-navy lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Angled grid — static texture. It used to drift, but the translation ran
          parallel to one stripe family and snapped on every loop, at an opacity
          nobody could perceive. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] dark:opacity-[0.04]">
        <div
          className="absolute -inset-[120px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg,transparent,transparent 60px,var(--grid-line) 60px,var(--grid-line) 61px),repeating-linear-gradient(-45deg,transparent,transparent 60px,var(--grid-line) 60px,var(--grid-line) 61px)',
          }}
        />
      </div>

      {/* Pink glow blob — left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink rounded-full opacity-[0.07] dark:opacity-10 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Sun flare — top right. Sized per breakpoint so the bloom does not land
          behind the eyebrow and headline on a phone. */}
      <SunFlare className="absolute -top-24 -right-24 w-[420px] h-[420px] opacity-45 dark:opacity-60 sm:w-[520px] sm:h-[520px] lg:top-0 lg:right-0 lg:w-[680px] lg:h-[680px] lg:opacity-55 dark:lg:opacity-85" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER } } }}
          >
            <motion.p
              variants={fadeUp}
              className="text-pink font-semibold text-sm uppercase tracking-widest mb-6"
            >
              {BRAND.tagline}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy dark:text-white leading-tight tracking-tight mb-8"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl text-navy/70 dark:text-white/70 leading-relaxed mb-10 max-w-xl"
            >
              {body}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4"
            >
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={
                    cta.variant === 'primary'
                      ? 'group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark active:scale-[0.97] transition-all duration-200'
                      : 'inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 border border-navy/25 dark:border-white/30 text-navy dark:text-white font-semibold rounded-full hover:border-navy dark:hover:border-white hover:bg-navy/5 dark:hover:bg-white/5 active:scale-[0.97] transition-all duration-200'
                  }
                >
                  {cta.label}
                  {cta.variant === 'primary' && (
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  )}
                </Link>
              ))}
            </motion.div>

            {/* The showcase is hidden below lg, so on a phone the page said
                nothing concrete about the services until roughly 2,500px down.
                One scrollable row of pillar names, each a direct link. */}
            <motion.div variants={fadeUp} className="lg:hidden -mx-6 mt-8 px-6">
              <div className="flex gap-2 overflow-x-auto snap-x scrollbar-none pb-1">
                {SERVICES.pillars.map((pillar) => (
                  <Link
                    key={pillar.id}
                    href={`/what-we-do#${pillar.id}`}
                    className="snap-start shrink-0 px-3.5 py-2 rounded-full border border-navy/20 dark:border-white/25 text-navy/80 dark:text-white/85 text-xs font-medium whitespace-nowrap active:scale-[0.97] transition-transform"
                  >
                    {pillar.short}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: service showcase ── */}
          <div className="hidden lg:block">
            <HeroServiceShowcase ready={ready} />
          </div>
        </div>
      </div>

    </section>
  );
}
