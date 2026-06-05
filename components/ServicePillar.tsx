'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICE_ICON_MAP } from '@/components/ServiceSectionIcons';

interface Service {
  name: string;
  detail: string;
}

interface ServicePillarProps {
  id: string;
  title: string;
  services: readonly Service[];
  index: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ServicePillar({ id, title, services, index }: ServicePillarProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={id}
      className={`py-14 lg:py-20 scroll-mt-36 ${isEven ? 'bg-cream dark:bg-navy-light' : 'bg-white dark:bg-navy'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading with animated underline sweep */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-3">
            0{index + 1}
          </p>
          <div className="flex items-center gap-4">
            {/* Animated icon */}
            <div className="flex-shrink-0 opacity-90">
              {(() => { const Icon = SERVICE_ICON_MAP[id]; return Icon ? <Icon /> : null; })()}
            </div>
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white">{title}</h2>
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-pink"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-navy/5 dark:bg-white/5 hover:bg-navy/10 dark:hover:bg-white/10 rounded-2xl p-7 transition-colors duration-200 cursor-default"
            >
              <div className="flex items-start gap-3">
                <div className="mt-[9px] w-1.5 h-1.5 rounded-full bg-pink flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-navy dark:text-white mb-2 leading-snug">{service.name}</h3>
                  <p className="text-navy/60 dark:text-white/70 text-sm leading-relaxed">{service.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Per-pillar CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-between border-t border-navy/10 dark:border-white/10 pt-8"
        >
          <p className="text-navy/50 dark:text-white/70 text-sm">Need help with {title.toLowerCase()}?</p>
          <Link
            href="/get-in-touch"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink text-white font-semibold text-sm rounded-full hover:bg-pink-dark transition-colors duration-200"
          >
            Get in touch <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
