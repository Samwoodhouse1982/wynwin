'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { HeroDiamonds } from '@/components/DiamondGraphic';
import { BRAND } from '@/lib/constants';

export default function PreFooterCta() {
  return (
    <section className="bg-pink relative overflow-hidden">
      {/* Subtle diagonal pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '18px 18px',
        }}
      />
      {/* Diamond graphic — right edge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-15 pointer-events-none">
        <HeroDiamonds />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">
              Whatever You Need
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to get things done?
            </h2>
            <p className="text-white/75 mt-2">
              We respond fast — usually the same day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
          >
            <Link
              href="/get-in-touch"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pink font-bold rounded-full hover:bg-cream transition-colors duration-200"
            >
              Get In Touch
              <ArrowRight size={16} />
            </Link>
            <a
              href={BRAND.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-colors duration-200"
            >
              <Phone size={15} />
              {BRAND.phone}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
