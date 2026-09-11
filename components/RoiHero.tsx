'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { SunFlare } from '@/components/SunFlare';
import { TbcNote } from '@/components/RoiShared';
import { trackEvent } from '@/lib/analytics';
import { ROI } from '@/lib/constants';

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function RoiHero() {
  const { hero } = ROI;

  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      {/* Angled grid — same treatment as PageHero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
        <motion.div
          className="absolute -inset-[120px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg,transparent,transparent 60px,#fff 60px,#fff 61px),repeating-linear-gradient(-45deg,transparent,transparent 60px,#fff 60px,#fff 61px)',
          }}
          animate={{ x: [0, 85], y: [0, 85] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-pink opacity-5 blur-3xl" />
      <SunFlare className="absolute right-0 top-0 h-[520px] w-[520px] opacity-70" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy — first in the DOM, so it stays first when stacked */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="mb-4 text-sm font-semibold uppercase tracking-widest text-pink">
              {hero.eyebrow}
            </motion.p>

            {/* Alternative H1 for Sam to choose between:
                "Show your value. Close the deal." */}
            <motion.h1
              variants={item}
              className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            >
              {hero.headline}
            </motion.h1>

            <motion.p variants={item} className="mb-8 max-w-xl leading-relaxed text-white/70">
              {hero.body}
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row">
              <a
                href={hero.primaryCta.href}
                onClick={() => trackEvent('cta_click', { cta: 'primary', page: 'roi-calculators' })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-pink-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {hero.primaryCta.label}
                <ArrowRight size={16} aria-hidden />
              </a>
              <a
                href={hero.secondaryCta.href}
                onClick={() => trackEvent('cta_click', { cta: 'secondary', page: 'roi-calculators' })}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 max-w-xl space-y-3">
              <p className="text-sm text-white/55">{hero.credibility.text}</p>
              <TbcNote onDark>{hero.credibility.tbc}</TbcNote>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {hero.image.src ? (
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="h-auto w-full rounded-2xl border border-white/10 object-cover"
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/25 bg-white/5 px-6 py-14 text-center"
                style={{ aspectRatio: `${hero.image.width} / ${hero.image.height}` }}
              >
                <ImageIcon size={32} className="text-white/40" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
                  Hero photo
                </p>
                <TbcNote onDark className="max-w-sm text-left">{hero.image.tbc}</TbcNote>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
