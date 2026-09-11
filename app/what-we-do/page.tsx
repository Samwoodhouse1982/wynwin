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

      {/* Regulated markets. This is the one capability a generic marketing
          freelancer cannot claim, so it gets full section scale, an anchor, a
          sub-nav entry and an ask of its own — it used to be the smallest type
          on the page with nothing linking to it and nothing to do at the end. */}
      <section
        id="regulated"
        className="bg-white dark:bg-navy border-y border-navy/10 dark:border-white/10 py-20 lg:py-28 scroll-mt-36"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal stagger>
            <RevealItem>
              <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
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
      <section id="contact" className="bg-navy py-20 lg:py-28 scroll-mt-36 border-t border-white/10">
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
