import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import HowWeHelp from '@/components/HowWeHelp';
import ServiceCard from '@/components/ServiceCard';
import { SimpleContactForm } from '@/components/ContactForm';
import Reveal, { RevealItem } from '@/components/Reveal';
import { SectionDiamondBg } from '@/components/DiamondGraphic';
import { HOME, META } from '@/lib/constants';

export const metadata: Metadata = {
  title: META.home.title,
  description: META.home.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Value Proposition */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal stagger>
              <RevealItem>
                <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                  Our value
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 leading-tight">
                  {HOME.valueProp.headline}
                </h2>
              </RevealItem>
              {HOME.valueProp.body.split('\n\n').map((para, i) => (
                <RevealItem key={i}>
                  <p className="text-navy/60 text-lg leading-relaxed mb-4">{para}</p>
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
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-navy/20 text-navy font-semibold rounded-full hover:border-navy hover:bg-navy/5 transition-colors duration-200"
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
        <SectionDiamondBg />
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
                    Four ways we help your team thrive.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

          {/* Nudge below cards */}
          <Reveal direction="none" delay={0.4}>
            <div className="mt-10 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-white/50 text-sm">
                Not sure which service fits? We handle much more — just ask.
              </p>
              <Link
                href="/get-in-touch"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-colors duration-200 whitespace-nowrap text-sm"
              >
                Talk to us →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Inline Contact Form */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal direction="left">
              <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
                Get in touch
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Ready to get things done?
              </h2>
              <p className="text-navy/60 leading-relaxed mb-6">
                Drop us a message and we&apos;ll come back to you fast — usually the same day.
              </p>
              <div className="space-y-2 text-sm text-navy/60">
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
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <SimpleContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
