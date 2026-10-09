'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { SunFlare } from '@/components/SunFlare';
import { TbcNote } from '@/components/RoiShared';
import { trackEvent } from '@/lib/analytics';
import { ROI } from '@/lib/constants';
import { DUR, EASE_OUT, STAGGER } from '@/lib/motion';

// Same shape as components/PageHero.tsx: page heroes settle at `slow`, and
// every stagger on the site uses the one STAGGER value.
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

export default function RoiHero() {
  const { hero } = ROI;

  return (
    <section className="relative overflow-hidden bg-cream py-14 sm:py-20 dark:bg-navy lg:py-28">
      {/* Angled grid — same treatment as PageHero. Colour comes from the theme
          token, since white lines are invisible on a light ground. Static: the
          drift ran parallel to one stripe family and snapped on every loop, at
          an opacity nobody could perceive. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05] dark:opacity-[0.04]">
        <div
          className="absolute -inset-[120px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg,transparent,transparent 60px,var(--grid-line) 60px,var(--grid-line) 61px),repeating-linear-gradient(-45deg,transparent,transparent 60px,var(--grid-line) 60px,var(--grid-line) 61px)',
          }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-pink opacity-[0.05] blur-3xl" />
      {/* The flare is entirely pink, so it reads on cream as a warm bloom; it
          just sits back further on a light ground. */}
      <SunFlare className="absolute right-0 top-0 h-[520px] w-[520px] opacity-45 dark:opacity-70" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy — first in the DOM, so it stays first when stacked */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* The page's one pink moment, as on every other page hero. */}
            <motion.p variants={item} className="mb-4 text-sm font-semibold uppercase tracking-widest text-pink">
              {hero.eyebrow}
            </motion.p>

            {/* Alternative H1 for Sam to choose between:
                "Show your value. Close the deal." */}
            <motion.h1
              variants={item}
              className="mb-6 text-4xl font-bold leading-tight text-navy dark:text-white sm:text-5xl md:text-6xl"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-8 max-w-xl leading-relaxed text-navy/70 dark:text-white/70"
            >
              {hero.body}
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row">
              <a
                href={hero.primaryCta.href}
                onClick={() => trackEvent('cta_click', { cta: 'primary', page: 'roi-calculators' })}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-dark active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
              >
                {hero.primaryCta.label}
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a
                href={hero.secondaryCta.href}
                onClick={() => trackEvent('cta_click', { cta: 'secondary', page: 'roi-calculators' })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-navy/25 px-7 py-3.5 font-semibold text-navy transition-all duration-200 hover:border-navy hover:bg-navy/5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:border-white/40 dark:text-white dark:hover:border-white dark:hover:bg-white/10 dark:focus-visible:outline-white"
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 max-w-xl space-y-3">
              <p className="text-sm text-navy/60 dark:text-white/55">{hero.credibility.text}</p>
              <TbcNote>{hero.credibility.tbc}</TbcNote>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, delay: 0.2, ease: EASE_OUT }}
          >
            {hero.image.src ? (
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="h-auto w-full rounded-2xl border border-navy/10 object-cover dark:border-white/10"
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-navy/25 bg-navy/[0.03] px-6 py-14 text-center dark:border-white/25 dark:bg-white/5"
                style={{ aspectRatio: `${hero.image.width} / ${hero.image.height}` }}
              >
                <ImageIcon size={32} className="text-navy/40 dark:text-white/40" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-widest text-navy/50 dark:text-white/50">
                  Hero photo
                </p>
                <TbcNote className="max-w-sm text-left">{hero.image.tbc}</TbcNote>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
