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
  | { type: 'file'; url: string; poster?: string };

export interface TrainingVideo {
  id: string;
  title: string;
  summary: string;
  durationMin?: number;
  /** Role ids this video is for, or 'all'. Ids must exist in catalogue.roles. */
  roles: string[] | 'all';
  /** Focus ids. Ids must exist in catalogue.focuses. */
  focus: string[];
  /** Production tier id, if the catalogue uses tiers. Must exist in catalogue.tiers. */
  tier?: string;
  /** Search terms that don't appear in the title or summary. */
  keywords: string[];
  /** null until the video exists; the card shows "coming soon". */
  source: VideoSource | null;
  placeholder?: boolean;
}

export interface TrainingCatalogue {
  /** Lowercase letters, digits and hyphens. Namespaces storage and submissions. */
  clientId: string;
  roles: Option[];
  focuses: Option[];
  /** Optional. Production tiers, e.g. standard and premium. Adds a Style filter. */
  tiers?: Option[];
  /** Groups of words that mean the same thing, e.g. ['booking', 'appointment']. */
  synonyms: string[][];
  videos: TrainingVideo[];
}
