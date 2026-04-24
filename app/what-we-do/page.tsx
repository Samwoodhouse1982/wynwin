import type { Metadata } from 'next';
import ServicePillar from '@/components/ServicePillar';
import ServicesNav from '@/components/ServicesNav';
import ServicesOverview from '@/components/ServicesOverview';
import PageHero from '@/components/PageHero';
import HowWeWork from '@/components/HowWeWork';
import PreFooterCta from '@/components/PreFooterCta';
import Reveal, { RevealItem } from '@/components/Reveal';
import { FullContactForm } from '@/components/ContactForm';
import { SERVICES, REGULATED_MARKETS, META } from '@/lib/constants';

export const metadata: Metadata = {
  title: META.whatWeDo.title,
  description: META.whatWeDo.description,
  openGraph: {
    title: META.whatWeDo.title,
    description: META.whatWeDo.description,
    url: `${META.siteUrl}/what-we-do`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
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
      <PageHero
        eyebrow="Our services"
        headline="What We Do"
        subline="Whatever you need. Whenever it's needed."
      />

      <ServicesNav />

      {/* Breadth reassurance */}
      <div className="bg-white dark:bg-navy border-b border-navy/8 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <p className="text-navy/60 dark:text-white/55 text-sm leading-relaxed max-w-2xl border-l-2 border-pink/50 pl-4">
            {SERVICES.intro}
          </p>
        </div>
      </div>

      <ServicesOverview />

      {/* Regulated markets callout */}
      <section className="bg-white dark:bg-navy border-y border-navy/10 dark:border-white/10 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal stagger>
            <RevealItem>
              <p className="text-pink font-semibold text-xs uppercase tracking-widest mb-3">
                {REGULATED_MARKETS.eyebrow}
              </p>
            </RevealItem>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal stagger>
              <RevealItem>
                <h2 className="text-xl md:text-2xl font-bold text-navy dark:text-white mb-4 leading-snug">
                  {REGULATED_MARKETS.headline}
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="text-navy/65 dark:text-white/65 text-sm leading-relaxed mb-3">
                  {REGULATED_MARKETS.intro}
                </p>
              </RevealItem>
              <RevealItem>
                <p className="text-navy/65 dark:text-white/65 text-sm leading-relaxed">
                  {REGULATED_MARKETS.body}
                </p>
              </RevealItem>
            </Reveal>

            <Reveal stagger>
              {REGULATED_MARKETS.capabilities.map((cap) => (
                <RevealItem key={cap.heading} direction="right">
                  <div className="border-l-2 border-pink/30 hover:border-pink pl-4 mb-5 transition-colors duration-300 cursor-default">
                    <h3 className="text-sm font-bold text-navy dark:text-white mb-1">{cap.heading}</h3>
                    <p className="text-navy/60 dark:text-white/55 text-xs leading-relaxed">{cap.body}</p>
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

      {/* Contact CTA */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal direction="left">
              <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                Contact us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Tell us what you need.
              </h2>
              <p className="text-white/60 leading-relaxed">
                Whether it&apos;s an urgent request or a longer-term project, we&apos;re ready to help.
                Get in touch and we&apos;ll respond fast.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <FullContactForm onDark />
            </Reveal>
          </div>
        </div>
      </section>

      <PreFooterCta />
    </>
  );
}
