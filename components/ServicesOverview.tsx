'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { SERVICE_ICON_MAP } from '@/components/ServiceSectionIcons';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ServicesOverview() {
  return (
    <section className="bg-cream border-b border-navy/8 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          className="text-pink font-semibold text-xs uppercase tracking-widest mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          At a glance
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {SERVICES.pillars.map((pillar, i) => (
            <motion.div key={pillar.id} variants={card}>
              <Link
                href={`#${pillar.id}`}
                className="group flex flex-col h-full bg-white rounded-2xl p-5 border border-navy/8 hover:border-pink/40 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  {(() => { const Icon = SERVICE_ICON_MAP[pillar.id]; return Icon ? <Icon /> : null; })()}
                  <span className="text-[10px] font-bold text-pink tracking-[0.2em] uppercase">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-navy text-sm leading-snug mb-3">
                  {pillar.title}
                </h3>
                <div className="h-px bg-navy/8 mb-3" />
                <ul className="flex-1 space-y-1.5 mb-4">
                  {pillar.services.map((s) => (
                    <li key={s.name} className="text-xs text-navy/55 leading-snug">
                      {s.name}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1 text-pink text-xs font-semibold group-hover:gap-2 transition-all duration-200">
                  View section <ArrowRight size={11} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
