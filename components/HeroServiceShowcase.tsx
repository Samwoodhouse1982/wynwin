'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SERVICES as SERVICE_DATA } from '@/lib/constants';

// The five pillars, their short tab labels and their hero chips all come
// from the catalogue. This component used to keep its own hand-typed copy,
// which is why the same pillar appeared in three different spellings.
const PILLARS = SERVICE_DATA.pillars;

// Counted from the catalogue rather than hard-coded, so the figure in the
// footer link cannot go stale when a service is added or merged.
const TOTAL_SERVICES = SERVICE_DATA.pillars.reduce(
  (n, pillar) => n + pillar.services.length,
  0,
);

// Time on screen scales with how much there is to read — ten chips took the
// same 3.6s as four, which was not long enough to scan the longest set.
const tickFor = (chipCount: number) => 3000 + chipCount * 250;

// The chip area is pinned to the tallest set so the card stops growing and
// shrinking by a row in the reader's peripheral vision every few seconds.
const MAX_CHIPS = Math.max(...PILLARS.map((p) => p.chips.length));

export default function HeroServiceShowcase({ ready = false }: { ready?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [key, setKey] = useState(0); // forces progress bar to restart

  const tick = tickFor(PILLARS[active].chips.length);

  useEffect(() => {
    if (paused) return;
    // Don't auto-advance for visitors who prefer reduced motion.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => {
      setActive((i) => (i + 1) % PILLARS.length);
      setKey((k) => k + 1);
    }, tick);
    return () => clearTimeout(t);
  }, [paused, active, tick]);

  const s = PILLARS[active];

  return (
    <motion.div
      className="relative flex flex-col justify-center"
      initial={{ opacity: 0, x: 40 }}
      animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Keyboard users tabbing through the pillar buttons get the same control
      // as someone hovering.
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Outer card */}
      <div className="border border-navy/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none">

        {/* Top bar — service counter + pink progress line */}
        <div className="relative h-0.5 bg-navy/10 dark:bg-white/10">
          <AnimatePresence>
            {!paused && (
              <motion.div
                key={key}
                className="absolute inset-y-0 left-0 bg-pink"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: tick / 1000, ease: 'linear' }}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 lg:p-10">
          {/* Says what the card is. Without it the richest 'what do they do'
              content in the first viewport reads as decorative texture. */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-navy/50 dark:text-white/60 mb-5">
            What we can take off your plate
          </p>

          {/* Tab indicators + labels — top nav */}
          <div className="grid grid-cols-5 gap-2 mb-8">
            {PILLARS.map((svc, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  setKey((k) => k + 1);
                  setPaused(false);
                }}
                className="group text-left"
                aria-label={`View ${svc.title}`}
              >
                <div
                  className={`h-0.5 rounded-full mb-1.5 transition-colors duration-300 ${
                    i === active ? 'bg-pink' : 'bg-navy/15 dark:bg-white/15 group-hover:bg-navy/30 dark:group-hover:bg-white/30'
                  }`}
                />
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider leading-tight block transition-colors duration-300 ${
                    i === active ? 'text-pink' : 'text-navy/60 dark:text-white/60 group-hover:text-navy dark:group-hover:text-white/85'
                  }`}
                >
                  {svc.short}
                </span>
              </button>
            ))}
          </div>

          {/* Capability chips. min-h is sized to the largest set (about three
              rows) so the card keeps a constant height as sets swap. */}
          <div style={{ minHeight: `${Math.ceil(MAX_CHIPS / 3) * 2}rem` }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`chips-${active}`}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.03 } },
                }}
                className="flex flex-wrap gap-2"
              >
                {s.chips.map((chip) => (
                  <motion.span
                    key={chip}
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
                    }}
                    className="px-3 py-1 rounded-full border border-navy/20 dark:border-white/25 text-navy/80 dark:text-white/85 text-xs font-medium"
                  >
                    {chip}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer link */}
        <Link
          href="/what-we-do"
          className="flex items-center justify-between px-8 lg:px-10 py-4 border-t border-navy/10 dark:border-white/10 text-pink hover:text-pink-dark text-xs font-semibold transition-colors group"
        >
          <span>See all {TOTAL_SERVICES} services</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
