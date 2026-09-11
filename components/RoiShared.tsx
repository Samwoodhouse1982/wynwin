// ── Shared pieces for the /roi-calculators page ──────────────
// Plain (non-client) components so they can render inside server
// sections as well as client ones.

/**
 * Visible placeholder for anything still to be confirmed. Every one of
 * these must be resolved — filled in or deleted from lib/constants.ts —
 * before the page is published. They carry a `data-tbc` attribute, so
 * `document.querySelectorAll('[data-tbc]')` lists what is outstanding.
 */
export function TbcNote({
  children,
  onDark = false,
  className = '',
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      data-tbc
      className={`flex items-start gap-2.5 rounded-xl border border-dashed border-pink/60 px-4 py-3 text-sm leading-relaxed ${
        onDark ? 'bg-white/5 text-white/80' : 'bg-pink/5 text-navy dark:text-white/80'
      } ${className}`}
    >
      <span className="mt-0.5 flex-shrink-0 rounded-full bg-pink px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
        TBC
      </span>
      <span>{children}</span>
    </p>
  );
}

/**
 * Format tag — filled pill, using the Section 3 names.
 */
export function FormatTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-pink/12 px-2.5 py-1 text-xs font-semibold text-navy ring-1 ring-inset ring-pink/45 dark:text-white dark:ring-pink/60">
      {children}
    </span>
  );
}

/**
 * Market tag — deliberately a different shape and weight from FormatTag
 * so the two tag types are never mistaken for one another.
 */
export function MarketTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-navy/30 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-navy dark:border-white/35 dark:text-white/85">
      {children}
    </span>
  );
}

/**
 * Data-entry level. The segments are decorative; the text label beside
 * them carries the meaning, so the indicator never relies on colour.
 */
export function DataEntryMeter({ level, label }: { level: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`h-1.5 w-5 rounded-full ${step <= level ? 'bg-pink' : 'bg-navy/20 dark:bg-white/25'}`}
          />
        ))}
      </span>
      <span className="text-sm font-medium text-navy dark:text-white">{label}</span>
    </span>
  );
}

/**
 * Section eyebrow, matching the treatment used across the site.
 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-pink">{children}</p>
  );
}
