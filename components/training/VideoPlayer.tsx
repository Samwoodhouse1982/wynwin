import { Play } from 'lucide-react';
import type { VideoSource } from '@/lib/training/types';
import styles from './Training.module.css';

// Privacy-friendly embeds: YouTube's no-cookie domain, and Vimeo's do-not-track
// flag. These are shown to NHS staff on shared computers, so no tracking
// cookies are set until they press play.
function embedUrl(source: Exclude<VideoSource, { type: 'file' }>): string {
  if (source.type === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(source.id)}?rel=0`;
  }
  if (source.type === 'loom') {
    return `https://www.loom.com/embed/${encodeURIComponent(source.id)}`;
  }
  const hash = source.hash ? `&h=${encodeURIComponent(source.hash)}` : '';
  return `https://player.vimeo.com/video/${encodeURIComponent(source.id)}?dnt=1${hash}`;
}

export default function VideoPlayer({
  source,
  title,
}: {
  source: VideoSource | null;
  title: string;
}) {
  if (!source) {
    return (
      <div className={styles.videoPlaceholder} role="img" aria-label={`${title}: video coming soon`}>
        <Play aria-hidden />
        <span>Video coming soon</span>
      </div>
    );
  }

  if (source.type === 'file') {
    return (
      <video
        className={styles.video}
        controls
        preload="metadata"
        playsInline
        poster={source.poster}
        aria-label={title}
      >
        <source src={source.url} />
      </video>
    );
  }

  return (
    <iframe
      className={styles.video}
      src={embedUrl(source)}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

// Card thumbnail. Decorative: the card's button already carries the title.
export function VideoThumb({ source }: { source: VideoSource | null }) {
  return (
    <div className={styles.videoPlaceholder} aria-hidden="true">
      <Play />
      <span>{source ? 'Watch' : 'Coming soon'}</span>
    </div>
  );
}
