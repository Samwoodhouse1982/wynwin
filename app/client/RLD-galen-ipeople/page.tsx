import type { Metadata } from 'next';
import RldHeader from './_components/RldHeader';
import DowntimeExplorer from './_components/DowntimeExplorer';
import WhatIf from './_components/WhatIf';
import styles from './_components/Downtime.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Client preview' },
};

// Layout preview styled after the RLDatix North America article pages, holding
// the iPeople downtime-cost explorer. The palette values come from the colour
// presets in the RLDatix page's own CSS. Their font files and logo were not part
// of that HTML, so the body face is this site's Instrument Sans and the logo is
// a plain text wordmark. The read time is an estimate, not a measured figure.
const CONTENT = {
  category: 'Insights',
  readTime: '5 min read',
  tags: ['Downtime continuity', 'MEDITECH'],
  footerColumns: [
    { title: 'Platform', links: ['Overview', 'See All Modules'] },
    { title: 'Company', links: ['About Us', 'Leadership Team', 'News', 'Press Releases', 'Careers'] },
    { title: 'Resources', links: ['All Resources', 'Blog', 'Webinars', 'Videos'] },
    { title: 'Community', links: ['HUB Community', 'RLD Academy', 'Support'] },
    { title: 'Let’s Talk', links: ['Book a Demo', 'Contact Us'] },
  ],
};

const palette = {
  '--rld-dark-teal': '#002D2D',
  '--rld-teal': '#0F4146',
  '--rld-turquoise': '#00F0C8',
  '--rld-purple-50': '#CDCBF3',
  '--rld-orange-50': '#FFD0B4',
  '--rld-blue-50': '#B9E9F0',
  '--rld-off-white': '#EEF7F1',
} as React.CSSProperties;

// Inline because globals.css sets h1 and h2 to the Wynwin display face outside
// any Tailwind layer, which beats a font-* utility class.
const headingFont = { fontFamily: 'var(--font-instrument), system-ui, sans-serif' };


export default function ClientPreviewPage() {
  return (
    <div
      style={palette}
      className="bg-white font-body text-[var(--rld-teal)] antialiased"
    >
      <RldHeader />

      <main>
        {/* Hero */}
        <section className="overflow-hidden bg-[var(--rld-off-white)] pb-14 pt-12 lg:pt-20">
          <div className="mx-auto grid max-w-[1140px] items-end gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="flex h-full flex-col">
              <p className="mb-10 text-sm lg:mb-20">
                ⌂ RLDatix – North America › Resources › {CONTENT.category}
              </p>
              <h1 style={headingFont} className="text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--rld-dark-teal)] sm:text-5xl">
                The <em className="not-italic text-[#c2512b]">$30M</em> daily aftershock
              </h1>
            </div>
            <div
              className="flex aspect-[3/2] flex-col justify-end rounded-3xl p-8"
              style={{
                background:
                  'linear-gradient(135deg, var(--rld-purple-50), var(--rld-blue-50) 55%, var(--rld-turquoise))',
              }}
            >
              <p
                style={headingFont}
                className="text-6xl font-semibold tracking-tight text-[var(--rld-dark-teal)] sm:text-7xl"
              >
                $30.4M
              </p>
              <p className="mt-2 max-w-[22em] text-base text-[var(--rld-dark-teal)]">
                Modeled impact of a 24-hour EHR outage at a large US health system
              </p>
            </div>
          </div>
        </section>

        {/* Meta bar */}
        <section className="sticky top-[60px] z-30 bg-[var(--rld-dark-teal)] py-3 text-sm text-white">
          <div className="mx-auto flex max-w-[1140px] items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <span className="rounded bg-[var(--rld-purple-50)] px-2 py-1 text-xs font-medium text-[var(--rld-teal)]">
                {CONTENT.category}
              </span>
              <span>{CONTENT.readTime}</span>
            </div>
            <div className="hidden items-center gap-4 sm:flex">
              <span>Share this Insight:</span>
              <span className="text-[var(--rld-purple-50)]">in &nbsp; X &nbsp; f</span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="pb-16 pt-14 lg:pt-24">
          <div className={`${styles.root} mx-auto max-w-[860px] px-4 sm:px-6`}>
            <p
              style={{ ...headingFont, marginBottom: 32 }}
              className="text-xl text-[#56676a] sm:text-[22px]"
            >
              An illustrative example of the financial impact of EHR downtime at a large US health
              system
            </p>
            <div className={styles.story}>
              <p>
                In July 2024, over 750 US hospitals reported network disruption resulting from a
                faulty CrowdStrike update that crashed Windows systems.
                <sup>
                  <a href="#src1">1</a>
                </sup>
              </p>
              <p>
                At one large academic health system serving 2 million patients, tens of thousands
                of computers went down overnight. Elective procedures and outpatient visits were
                postponed, clinicians switched to paper, lab results moved by phone and hand, and
                every paper record had to be entered back into the EHR once it returned almost a
                day later.
              </p>
              <p>
                Outages like this affect care quality and the experience of patients and staff, and
                carry significant costs. We modeled what an outage of this kind could cost a health
                system of similar size.
              </p>
            </div>

            <DowntimeExplorer />

            <section className={styles.help} aria-labelledby="help-h">
              <h2 id="help-h">How can we help?</h2>
              <p className={styles.intro}>
                IPeople supports continuity and minimizes the impact of both planned downtime and
                unexpected outages for MEDITECH users.
              </p>
              <div className={styles.caps}>
                <div className={styles.cap}>
                  <h3>Offline Views</h3>
                  <p>
                    Gives clinicians access to critical patient data and reports while the EHR is
                    unavailable, reducing productivity losses.
                  </p>
                  <div className={styles.ties}>Addresses: staff productivity</div>
                </div>
                <div className={styles.cap}>
                  <h3>Network Down</h3>
                  <p>
                    Copies those views to designated standalone PCs so access continues during a
                    network failure.
                  </p>
                  <div className={styles.ties}>Addresses: staff productivity</div>
                </div>
                <div className={styles.cap}>
                  <h3>Downtime Registration</h3>
                  <p>
                    Records admissions, transfers and discharges digitally and syncs them to the
                    EHR after restoration, which reduces chart backfill effort.
                  </p>
                  <div className={styles.ties}>Addresses: chart backfill</div>
                </div>
              </div>
              <p className={styles.capnote}>
                Capabilities depend on configuration, available data and working devices, and do
                not prevent device failures.
              </p>
            </section>

            <WhatIf />

            <section className={styles.cta} aria-labelledby="cta-h">
              <h2 id="cta-h">Model your own exposure</h2>
              <p>
                We&apos;ll build a downtime financial exposure assessment using your volumes, payer
                mix and staffing.
              </p>
              <div className={styles.contact}>
                <span>sales@ipeople.com</span>
                <span>214-222-1125</span>
                <a href="https://www.ipeople.com" target="_blank" rel="noopener noreferrer">
                  ipeople.com
                </a>
              </div>
            </section>

            <details className={styles.details}>
              <summary>How we modeled this</summary>
              <div className={styles.method}>
                <p>
                  Figures are illustrative, based on assumptions for a large US academic health
                  system with around $21 billion in annual patient care revenue, not the reported
                  results of any named organization.
                </p>
                <p>
                  We modeled three scenarios in detail: 12, 24 and 48 hours, with patient care
                  throughput falling by 15%, 25% and 35% respectively. The share of delayed care
                  that is permanently lost matches that throughput loss, so 85% of deferred revenue
                  is recaptured after a 12-hour outage, falling to 75% at 24 hours and 65% at 48
                  hours. Lost and recaptured revenue together make up the full value of delayed
                  care, and each is counted only once.
                </p>
                <p>
                  The slider projects from those three scenarios. Throughput loss rises by 10
                  percentage points each time an outage doubles in length, and scales down in
                  proportion below 12 hours. Revenue and staff costs per hour of lost throughput are
                  interpolated between the scenarios and held at the 48-hour rate beyond it. Device
                  recovery and chart backfill grow at the rate seen between the modeled points.
                  Results below 12 hours and above 48 hours are projections and carry more
                  uncertainty than the three modeled scenarios.
                </p>
                <p>
                  The total is a gross figure that combines revenue and staff time. Lost
                  productivity and lost throughput can overlap, so the total is not a net cash
                  loss, an audited accounting figure or an estimate of savings from IPeople. Health
                  systems should test these assumptions against their own data before making
                  investment decisions.
                </p>
                <p>
                  The &quot;What if this had happened at your system&quot; section rescales every
                  figure in proportion to annual patient care revenue, relative to the $21 billion
                  system above. That is a simplification: device recovery and chart backfill follow
                  device count and paper volume more than revenue, so treat the scaled figures as a
                  rough guide.
                </p>
                <p>
                  The model does not include patient safety events, liability, regulatory
                  penalties, reputational damage or longer-term remediation, which can also add
                  significant costs.
                </p>
              </div>
            </details>

            <div className={styles.sources}>
              <p id="src1">
                1. Network disruption at US hospitals:{' '}
                <a
                  href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2836824"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  JAMA Network Open, 2025
                </a>
                .
              </p>
            </div>

            <div className="mt-14 flex flex-wrap gap-2 text-sm">
              {CONTENT.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[var(--rld-off-white)] px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--rld-dark-teal)] pb-8 text-white">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="py-8 text-[1.6rem] font-bold tracking-tight">RLDatix</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-14 lg:grid-cols-5">
            {CONTENT.footerColumns.map((col) => (
              <div key={col.title} className="border-t border-white/20 pt-5">
                <h4 className="mb-3 opacity-50">{col.title}</h4>
                <ul className="space-y-2 text-[0.95rem]">
                  {col.links.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-white/20 pt-6 text-sm md:flex-row md:justify-between">
            <span>© 2026 RLDatix. All rights reserved.</span>
            <span>Company Policies &nbsp; Terms &nbsp; Web Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
