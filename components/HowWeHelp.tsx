'use client';

import { motion, type Variants } from 'framer-motion';
import { DiamondAccent } from '@/components/DiamondGraphic';
import { BottleneckIcon, TeamIcon, SpeedIcon } from '@/components/HowWeHelpIcons';
import { HOME } from '@/lib/constants';

const ICONS = [BottleneckIcon, TeamIcon, SpeedIcon];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function HowWeHelp() {
  return (
    <section className="bg-cream dark:bg-navy py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-3"
        >
          <p className="text-pink font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
            <DiamondAccent speed={12} />
            How we help
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white max-w-xl">
            We become part of your team.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {HOME.howWeHelp.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                variants={card}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-white/5 border border-navy/8 dark:border-white/10 hover:border-pink/40 rounded-2xl p-8 transition-colors duration-300 cursor-default"
              >
                <motion.div
                  className="mb-5"
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 + 0.3 }}
                >
                  <Icon />
                </motion.div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-3">{item.heading}</h3>
                <p className="text-navy/60 dark:text-white/60 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
