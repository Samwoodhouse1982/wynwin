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
      <ServicesOverview />

      {/* Regulated markets spotlight */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal stagger>
              <RevealItem>
                <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                  {REGULATED_MARKETS.eyebrow}
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {REGULATED_MARKETS.headline}
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="text-white/70 text-lg leading-relaxed mb-4">
                  {REGULATED_MARKETS.intro}
                </p>
              </RevealItem>
              <RevealItem>
                <p className="text-white/70 leading-relaxed">
                  {REGULATED_MARKETS.body}
                </p>
              </RevealItem>
            </Reveal>

            <Reveal stagger>
              {REGULATED_MARKETS.capabilities.map((cap) => (
                <RevealItem key={cap.heading} direction="right">
                  <div className="border-l-2 border-pink/40 hover:border-pink pl-5 mb-6 transition-colors duration-300 cursor-default">
                    <h3 className="text-base font-bold text-white mb-1.5">{cap.heading}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{cap.body}</p>
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
