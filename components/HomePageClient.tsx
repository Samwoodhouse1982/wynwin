'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import HowWeHelp from '@/components/HowWeHelp';
import ServiceCard from '@/components/ServiceCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import PreFooterCta from '@/components/PreFooterCta';
import { SimpleContactForm } from '@/components/ContactForm';
import Reveal, { RevealItem } from '@/components/Reveal';
import EntranceAnimation from '@/components/EntranceAnimation';
import { HOME } from '@/lib/constants';

const STORAGE_KEY = 'wynwin_entrance_v1';

export default function HomePageClient() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    // Play once per first visit (persists across sessions via localStorage)
    if (!localStorage.getItem(STORAGE_KEY)) {
      setShowAnimation(true);
    } else {
      // Return visitor — skip entrance, hero can animate straight away
      setAnimationDone(true);
      setHeroReady(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setAnimationDone(true);
    setShowAnimation(false);
    // Short delay so the hero stagger begins just as the doors finish clearing
    setTimeout(() => setHeroReady(true), 500);
  };

  return (
    <>
      {/* Page content — invisible until animation reveals it */}
      <div
        style={{
          opacity:    animationDone ? 1 : 0,
          transition: 'opacity 0.9s ease',
        }}
      >
        <HeroSection ready={heroReady} />

        {/* Value Proposition */}
        <section className="bg-white dark:bg-navy py-20 lg:py-28">
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
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-colors duration-200"
                    >
                      Get In Touch
                    </Link>
                    <Link
                      href="/what-we-do"
                      className="inline-flex items-center gap-2 px-7 py-3.5 border border-navy/20 dark:border-white/20 text-navy dark:text-white font-semibold rounded-full hover:border-navy dark:hover:border-white/50 hover:bg-navy/5 dark:hover:bg-white/5 transition-colors duration-200"
                    >
                      See What We Do
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

        {/* Inline Contact Form */}
        <section className="bg-cream dark:bg-navy py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <Reveal direction="left">
                <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                  Get in touch
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                  Ready to get things done?
                </h2>
                <p className="text-navy/60 dark:text-white/60 leading-relaxed mb-6">
                  Drop us a message and we&apos;ll come back to you fast, usually the same day.
                </p>
                <div className="space-y-2 text-sm text-navy/60 dark:text-white/60">
                  <p>
                    Or reach us directly:{' '}
                    <a href="tel:+447307176143" className="text-pink font-medium hover:underline">
                      0730 717 6143
                    </a>
                  </p>
                  <p>
                    <a href="mailto:hello@wynwin.co.uk" className="text-pink font-medium hover:underline">
                      hello@wynwin.co.uk
                    </a>
                  </p>
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.15}>
                <div className="bg-white dark:bg-navy-light rounded-2xl p-8 shadow-sm">
                  <SimpleContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <PreFooterCta />
      </div>

      {/* Entrance animation — sits on top, removes itself when done */}
      {showAnimation && (
        <EntranceAnimation onComplete={handleComplete} />
      )}
    </>
  );
}
