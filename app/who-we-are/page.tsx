import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
          {/* Full-width copy + CTA */}
          <div className="max-w-3xl mb-16 lg:mb-20">
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
          </div>

          {/* Highlight cards — full width below copy */}
          <Reveal stagger>
            <RevealItem>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-8">What sets us apart</h2>
            </RevealItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((item, i) => (
                <RevealItem key={item.stat} direction={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}>
                  <div className="bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 hover:border-pink/40 rounded-2xl p-6 space-y-2 h-full shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-lg font-bold text-navy dark:text-white leading-snug">{item.stat}</p>
                    <p className="text-sm text-navy/65 dark:text-white/65">{item.label}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-cream dark:bg-navy-light py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal direction="up">
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              <Image
                src="/sam-woodhouse.jpg"
                alt="Sam Woodhouse, MD and Founder of WYN WIN"
                width={96}
                height={96}
                className="rounded-full object-cover w-24 h-24 shrink-0 grayscale"
              />
              <div>
                <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-3">Founder</p>
                <h2 className="text-2xl font-bold text-navy dark:text-white mb-1">Sam Woodhouse</h2>
                <p className="text-navy/60 dark:text-white/60 text-base mb-4">MD and Founder, WYN WIN</p>
                <p className="text-navy/70 dark:text-white/70 text-base leading-relaxed mb-6 max-w-xl">
                  Sam has 18 years of marketing leadership experience across healthcare, AI, and technology, with senior roles at Ada Health and Cerner (now Oracle), alongside earlier work in the NHS and local government. He founded WYN WIN to give marketing teams access to senior-level execution support, without the overhead of full-time headcount.
                </p>
                <Link
                  href="https://www.linkedin.com/in/samwoodhouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-navy/20 dark:border-white/20 text-navy dark:text-white font-semibold text-sm rounded-full hover:border-pink hover:text-pink dark:hover:border-pink dark:hover:text-pink transition-colors duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <HowWeWork />

      <PreFooterCta />
    </>
  );
}
