'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICE_ICON_MAP } from '@/components/ServiceSectionIcons';
import { setEnquiryTopic } from '@/lib/enquiry';
import { DUR, EASE_OUT, STAGGER } from '@/lib/motion';

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
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
};

const cardContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
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
          transition={{ duration: DUR.base, ease: EASE_OUT }}
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
                transition={{ duration: DUR.slow, delay: 0.3, ease: EASE_OUT }}
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
              // Inert card — tint only, no transform (see HowWeHelp).
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
          transition={{ duration: DUR.base, delay: 0.3, ease: EASE_OUT }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-navy/10 dark:border-white/10 pt-8"
        >
          <p className="text-navy/50 dark:text-white/70 text-sm">Need help with {title.toLowerCase()}?</p>
          {/* Points at the form already further down this page rather than
              sending the visitor somewhere else to meet the same five fields,
              and carries the pillar through so they need not re-explain it. */}
          <Link
            href="#contact"
            onClick={() => setEnquiryTopic(title)}
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-11 px-5 py-2.5 bg-pink text-white font-semibold text-sm rounded-full hover:bg-pink-dark active:scale-[0.97] transition-all duration-200"
          >
            Ask about {title.toLowerCase()}
            <ArrowRight
              size={14}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
