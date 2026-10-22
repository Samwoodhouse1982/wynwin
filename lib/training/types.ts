// Data model for a client training library. One TrainingCatalogue per client;
// the hub component and search work on this shape and know nothing about any
// particular client.

export interface Option {
  id: string;
  label: string;
}

// Where a video is hosted. Add a member here (and a case in VideoPlayer) to
// support another host.
export type VideoSource =
  | { type: 'youtube'; id: string }
  | { type: 'vimeo'; id: string; hash?: string }
  | { type: 'loom'; id: string }
  | { type: 'file'; url: string; poster?: string };

// Icons available for generated thumbnails. Add one here and in ICONS in
// components/training/VideoPlayer.tsx.
export type ThumbIcon = 'sparkles' | 'pill' | 'stethoscope' | 'chart' | 'briefcase' | 'play';

export interface TrainingVideo {
  id: string;
  title: string;
  summary: string;
  durationMin?: number;
  /** Role ids this video is for, or 'all'. Ids must exist in catalogue.roles. */
  roles: string[] | 'all';
  /**
   * Roles this is a recommended watch for, or 'all'. Shown as a badge to a
   * visitor whose role matches, and listed first for them. Narrower than
   * `roles`: that decides who sees the video, this picks the ones to start with.
   */
  recommendedFor?: string[] | 'all';
  /** Focus ids. Ids must exist in catalogue.focuses. */
  focus: string[];
  /** Production tier id, if the catalogue uses tiers. Must exist in catalogue.tiers. */
  tier?: string;
  /** Search terms that don't appear in the title or summary. */
  keywords: string[];
  /** Icon for the generated thumbnail. Defaults to a play button. */
  icon?: ThumbIcon;
  /** null until the video exists; the card shows "coming soon". */
  source: VideoSource | null;
  placeholder?: boolean;
}

export interface TrainingCatalogue {
  /** Lowercase letters, digits and hyphens. Namespaces storage and submissions. */
  clientId: string;
  roles: Option[];
  focuses: Option[];
  /** Optional. Production tiers, shown as a tag on each video's card. */
  tiers?: Option[];
  /** Groups of words that mean the same thing, e.g. ['booking', 'appointment']. */
  synonyms: string[][];
  videos: TrainingVideo[];
}
