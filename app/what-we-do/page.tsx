import type { Metadata } from 'next';
import ServicePillar from '@/components/ServicePillar';
import ServicesNav from '@/components/ServicesNav';
import PageHero from '@/components/PageHero';
import Reveal, { RevealItem } from '@/components/Reveal';
import { FullContactForm } from '@/components/ContactForm';
import { SERVICES, META } from '@/lib/constants';

export const metadata: Metadata = {
  title: META.whatWeDo.title,
  description: META.whatWeDo.description,
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
    </>
  );
}
