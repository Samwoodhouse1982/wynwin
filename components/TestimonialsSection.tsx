'use client';

import { motion, type Variants } from 'framer-motion';
import { DiamondAccent } from '@/components/DiamondGraphic';
import { TESTIMONIALS } from '@/lib/constants';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TestimonialsSection() {
  return (
    <section className="bg-cream dark:bg-navy py-20 lg:py-28">
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
            What clients say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white max-w-lg">
            Trusted by teams who need things done.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={card}
              className="relative bg-white dark:bg-white/5 border border-navy/8 dark:border-white/10 hover:border-pink/30 rounded-2xl p-8 flex flex-col gap-6 overflow-hidden transition-colors duration-300"
            >
              {/* Large decorative quote mark */}
              <svg
                aria-hidden
                className="absolute top-4 right-6 text-pink/15 dark:text-pink/10 pointer-events-none"
                width="120"
                height="90"
                viewBox="0 0 32 24"
                fill="currentColor"
              >
                <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6.4 7.2 10.4H12V24H0Zm17.6 0V14.4C17.6 6.4 22.4 1.6 32 0l1.6 2.4C27.2 3.6 24.4 6.4 24 10.4H28.8V24H17.6Z" />
              </svg>

              {/* Small functional quote mark */}
              <svg
                width="28"
                height="21"
                viewBox="0 0 32 24"
                fill="none"
                aria-hidden
                className="text-pink flex-shrink-0"
              >
                <path
                  d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6.4 7.2 10.4H12V24H0Zm17.6 0V14.4C17.6 6.4 22.4 1.6 32 0l1.6 2.4C27.2 3.6 24.4 6.4 24 10.4H28.8V24H17.6Z"
                  fill="currentColor"
                />
              </svg>

              <p className="text-navy/75 dark:text-white/75 text-lg leading-relaxed flex-1 relative">{t.quote}</p>

              <div className="border-t border-navy/10 dark:border-white/10 pt-5">
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-navy dark:text-white text-sm hover:text-pink dark:hover:text-pink transition-colors duration-200"
                >
                  {t.name}
                </a>
                <p className="text-navy/50 dark:text-white/50 text-sm">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
