import type { Metadata } from 'next';
import Link from 'next/link';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import PageHero from '@/components/PageHero';
import Reveal, { RevealItem } from '@/components/Reveal';
import { ABOUT, META } from '@/lib/constants';

export const metadata: Metadata = {
  title: META.whoWeAre.title,
  description: META.whoWeAre.description,
};

const highlights = [
  { stat: 'Start-ups to enterprise', label: 'We\'ve worked with businesses of every size' },
  { stat: 'Rapid response', label: 'We move fast — no committee, no delays' },
  { stat: 'Trusted network', label: 'Broad supplier relationships built over years' },
  { stat: 'Flexible billing', label: 'Invoicing to suit your project or budget' },
];

export default function WhoWeArePage() {
  return (
    <>
      <PageHero eyebrow="About us" headline={ABOUT.headline} />

      {/* About copy */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Copy */}
            <Reveal stagger>
              {ABOUT.body.map((para, i) => (
                <RevealItem key={i}>
                  <p className="text-navy/70 text-lg leading-relaxed mb-6">{para}</p>
                </RevealItem>
              ))}
              <RevealItem>
                <div className="pt-2">
                  <Link
                    href="/get-in-touch"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-colors duration-200"
                  >
                    Work with us
                  </Link>
                </div>
              </RevealItem>
            </Reveal>

            {/* Highlight cards */}
            <Reveal stagger>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((item, i) => (
                  <RevealItem key={item.stat} direction={i % 2 === 0 ? 'left' : 'right'}>
                    <div className="bg-cream rounded-2xl p-6 space-y-2 h-full hover:shadow-md transition-shadow duration-300">
                      <p className="text-lg font-bold text-navy leading-snug">{item.stat}</p>
                      <p className="text-sm text-navy/60">{item.label}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyWorkWithUs background="cream" />

      {/* CTA Banner */}
      <section className="bg-pink py-16 lg:py-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <Reveal direction="left">
            <h2 className="text-3xl font-bold text-white mb-2">Ready to get started?</h2>
            <p className="text-white/80">Let&apos;s talk about what you need.</p>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <Link
              href="/get-in-touch"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink font-bold rounded-full hover:bg-cream transition-colors duration-200 whitespace-nowrap"
            >
              Get In Touch →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
