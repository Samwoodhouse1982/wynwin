import type { Metadata } from 'next';
import { Phone, Mail } from 'lucide-react';
import RoiHero from '@/components/RoiHero';
import RoiRange from '@/components/RoiRange';
import RoiProcess from '@/components/RoiProcess';
import RoiFaqs from '@/components/RoiFaqs';
import Reveal, { RevealItem } from '@/components/Reveal';
import { FullContactForm } from '@/components/ContactForm';
import { Eyebrow, FormatTag, MarketTag, TbcNote } from '@/components/RoiShared';
import { BRAND, META, ROI, ROI_PAGE_PUBLISHED } from '@/lib/constants';

const PAGE_URL = `${META.siteUrl}/roi-calculators`;

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's '%s | WYN WIN' title template, which
  // would otherwise append a second ' | WYN WIN' to a title that already ends
  // in the brand. (The other inner pages currently do double it up.)
  title: { absolute: META.roiCalculators.title },
  description: META.roiCalculators.description,
  // While the page is hidden it carries `noindex, nofollow`, so it stays out of
  // search even though it is live and shareable by direct link. Publishing it
  // (ROI_PAGE_PUBLISHED in lib/constants.ts) swaps in `index, follow` plus a
  // self-referencing canonical — this page is built for cold traffic from
  // LinkedIn, outreach and events, so it will be linked with campaign
  // parameters, and the canonical keeps those variants consolidated. The
  // canonical is withheld while noindex is set, to avoid sending search engines
  // two conflicting signals about the same URL.
  robots: ROI_PAGE_PUBLISHED
    ? { index: true, follow: true }
    : { index: false, follow: false },
  ...(ROI_PAGE_PUBLISHED ? { alternates: { canonical: '/roi-calculators' } } : {}),
  openGraph: {
    title: META.roiCalculators.title,
    description: META.roiCalculators.description,
    url: PAGE_URL,
    images: [{ url: '/roi-calculators/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.roiCalculators.title,
    description: META.roiCalculators.description,
    images: ['/roi-calculators/opengraph-image'],
  },
};

// Service structured data. FAQPage schema is deliberately omitted: Google
// restricts FAQ rich results to authoritative government and health sites,
// so it would not surface for this page, and the site uses no FAQ schema.
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'ROI calculator design and build for healthtech',
  description: META.roiCalculators.description,
  serviceType: ROI.schema.serviceType,
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    name: BRAND.legal.company,
    url: META.siteUrl,
  },
  areaServed: ROI.schema.areaServed.map((name) => ({ '@type': 'Country', name })),
};

export default function RoiCalculatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <RoiHero />

      {/* ── 2. The problem ──────────────────────────────────── */}
      <section className="bg-white py-20 dark:bg-navy lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal stagger>
            <RevealItem>
              <Eyebrow>The problem</Eyebrow>
            </RevealItem>
            <RevealItem>
              <h2 className="mb-6 max-w-3xl text-3xl font-bold text-navy dark:text-white md:text-4xl">
                {ROI.problem.headline}
              </h2>
            </RevealItem>
            {ROI.problem.body.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 32)}>
                <p className="mb-4 max-w-3xl leading-relaxed text-navy/70 dark:text-white/70 last:mb-0">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 3. The range ────────────────────────────────────── */}
      <RoiRange />

      {/* ── 4. Built to scale ───────────────────────────────── */}
      <section className="bg-white py-20 dark:bg-navy lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Eyebrow>Scale</Eyebrow>
            <h2 className="mb-5 text-3xl font-bold text-navy dark:text-white md:text-4xl">
              {ROI.scale.headline}
            </h2>
            <p className="mb-12 max-w-3xl leading-relaxed text-navy/70 dark:text-white/70">
              {ROI.scale.intro}
            </p>
          </Reveal>

          {/* Two wider template items on the first row, three on the second. */}
          <Reveal stagger className="grid grid-cols-1 gap-6 lg:grid-cols-6">
            {ROI.scale.items.map((scaleItem) => (
              <RevealItem
                key={scaleItem.title}
                className={scaleItem.wide ? 'lg:col-span-3' : 'lg:col-span-2'}
              >
                <div className="h-full rounded-2xl border border-navy/10 bg-cream p-7 dark:border-white/10 dark:bg-navy-light">
                  <h3 className="mb-3 text-lg font-bold leading-snug text-navy dark:text-white">
                    {scaleItem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-navy/65 dark:text-white/70">
                    {scaleItem.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 5. Examples ─────────────────────────────────────── */}
      {/* No figures, outputs or screenshots of results appear here. */}
      <section id="examples" className="scroll-mt-24 bg-cream py-20 dark:bg-navy-light lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Eyebrow>Examples</Eyebrow>
            <h2 className="mb-5 text-3xl font-bold text-navy dark:text-white md:text-4xl">
              {ROI.examples.headline}
            </h2>
            <p className="mb-6 max-w-3xl leading-relaxed text-navy/70 dark:text-white/70">
              {ROI.examples.intro}
            </p>
            <div className="mb-12 max-w-3xl space-y-3">
              <TbcNote>{ROI.examples.tbc}</TbcNote>
              <TbcNote>{ROI.examples.formatsTbc}</TbcNote>
            </div>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ROI.examples.cards.map((card) => (
              <RevealItem key={card.client}>
                <article className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-7 dark:border-white/10 dark:bg-navy">
                  <h3 className="text-lg font-bold leading-snug text-navy dark:text-white">
                    {card.client}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-navy/55 dark:text-white/60">
                    {card.focus}
                  </p>

                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-navy/55 dark:text-white/60">
                    Value drivers
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {card.drivers.map((driver) => (
                      <li
                        key={driver}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-navy/70 dark:text-white/75"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink"
                          aria-hidden="true"
                        />
                        {driver}
                      </li>
                    ))}
                  </ul>

                  {card.formats.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-navy/55 dark:text-white/60">
                        Formats
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {card.formats.map((format) => (
                          <FormatTag key={format}>{format}</FormatTag>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.markets.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-navy/55 dark:text-white/60">
                        Markets
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {card.markets.map((market) => (
                          <MarketTag key={market}>{market}</MarketTag>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.detail && (
                    <p className="mt-5 text-sm leading-relaxed text-navy/65 dark:text-white/70">
                      {card.detail}
                    </p>
                  )}

                  {card.note && (
                    <div className="mt-5 rounded-xl border-l-2 border-pink bg-navy/[0.04] px-4 py-3 dark:bg-white/5">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-navy/55 dark:text-white/60">
                        Method note
                      </p>
                      <p className="text-sm leading-relaxed text-navy/75 dark:text-white/75">
                        {card.note}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto space-y-3 pt-5">
                    {card.noteTbc && <TbcNote>{card.noteTbc}</TbcNote>}
                    {card.detailTbc && <TbcNote>{card.detailTbc}</TbcNote>}
                  </div>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 6. How we build it ──────────────────────────────── */}
      <RoiProcess />

      {/* ── 7. AI and people ────────────────────────────────── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>AI and people</Eyebrow>
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                {ROI.aiAndPeople.headline}
              </h2>
              <p className="leading-relaxed text-white/70">{ROI.aiAndPeople.body}</p>
              <TbcNote onDark className="mt-6">
                {ROI.aiAndPeople.tbc}
              </TbcNote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. What you get ─────────────────────────────────── */}
      <section className="bg-white py-20 dark:bg-navy lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Eyebrow>Deliverables</Eyebrow>
            <h2 className="mb-12 text-3xl font-bold text-navy dark:text-white md:text-4xl">
              {ROI.whatYouGet.headline}
            </h2>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ROI.whatYouGet.items.map((deliverable) => (
              <RevealItem key={deliverable.title}>
                <div className="border-l-2 border-pink/40 pl-5">
                  <h3 className="mb-2 font-bold leading-snug text-navy dark:text-white">
                    {deliverable.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-navy/65 dark:text-white/70">
                    {deliverable.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 9. Who we work with ─────────────────────────────── */}
      <section className="bg-cream py-20 dark:bg-navy-light lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Audience</Eyebrow>
              <h2 className="mb-6 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                {ROI.whoWeWorkWith.headline}
              </h2>
              <p className="leading-relaxed text-navy/70 dark:text-white/70">
                {ROI.whoWeWorkWith.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 10. Why WYN WIN ─────────────────────────────────── */}
      <section className="bg-white py-20 dark:bg-navy lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Eyebrow>Why us</Eyebrow>
            <h2 className="mb-12 text-3xl font-bold text-navy dark:text-white md:text-4xl">
              {ROI.whyWynWin.headline}
            </h2>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {ROI.whyWynWin.columns.map((column) => (
              <RevealItem key={column.title}>
                <div className="h-full">
                  <div className="mb-5 h-0.5 w-full bg-pink" />
                  <h3 className="mb-3 text-lg font-bold leading-snug text-navy dark:text-white">
                    {column.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-navy/65 dark:text-white/70">
                    {column.body}
                  </p>
                  {column.tbc && <TbcNote className="mt-4">{column.tbc}</TbcNote>}
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal>
            <TbcNote className="mt-12 max-w-3xl">{ROI.whyWynWin.testimonialTbc}</TbcNote>
          </Reveal>
        </div>
      </section>

      {/* ── 11. FAQs ────────────────────────────────────────── */}
      <section className="bg-cream py-20 dark:bg-navy-light lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mb-10 text-3xl font-bold text-navy dark:text-white md:text-4xl">
              {ROI.faqs.headline}
            </h2>
            <div className="max-w-3xl">
              <RoiFaqs />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 12. Final CTA and form ──────────────────────────── */}
      <section id="contact" className="scroll-mt-24 bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <Reveal direction="left">
              <Eyebrow>Get started</Eyebrow>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {ROI.finalCta.headline}
              </h2>
              <p className="leading-relaxed text-white/70">{ROI.finalCta.body}</p>

              <div className="mt-10 space-y-4">
                <a
                  href={BRAND.phoneHref}
                  className="group flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink/20 transition-colors duration-200 group-hover:bg-pink/40">
                    <Phone size={16} className="text-pink" aria-hidden />
                  </span>
                  <span>
                    <span className="mb-0.5 block text-xs uppercase tracking-wider text-white/60">
                      Phone
                    </span>
                    <span className="block font-medium text-white transition-colors duration-200 group-hover:text-pink">
                      {BRAND.phone}
                    </span>
                  </span>
                </a>
                <a
                  href={BRAND.emailHref}
                  className="group flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink/20 transition-colors duration-200 group-hover:bg-pink/40">
                    <Mail size={16} className="text-pink" aria-hidden />
                  </span>
                  <span>
                    <span className="mb-0.5 block text-xs uppercase tracking-wider text-white/60">
                      Email
                    </span>
                    <span className="block font-medium text-white transition-colors duration-200 group-hover:text-pink">
                      {BRAND.email}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:p-10">
                <FullContactForm
                  onDark
                  source={ROI.finalCta.source}
                  messagePlaceholder={ROI.finalCta.messagePlaceholder}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
