import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import HowWeWork from '@/components/HowWeWork';
import PreFooterCta from '@/components/PreFooterCta';
import Reveal, { RevealItem } from '@/components/Reveal';
import { ABOUT, META } from '@/lib/constants';

export const metadata: Metadata = {
  title: META.whoWeAre.title,
  description: META.whoWeAre.description,
  openGraph: {
    title: META.whoWeAre.title,
    description: META.whoWeAre.description,
    url: `${META.siteUrl}/who-we-are`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.whoWeAre.title,
    description: META.whoWeAre.description,
    images: ['/opengraph-image'],
  },
};

const highlights = [
  { stat: 'Start-ups to enterprise', label: 'We\'ve worked with businesses of every size' },
  { stat: 'Rapid response', label: 'We move fast. No committee, no delays.' },
  { stat: 'Global reach', label: 'We\'ve delivered for clients and campaigns across the world' },
  { stat: 'Regulated markets', label: 'Experienced working within highly regulated industries where precision and compliance matter' },
  { stat: 'Trusted network', label: 'Broad supplier relationships built over years' },
  { stat: 'Flexible billing', label: 'Invoicing to suit your project or budget' },
];

export default function WhoWeArePage() {
  return (
    <>
      <PageHero eyebrow="About us" headline={ABOUT.headline} />

      {/* About copy */}
      <section className="bg-white dark:bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Copy */}
            <Reveal stagger>
              {ABOUT.body.map((para, i) => (
                <RevealItem key={i}>
                  <p className="text-navy/70 dark:text-white/70 text-lg leading-relaxed mb-6">{para}</p>
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
              <RevealItem>
                <h2 className="text-2xl font-bold text-navy dark:text-white mb-6">What sets us apart</h2>
              </RevealItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((item, i) => (
                  <RevealItem key={item.stat} direction={i % 2 === 0 ? 'left' : 'right'}>
                    <div className="bg-cream dark:bg-navy-light rounded-2xl p-6 space-y-2 h-full hover:shadow-md transition-shadow duration-300">
                      <p className="text-lg font-bold text-navy dark:text-white leading-snug">{item.stat}</p>
                      <p className="text-sm text-navy/60 dark:text-white/60">{item.label}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <HowWeWork />

      <PreFooterCta />
    </>
  );
}
