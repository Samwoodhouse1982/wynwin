'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import HowWeHelp from '@/components/HowWeHelp';
import ServiceCard from '@/components/ServiceCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import { SimpleContactForm } from '@/components/ContactForm';
import Reveal, { RevealItem } from '@/components/Reveal';
import EntranceAnimation, { ENTRANCE_TOTAL_MS } from '@/components/EntranceAnimation';
import { BRAND, CTA, HOME } from '@/lib/constants';

const STORAGE_KEY = 'wynwin_entrance_v1';

export default function HomePageClient() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  const handleComplete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1');
    setShowAnimation(false);
    setAnimationDone(true);
    // No delay: onComplete fires as the door panels start moving, so the hero
    // stagger should already be running behind them. The old 500ms wait meant
    // the doors opened onto an empty stage that populated afterwards.
    setHeroReady(true);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const prefersReduced = !!mql?.matches;
    // A logo trace earns little on a phone, and that is where the audience is
    // busiest and the connection slowest.
    const isSmallScreen = window.matchMedia?.('(max-width: 639px)').matches ?? false;

    // Skip the entrance for return visitors, small screens, and anyone who
    // prefers reduced motion — reveal the page immediately.
    if (prefersReduced || isSmallScreen || localStorage.getItem(STORAGE_KEY)) {
      setAnimationDone(true);
      setHeroReady(true);
      return;
    }

    setShowAnimation(true);

    // Fail-safe: if the entrance never reports completion (e.g. it throws),
    // reveal the page anyway. Derived from the sequence's own length so the
    // two can never drift apart and cut the finale off again.
    const failsafe = setTimeout(handleComplete, ENTRANCE_TOTAL_MS + 1500);
    return () => clearTimeout(failsafe);
  }, [handleComplete]);

  return (
    <>
      {/* No-JS fallback: force content visible when JavaScript is unavailable */}
      <noscript>
        <style>{`[data-entrance-content]{opacity:1 !important}`}</style>
      </noscript>

      {/* Page content — invisible until animation reveals it */}
      <div
        data-entrance-content
        style={{
          opacity:    animationDone ? 1 : 0,
          transition: 'opacity 0.9s ease',
        }}
      >
        <HeroSection ready={heroReady} />

        {/* Value Proposition. Dark bands alternate navy / navy-light down the
            page so sections stay distinguishable in dark mode. */}
        <section className="bg-white dark:bg-navy-light py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <Reveal stagger>
                <RevealItem>
                  <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                    Our value
                  </p>
                </RevealItem>
                <RevealItem>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy dark:text-white mb-6 leading-tight">
                    {HOME.valueProp.headline}
                  </h2>
                </RevealItem>
                {HOME.valueProp.body.split('\n\n').map((para, i) => (
                  <RevealItem key={i}>
                    <p className="text-navy/60 dark:text-white/60 text-lg leading-relaxed mb-4">{para}</p>
                  </RevealItem>
                ))}
                <RevealItem>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                      href="/get-in-touch"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark active:scale-[0.97] transition-all duration-200"
                    >
                      {CTA.primary}
                    </Link>
                    <Link
                      href="/what-we-do"
                      className="inline-flex items-center gap-2 px-7 py-3.5 border border-navy/20 dark:border-white/20 text-navy dark:text-white font-semibold rounded-full hover:border-navy dark:hover:border-white/50 hover:bg-navy/5 dark:hover:bg-white/5 active:scale-[0.97] transition-all duration-200"
                    >
                      {CTA.secondary}
                    </Link>
                  </div>
                </RevealItem>
              </Reveal>
            </div>
          </div>
        </section>

        <HowWeHelp />

        <WhyWorkWithUs background="white" />

        {/* Services Preview */}
        <section className="bg-navy py-20 lg:py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <Reveal stagger>
                <RevealItem>
                  <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                    What we do
                  </p>
                </RevealItem>
                <RevealItem>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white max-w-md">
                      What we cover.
                    </h2>
                    <Link
                      href="/what-we-do"
                      className="inline-flex items-center gap-2 text-pink font-semibold text-sm hover:gap-3 transition-all duration-200 whitespace-nowrap"
                    >
                      See all services →
                    </Link>
                  </div>
                </RevealItem>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {HOME.servicesPreview.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  body={service.body}
                  href={service.href}
                  index={i}
                />
              ))}
            </div>

          </div>
        </section>

        <TestimonialsSection />

        {/* Inline contact form — the page's single closing ask. The pink
            PreFooterCta band used to sit directly beneath this with the same
            headline; it now runs only on pages that have no inline form. */}
        <section className="bg-white dark:bg-navy py-20 lg:py-28 dark:border-t dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <Reveal direction="left">
                <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                  Get in touch
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                  Tell us what&apos;s stuck.
                </h2>
                <p className="text-navy/60 dark:text-white/60 leading-relaxed mb-6 max-w-2xl">
                  A task, a deadline, a headache — anything works. {BRAND.responsePromise}
                </p>
                <div className="space-y-2 text-sm text-navy/60 dark:text-white/60">
                  <p>
                    Or reach us directly:{' '}
                    <a href={BRAND.phoneHref} className="text-pink font-medium hover:underline">
                      {BRAND.phone}
                    </a>
                  </p>
                  <p>
                    <a href={BRAND.emailHref} className="text-pink font-medium hover:underline">
                      {BRAND.email}
                    </a>
                  </p>
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.15}>
                <div className="bg-cream dark:bg-navy rounded-2xl p-5 sm:p-8 shadow-sm">
                  <SimpleContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* Entrance animation — sits on top, removes itself when done */}
      {showAnimation && (
        <EntranceAnimation onComplete={handleComplete} />
      )}
    </>
  );
}
