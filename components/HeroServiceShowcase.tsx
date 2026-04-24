'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SERVICES = [
  {
    number: '01',
    lines: ['Strategy &', 'Intelligence'],
    chips: ['Go-to-Market', 'Market Research', 'Competitor Intel', 'Segmentation', 'Awards', 'Sales Enablement', 'ABM', 'Product Marketing', 'Regulated Markets', 'Health Economics'],
  },
  {
    number: '02',
    lines: ['Brand &', 'Creative'],
    chips: ['PR & Media', 'Thought Leadership', 'Influencers', 'Case Studies', 'Content', 'Brand Research', 'Web Design & Dev'],
  },
  {
    number: '03',
    lines: ['Projects &', 'Campaigns'],
    chips: ['Campaigns', 'Email Marketing', 'SEO', 'Social Media', 'Paid Media', 'Events', 'Launches', 'Internal Comms', 'Reporting'],
  },
  {
    number: '04',
    lines: ['Operations &', 'Management'],
    chips: ['Assets', 'MarTech', 'Fulfilment', 'Data Compliance', 'Fractional Experts'],
  },
  {
    number: '05',
    lines: ['Logistics &', 'Procurement'],
    chips: ['Venues', 'Print & Merch', 'Storage', 'Purchasing'],
  },
] as const;

const TICK = 3600; // ms per service

export default function HeroServiceShowcase({ ready = false }: { ready?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [key, setKey] = useState(0); // forces progress bar to restart

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % SERVICES.length;
        return next;
      });
      setKey((k) => k + 1);
    }, TICK);
    return () => clearInterval(t);
  }, [paused]);

  const s = SERVICES[active];

  return (
    <motion.div
      className="relative flex flex-col justify-center"
      initial={{ opacity: 0, x: 40 }}
      animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Outer card */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">

        {/* Top bar — service counter + pink progress line */}
        <div className="relative h-0.5 bg-white/10">
          <AnimatePresence>
            {!paused && (
              <motion.div
                key={key}
                className="absolute inset-y-0 left-0 bg-pink"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: TICK / 1000, ease: 'linear' }}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 lg:p-10">
          {/* Tab indicators + labels — top nav */}
          <div className="grid grid-cols-5 gap-2 mb-8">
            {SERVICES.map((svc, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  setKey((k) => k + 1);
                  setPaused(false);
                }}
                className="group text-left"
                aria-label={`View ${svc.lines.join(' ')}`}
              >
                <div
                  className={`h-0.5 rounded-full mb-1.5 transition-colors duration-300 ${
                    i === active ? 'bg-pink' : 'bg-white/15 group-hover:bg-white/30'
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider leading-tight block transition-colors duration-300 ${
                    i === active ? 'text-pink' : 'text-white/50 group-hover:text-white/70'
                  }`}
                >
                  {svc.lines[0].replace(' &', '')}
                </span>
              </button>
            ))}
          </div>

          {/* Capability chips */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`chips-${active}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap gap-2"
            >
              {s.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full border border-white/15 text-white/50 text-xs font-medium"
                >
                  {chip}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer link */}
        <Link
          href="/what-we-do"
          className="flex items-center justify-between px-8 lg:px-10 py-4 border-t border-white/10 text-white/40 hover:text-white/70 text-xs font-medium transition-colors group"
        >
          <span>See all services</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
