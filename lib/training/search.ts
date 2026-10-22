import type { TrainingCatalogue, TrainingVideo } from './types';

// Resolves to video ids, best match first, or null when the query is blank
// (meaning "don't narrow by search").
//
// This is the one seam for smarter search. The hub only ever calls a SearchFn,
// so an LLM or embedding backed version can replace makeLocalSearch without
// touching the UI: have it call a server route that returns ranked ids, and
// fall back to makeLocalSearch if that call fails.
export type SearchFn = (query: string) => Promise<string[] | null>;

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'to', 'of', 'in', 'on', 'for', 'how', 'do', 'i',
  'my', 'with', 'is', 'it', 'can', 'what', 'when', 'about', 'video', 'videos',
]);

function stem(w: string) {
  if (w.length > 4 && w.endsWith('ies')) return `${w.slice(0, -3)}y`;
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

// word -> every other word that shares a synonym group with it
function buildSynonymMap(groups: string[][]) {
  const map = new Map<string, Set<string>>();
  for (const group of groups) {
    const words = [...new Set(group.flatMap(tokens))];
    for (const w of words) {
      const set = map.get(w) ?? new Set<string>();
      for (const other of words) if (other !== w) set.add(other);
      map.set(w, set);
    }
  }
  return map;
}

// Field weights. A synonym hit counts for 60% of the same direct hit.
const W_TITLE = 3;
const W_KEYWORD = 2;
const W_SUMMARY = 1;
const SYNONYM_FACTOR = 0.6;

function scoreVideo(
  video: TrainingVideo,
  queryTokens: string[],
  synonyms: Map<string, Set<string>>,
) {
  const title = new Set(tokens(video.title));
  const keywords = new Set(video.keywords.flatMap(tokens));
  const summary = new Set(tokens(video.summary));

  const weightOf = (word: string) =>
    title.has(word) ? W_TITLE : keywords.has(word) ? W_KEYWORD : summary.has(word) ? W_SUMMARY : 0;

  let score = 0;
  let matched = 0;
  for (const q of queryTokens) {
    const direct = weightOf(q);
    let best = direct;
    if (!direct) {
      for (const alt of synonyms.get(q) ?? []) {
        best = Math.max(best, weightOf(alt) * SYNONYM_FACTOR);
      }
    }
    if (best > 0) matched += 1;
    score += best;
  }
  // Prefer videos that cover every word the person typed.
  if (matched === queryTokens.length) score += 1;
  return matched > 0 ? score : 0;
}

export function makeLocalSearch(catalogue: TrainingCatalogue): SearchFn {
  const synonyms = buildSynonymMap(catalogue.synonyms);
  return async (query) => {
    const queryTokens = tokens(query);
    if (queryTokens.length === 0) return null;
    return catalogue.videos
      .map((v, i) => ({ id: v.id, i, score: scoreVideo(v, queryTokens, synonyms) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.i - b.i)
      .map((r) => r.id);
  };
}
