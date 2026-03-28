'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroServiceShowcase from '@/components/HeroServiceShowcase';
import { SunFlare } from '@/components/SunFlare';
import { HOME } from '@/lib/constants';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function HeroSection() {
  const { headline, body, tagline, ctas } = HOME.hero;

  return (
    <section className="relative bg-navy min-h-[90vh] flex items-center overflow-hidden">
      {/* Angled grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
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

      {/* Pink glow blob — left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Sun flare — top right */}
      <SunFlare className="absolute top-0 right-0 w-[560px] h-[560px] opacity-60" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="text-pink font-semibold text-sm uppercase tracking-widest mb-6"
            >
              WYN WIN Services
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-4 max-w-xl"
            >
              {body}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base font-semibold text-mint mb-10"
            >
              {tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={
                    cta.variant === 'primary'
                      ? 'inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-all duration-200 hover:gap-3'
                      : 'inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:border-white hover:bg-white/5 transition-all duration-200'
                  }
                >
                  {cta.variant === 'primary'
                    ? <>GET <strong>IT</strong> DONE.</>
                    : cta.label}
                  {cta.variant === 'primary' && <ArrowRight size={16} />}
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: service showcase ── */}
          <div className="hidden lg:block">
            <HeroServiceShowcase />
          </div>
        </div>
      </div>

    </section>
  );
}
