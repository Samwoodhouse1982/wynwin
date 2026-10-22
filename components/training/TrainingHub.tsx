'use client';

import { useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Search, X } from 'lucide-react';
import type { TrainingCatalogue, TrainingVideo } from '@/lib/training/types';
import { makeLocalSearch } from '@/lib/training/search';
import {
  clearLocal,
  parseStored,
  readRaw,
  saveLocal,
  storageKey,
  subscribe,
  type StoredRegistration,
} from '@/lib/training/storage';
import OnboardingGate from './OnboardingGate';
import VideoPlayer, { VideoThumb } from './VideoPlayer';
import styles from './Training.module.css';

interface Props {
  catalogue: TrainingCatalogue;
  brand: { name: string; tagline: string; heroTitle: string; heroLead: string };
  /** CSS custom properties (--t-*) for this client's look. */
  theme: Record<string, string>;
}

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

export default function TrainingHub({ catalogue, brand, theme }: Props) {
  const key = storageKey(catalogue.clientId);

  // null on the server and during hydration, so a returning visitor never sees
  // the onboarding form flash up before their saved details are read.
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );
  // Fallback for browsers where localStorage is blocked.
  const [sessionReg, setSessionReg] = useState<StoredRegistration | null>(null);
  const registration = useMemo(() => parseStored(raw) ?? sessionReg, [raw, sessionReg]);

  const [query, setQuery] = useState('');
  const [matchIds, setMatchIds] = useState<string[] | null>(null);
  // undefined means "default to the visitor's own role".
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [focusFilter, setFocusFilter] = useState<string>('all');
  const [activeId, setActiveId] = useState<string | null>(null);

  const search = useMemo(() => makeLocalSearch(catalogue), [catalogue]);
  const searchSeq = useRef(0);
  const playerRef = useRef<HTMLDivElement>(null);

  const onQuery = (value: string) => {
    setQuery(value);
    const seq = ++searchSeq.current;
    // Ignore answers that arrive out of order, which matters once the search
    // is a network call rather than a local function.
    search(value).then((ids) => {
      if (seq === searchSeq.current) setMatchIds(ids);
    });
  };

  const handleDone = (value: StoredRegistration) => {
    setSessionReg(value);
    saveLocal(key, value);
  };

  const switchUser = () => {
    setSessionReg(null);
    setRoleFilter(undefined);
    clearLocal(key);
  };

  const roleLabel = (id: string) => catalogue.roles.find((r) => r.id === id)?.label ?? id;
  const focusLabel = (id: string) => catalogue.focuses.find((f) => f.id === id)?.label ?? id;

  const ownRole =
    registration && catalogue.roles.some((r) => r.id === registration.role)
      ? registration.role
      : 'all';
  const effectiveRole = roleFilter ?? ownRole;

  const visible = useMemo(() => {
    const filtered = catalogue.videos.filter(
      (v) =>
        (effectiveRole === 'all' || v.roles === 'all' || v.roles.includes(effectiveRole)) &&
        (focusFilter === 'all' || v.focus.includes(focusFilter)) &&
        (!matchIds || matchIds.includes(v.id)),
    );
    if (!matchIds) return filtered;
    return [...filtered].sort((a, b) => matchIds.indexOf(a.id) - matchIds.indexOf(b.id));
  }, [catalogue.videos, effectiveRole, focusFilter, matchIds]);

  // When nothing matches, say whether widening the role filter would help. A
  // practice manager searching "booking" otherwise sees a dead end, because
  // that video is for clinicians and reception.
  const matchesIgnoringRole = useMemo(
    () =>
      catalogue.videos.filter(
        (v) =>
          (focusFilter === 'all' || v.focus.includes(focusFilter)) &&
          (!matchIds || matchIds.includes(v.id)),
      ).length,
    [catalogue.videos, focusFilter, matchIds],
  );

  const active = catalogue.videos.find((v) => v.id === activeId) ?? null;
  const filtersActive = effectiveRole !== 'all' || focusFilter !== 'all' || !!matchIds;

  const clearFilters = () => {
    setRoleFilter('all');
    setFocusFilter('all');
    onQuery('');
  };

  const open = (v: TrainingVideo) => {
    setActiveId(v.id);
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const style = theme as React.CSSProperties;

  const header = (
    <header className={styles.header}>
      <div className={cx(styles.wrap, styles.headerInner)}>
        <span className={styles.wordmark}>{brand.name}</span>
        <span className={styles.headerTag}>{brand.tagline}</span>
      </div>
    </header>
  );

  if (raw === null) {
    return (
      <div className={styles.root} style={style}>
        {header}
        <div className={styles.wrap}>
          <div className={styles.skeleton} aria-hidden="true" />
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className={styles.root} style={style}>
        {header}
        <main className={styles.wrap}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Training</p>
            <h1>{brand.heroTitle}</h1>
            <p className={styles.lead}>{brand.heroLead}</p>
            <OnboardingGate clientId={catalogue.clientId} roles={catalogue.roles} onDone={handleDone} />
          </section>
        </main>
      </div>
    );
  }

  const firstName = registration.name.split(' ')[0];

  return (
    <div className={styles.root} style={style}>
      {header}
      <main className={styles.wrap}>
        <section className={styles.libraryHead}>
          <p className={styles.eyebrow}>Training library</p>
          <h1>Hi {firstName}, let&apos;s get you started</h1>
          <p className={styles.who}>
            {registration.practice} · {roleLabel(registration.role)} ·{' '}
            <button type="button" className={styles.linkButton} onClick={switchUser}>
              Not you?
            </button>
          </p>

          <div className={styles.searchRow} role="search">
            <Search size={18} aria-hidden />
            <input
              type="search"
              className={cx(styles.input, styles.searchInput)}
              placeholder="Search, for example “booking” or “reports”"
              aria-label="Search training videos"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className={styles.clearSearch}
                aria-label="Clear search"
                onClick={() => onQuery('')}
              >
                <X size={18} aria-hidden />
              </button>
            )}
          </div>

          <div className={styles.filters}>
            <div className={styles.filterRow} role="group" aria-label="Filter by role">
              <span className={styles.filterLabel}>Role</span>
              {[{ id: 'all', label: 'All roles' }, ...catalogue.roles].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={effectiveRole === r.id}
                  className={cx(styles.chip, effectiveRole === r.id && styles.chipOn)}
                  onClick={() => setRoleFilter(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className={styles.filterRow} role="group" aria-label="Filter by topic">
              <span className={styles.filterLabel}>Topic</span>
              {[{ id: 'all', label: 'All topics' }, ...catalogue.focuses].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={focusFilter === f.id}
                  className={cx(styles.chip, focusFilter === f.id && styles.chipOn)}
                  onClick={() => setFocusFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.status} aria-live="polite">
            {visible.length === 1 ? '1 video' : `${visible.length} videos`}
            {effectiveRole !== 'all' && ` for ${roleLabel(effectiveRole)}`}
            {filtersActive && (
              <>
                {' · '}
                <button type="button" className={styles.linkButton} onClick={clearFilters}>
                  Show everything
                </button>
              </>
            )}
          </p>
        </section>

        <div ref={playerRef}>
          {active && (
            <section className={styles.player} aria-label="Now playing">
              <div className={styles.playerHead}>
                <div>
                  <h2>{active.title}</h2>
                  <p className={styles.cardSummary}>{active.summary}</p>
                </div>
                <button
                  type="button"
                  className={styles.closeButton}
                  aria-label="Close video"
                  onClick={() => setActiveId(null)}
                >
                  <X size={20} aria-hidden />
                </button>
              </div>
              <VideoPlayer source={active.source} title={active.title} />
            </section>
          )}
        </div>

        {visible.length > 0 ? (
          <ul className={styles.grid}>
            {visible.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  className={cx(styles.card, v.id === activeId && styles.cardActive)}
                  onClick={() => open(v)}
                >
                  <VideoThumb source={v.source} />
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{v.title}</span>
                    <span className={styles.cardSummary}>{v.summary}</span>
                    <span className={styles.tags}>
                      {v.placeholder && <span className={cx(styles.tag, styles.tagMuted)}>Placeholder</span>}
                      {v.durationMin && <span className={styles.tag}>{v.durationMin} min</span>}
                      {v.focus.map((f) => (
                        <span key={f} className={styles.tag}>
                          {focusLabel(f)}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            {effectiveRole !== 'all' && matchesIgnoringRole > 0 ? (
              <>
                <p>
                  No videos for {roleLabel(effectiveRole)} match that, but{' '}
                  {matchesIgnoringRole === 1 ? '1 video does' : `${matchesIgnoringRole} videos do`} for
                  other roles.
                </p>
                <p>
                  <button type="button" className={styles.linkButton} onClick={() => setRoleFilter('all')}>
                    Show videos for all roles
                  </button>
                </p>
              </>
            ) : (
              <>
                <p>No videos match that yet.</p>
                <p>
                  <button type="button" className={styles.linkButton} onClick={clearFilters}>
                    Show everything
                  </button>
                </p>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
