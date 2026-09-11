import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ServicePillar from '@/components/ServicePillar';
import ServicesNav from '@/components/ServicesNav';
import ServicesOverview from '@/components/ServicesOverview';
import PageHero from '@/components/PageHero';
import HowWeWork from '@/components/HowWeWork';
import Reveal, { RevealItem } from '@/components/Reveal';
import { FullContactForm } from '@/components/ContactForm';
import { SERVICES, REGULATED_MARKETS, META } from '@/lib/constants';
import { SlashMark } from '@/components/SlashMark';

export const metadata: Metadata = {
  title: META.whatWeDo.title,
  description: META.whatWeDo.description,
  openGraph: {
    title: META.whatWeDo.title,
    description: META.whatWeDo.description,
    url: `${META.siteUrl}/what-we-do`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: META.ogAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.whatWeDo.title,
    description: META.whatWeDo.description,
    images: ['/opengraph-image'],
  },
};

export default function WhatWeDoPage() {
  return (
    <>
      {/* The eyebrow carries the label, the H1 carries a message. Both used to
          say 'what we do', and the one genuinely informative sentence on the
          page sat below in a 14px bordered note. */}
      <PageHero
        eyebrow="What we do"
        headline="Marketing execution, end to end."
        subline={SERVICES.intro}
      />

      {/* Scenario entry points. Most visitors recognise their own situation
          faster than they recognise a service category. */}
      <section className="bg-white dark:bg-navy py-14 lg:py-20 dark:border-t dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal stagger>
            <RevealItem>
              <p className="text-navy/50 dark:text-white/50 font-semibold text-sm uppercase tracking-widest flex items-center gap-2 mb-6">
                <SlashMark />
                Sound familiar?
              </p>
            </RevealItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.scenarios.map((scenario) => (
                <RevealItem key={scenario.href}>
                  <Link
                    href={scenario.href}
                    className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-navy/10 dark:border-white/10 hover:border-pink/50 bg-cream dark:bg-white/5 p-6 active:scale-[0.99] transition-all duration-200"
                  >
                    <p className="text-navy dark:text-white font-semibold leading-snug">
                      {scenario.text}
                    </p>
                    <span className="inline-flex items-center gap-2 text-pink font-semibold text-sm">
                      Start here
                      <ArrowRight
                        size={14}
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesOverview />

      {/* The sticky index sits directly above the sections it indexes. It used
          to appear three sections higher, tracking headings the visitor had
          not reached yet. */}
      <ServicesNav />

      {/* Regulated markets. This is the one capability a generic marketing
          freelancer cannot claim, so it gets full section scale, an anchor, a
          sub-nav entry and an ask of its own — it used to be the smallest type
          on the page with nothing linking to it and nothing to do at the end. */}
      <section
        id="regulated"
        className="bg-white dark:bg-navy border-y border-navy/10 dark:border-white/10 py-14 sm:py-20 lg:py-28 scroll-mt-36"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal stagger>
            <RevealItem>
              <p className="text-navy/50 dark:text-white/50 font-semibold text-sm uppercase tracking-widest flex items-center gap-2 mb-4">
                <SlashMark />
                {REGULATED_MARKETS.eyebrow}
              </p>
            </RevealItem>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal stagger>
              <RevealItem>
                <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-6 leading-tight max-w-xl">
                  {REGULATED_MARKETS.headline}
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="text-navy/70 dark:text-white/70 text-lg leading-relaxed mb-4 max-w-2xl">
                  {REGULATED_MARKETS.intro}
                </p>
              </RevealItem>
              <RevealItem>
                <p className="text-navy/65 dark:text-white/65 text-base leading-relaxed max-w-2xl">
                  {REGULATED_MARKETS.body}
                </p>
              </RevealItem>
              <RevealItem>
                <div className="pt-8">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark active:scale-[0.97] transition-all duration-200"
                  >
                    Ask about regulated marketing
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </RevealItem>
            </Reveal>

            <Reveal stagger>
              {REGULATED_MARKETS.capabilities.map((cap) => (
                <RevealItem key={cap.heading} direction="right">
                  <div className="border-l-2 border-pink/30 hover:border-pink pl-5 mb-7 transition-colors duration-300 cursor-default">
                    <h3 className="text-base font-bold text-navy dark:text-white mb-1.5">{cap.heading}</h3>
                    <p className="text-navy/60 dark:text-white/60 text-sm leading-relaxed">{cap.body}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      {SERVICES.pillars.map((pillar, i) => (
        <ServicePillar
          key={pillar.id}
          id={pillar.id}
          title={pillar.title}
          services={pillar.services}
          index={i}
        />
      ))}

      <HowWeWork />

      {/* Contact CTA — id lets the per-pillar CTAs point here instead of
          sending the visitor to another page with the same form on it. */}
      <section id="contact" className="bg-cream dark:bg-navy-light py-14 sm:py-20 lg:py-28 scroll-mt-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal direction="left">
              <p className="text-navy/50 dark:text-white/50 font-semibold text-sm uppercase tracking-widest flex items-center gap-2 mb-4">
                <SlashMark />
                Contact us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Tell us what you need.
              </h2>
              <p className="text-navy/60 dark:text-white/60 leading-relaxed">
                Whether it&apos;s an urgent request or a longer-term project, we&apos;re ready to help.
                Get in touch and we&apos;ll respond fast.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <FullContactForm source="what-we-do" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
