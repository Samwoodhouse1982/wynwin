// ============================================================
// Entrance animation — shared timing and conditions
// ============================================================
// Lives here rather than inside the component so that HomePageClient (which
// owns the fail-safe) and CookieBanner (which must not cover the door reveal)
// can both read it without pulling the animation itself into their bundles.

export const ENTRANCE_KEY = 'wynwin_entrance_v1';

/** Dispatched on `window` when the entrance has finished revealing the page. */
export const ENTRANCE_DONE_EVENT = 'wynwin:entrance-done';

/**
 * Every phase duration in one place, so the total is knowable. The sequence
 * used to need ~7.2s while the fail-safe fired at 6s, which tore the stage down
 * mid-pulse and meant the door-split finale never played for anyone.
 */
export const ENTRANCE_PHASES = {
  trace:      1600,
  dotsFade:    200,
  beforeBar:    80,
  pulseUp:     140,
  pulseDown:   140,
  barSettle:   160,
  afterBar:     80,
  logoOut:     500,
  barExpand:   650,
  beforeDoor:  100,
  door:        450,
} as const;

/** Full wall-clock length of the entrance, used to set the fail-safe. */
export const ENTRANCE_TOTAL_MS =
  ENTRANCE_PHASES.trace + ENTRANCE_PHASES.dotsFade + ENTRANCE_PHASES.beforeBar +
  ENTRANCE_PHASES.pulseUp + ENTRANCE_PHASES.pulseDown + ENTRANCE_PHASES.barSettle +
  ENTRANCE_PHASES.afterBar +
  Math.max(ENTRANCE_PHASES.logoOut, ENTRANCE_PHASES.barExpand) +
  ENTRANCE_PHASES.beforeDoor + ENTRANCE_PHASES.door;

/**
 * True when the first-visit entrance is about to play on this page load.
 * One predicate, so the page and the cookie banner cannot disagree about it.
 */
export function entranceWillPlay(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.location.pathname !== '/') return false;
  try {
    if (localStorage.getItem(ENTRANCE_KEY)) return false;
  } catch {
    // Storage blocked — treat as a return visit rather than replaying it.
    return false;
  }
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  // A logo trace earns little on a phone, where the audience is busiest.
  if (window.matchMedia?.('(max-width: 639px)').matches) return false;
  return true;
}
