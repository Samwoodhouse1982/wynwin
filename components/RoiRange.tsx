import Reveal from '@/components/Reveal';
import { DataEntryMeter, Eyebrow } from '@/components/RoiShared';
import { ROI } from '@/lib/constants';

// Positions of the three card markers along the spectrum bar: each sits over
// the centre of its column in the three-column grid below.
const MARKER_POSITIONS = ['16.667%', '50%', '83.333%'];

function Attribute({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-h-[3.5rem] border-t border-navy/10 py-3 first:border-t-0 dark:border-white/10">
      <dt className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-navy/55 dark:text-white/60">
        {label}
      </dt>
      <dd className="text-sm font-medium text-navy dark:text-white">{children}</dd>
    </div>
  );
}

export default function RoiRange() {
  const { range } = ROI;

  return (
    <section id="range" className="scroll-mt-24 bg-cream py-20 dark:bg-navy-light lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <Eyebrow>The range</Eyebrow>
          <h2 className="mb-5 max-w-3xl text-3xl font-bold text-navy dark:text-white md:text-4xl">
            {range.headline}
          </h2>
          <p className="mb-12 max-w-3xl leading-relaxed text-navy/70 dark:text-white/70">{range.intro}</p>
        </Reveal>

        {/* Spectrum — horizontal from desktop, vertical below it.
            Only one of the two is in the DOM's layout at a time, so the
            end labels are never announced twice. */}
        <Reveal>
          <div className="hidden lg:block">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-navy/70 dark:text-white/70">
              <span>{range.spectrum.start}</span>
              <span>{range.spectrum.end}</span>
            </div>
            <div
              className="relative h-1.5 rounded-full bg-gradient-to-r from-pink/25 via-pink/60 to-pink"
              aria-hidden="true"
            >
              {MARKER_POSITIONS.map((left) => (
                <span
                  key={left}
                  style={{ left }}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink ring-4 ring-cream dark:ring-navy-light"
                />
              ))}
            </div>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-navy/70 dark:text-white/70 lg:hidden">
            {range.spectrum.start}
          </p>
        </Reveal>

        {/* Cards. Equal-height columns on desktop with the attribute block
            anchored to the bottom of each card, so the rows line up. */}
        <div className="relative grid grid-cols-1 items-stretch gap-6 border-l-2 border-pink/30 pl-5 lg:mt-8 lg:grid-cols-3 lg:border-l-0 lg:pl-0">
          {range.cards.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-7 dark:border-white/10 dark:bg-navy"
            >
              <h3 className="mb-3 text-lg font-bold leading-snug text-navy dark:text-white">{card.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-navy/65 dark:text-white/70">{card.body}</p>
              <dl className="mt-auto border-t border-navy/10 pt-1 dark:border-white/10">
                <Attribute label="Role">{card.role}</Attribute>
                <Attribute label="Best for">{card.bestFor}</Attribute>
                <Attribute label="Data entry">
                  <DataEntryMeter level={card.dataEntry.level} label={card.dataEntry.label} />
                </Attribute>
                <Attribute label="Result">{card.result}</Attribute>
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-navy/70 dark:text-white/70 lg:hidden">
          {range.spectrum.end}
        </p>
      </div>
    </section>
  );
}
