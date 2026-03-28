'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { DiamondAccent } from '@/components/DiamondGraphic';
import { HOME } from '@/lib/constants';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const pillar: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

interface Props {
  background?: 'cream' | 'white' | 'navy';
}

export default function WhyWorkWithUs({ background = 'white' }: Props) {
  const isDark = background === 'navy';
  const bgClass = isDark
    ? 'bg-navy text-white'
    : background === 'cream'
    ? 'bg-cream text-navy'
    : 'bg-white text-navy';

  return (
    <section className={`${bgClass} py-20 lg:py-28`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-14"
        >
          <p className="text-pink font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
            <DiamondAccent />
            Why work with us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold max-w-lg">
            Three reasons clients trust WYN WIN.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {HOME.whyUs.map((item, i) => (
            <motion.div
              key={item.number}
              variants={pillar}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group"
            >
              {/* Animated top line */}
              <div className="relative h-0.5 bg-navy/10 mb-6 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-pink"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.2 + 0.3 }}
                />
              </div>

              <motion.span
                className="block text-6xl font-bold text-pink/20 group-hover:text-pink/50 transition-colors duration-500 mb-4 leading-none"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 + 0.2 }}
              >
                {item.number}
              </motion.span>

              <p className="text-lg font-semibold leading-snug">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14"
        >
          <Link
            href="/get-in-touch"
            className={`inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-full transition-colors duration-200 ${
              isDark
                ? 'bg-pink text-white hover:bg-pink-dark'
                : 'bg-navy text-white hover:bg-navy-light'
            }`}
          >
            Work with us →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
