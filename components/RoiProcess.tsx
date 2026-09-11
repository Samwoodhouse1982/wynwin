import Reveal from '@/components/Reveal';
import { Eyebrow, TbcNote } from '@/components/RoiShared';
import { ROI } from '@/lib/constants';

/**
 * Gateway marker — an optional health economist review sitting between two
 * steps. Deliberately full width, with a diamond marker and its own text
 * label, so it never reads as a step or as a sector expert label.
 */
function GatewayMarker({ label }: { label: string }) {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-navy/30 bg-navy/[0.03] px-4 py-3 dark:border-white/30 dark:bg-white/5">
      <span
        className="h-2.5 w-2.5 flex-shrink-0 rotate-45 border-2 border-pink bg-pink/20"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-navy dark:text-white">{label}</span>
    </div>
  );
}

/**
 * Sector expert label — a small inline chip on the step itself. Filled and
 * pill-shaped, so it is easy to tell apart from the gateway markers above.
 */
function ExpertLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-pink/12 px-3 py-1 text-xs font-semibold text-navy ring-1 ring-inset ring-pink/45 dark:text-white dark:ring-pink/60">
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink" aria-hidden="true" />
      {label}
    </span>
  );
}

export default function RoiProcess() {
  const { process } = ROI;

  return (
    <section className="bg-white py-20 dark:bg-navy lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <Eyebrow>Our process</Eyebrow>
          <h2 className="mb-5 text-3xl font-bold text-navy dark:text-white md:text-4xl">
            {process.headline}
          </h2>
          <p className="max-w-3xl leading-relaxed text-navy/70 dark:text-white/70">{process.intro}</p>
          <TbcNote className="mt-5 max-w-3xl">{process.introTbc}</TbcNote>
        </Reveal>

        <ol className="mt-14 max-w-3xl">
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative pb-10 pl-14 last:pb-0">
              {/* Timeline rail — stops at the last step */}
              {i < process.steps.length - 1 && (
                <span
                  className="absolute left-[1.1875rem] top-11 bottom-0 w-0.5 bg-navy/10 dark:bg-white/15"
                  aria-hidden="true"
                />
              )}

              <span
                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-pink text-sm font-bold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>

              <div className="flex flex-wrap items-center gap-3 pt-1.5">
                <h3 className="text-lg font-bold text-navy dark:text-white">
                  {i + 1}. {step.title}
                </h3>
                {step.expertInput && <ExpertLabel label={process.expertLabel} />}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-navy/65 dark:text-white/70">{step.body}</p>

              {step.gateway && <GatewayMarker label={step.gateway} />}
            </li>
          ))}
        </ol>

        <TbcNote className="mt-10 max-w-3xl">{process.durationTbc}</TbcNote>
      </div>
    </section>
  );
}
