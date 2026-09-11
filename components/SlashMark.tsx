/**
 * The diagonal through the I in WIN, lifted straight from the wordmark and used
 * as the site's single ornament.
 *
 * It replaces the spinning rhombus, which had no relationship to the logo, ran
 * on four of roughly thirteen section eyebrows so it read as accidental rather
 * than a signature, and rotated flat like a loading spinner — motion for its own
 * sake beside copy people were trying to read.
 *
 * The angle matches the logo: the bar rises 71 over a run of 50, so the slant
 * from vertical is about 35 degrees.
 */
export function SlashMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block w-[3px] h-[0.85em] shrink-0 rounded-[1px] bg-pink ${className}`}
      style={{ transform: 'skewX(-35deg)' }}
    />
  );
}
