'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Briefcase, ChartColumn, Pill, Play, Sparkles, Stethoscope, type LucideIcon } from 'lucide-react';
import type { ThumbIcon, VideoSource } from '@/lib/training/types';
import styles from './Training.module.css';

const ICONS: Record<ThumbIcon, LucideIcon> = {
  sparkles: Sparkles,
  pill: Pill,
  stethoscope: Stethoscope,
  chart: ChartColumn,
  briefcase: Briefcase,
  play: Play,
};

// Generated thumbnail: a branded card with a topic icon and a status label, so
// every video has artwork before a real thumbnail exists. Sized by the font
// size of its container, so the same art serves the small cards and the larger
// player panel.
function ThumbArt({
  icon = 'play',
  label,
  large,
  imageSrc,
}: {
  icon?: ThumbIcon;
  label: string;
  large?: boolean;
  imageSrc?: string | null;
}) {
  const Icon = ICONS[icon];
  // If the real thumbnail can't be loaded (video removed, no network), quietly
  // fall back to the generated artwork rather than showing a broken image.
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = !!imageSrc && !imageFailed;
  return (
    <div className={`${styles.thumb} ${large ? styles.thumbLarge : ''}`}>
      {showImage && (
        <>
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 480px) 90vw, 260px"
            className={styles.thumbImage}
            onError={() => setImageFailed(true)}
          />
          <span className={styles.thumbScrim} />
        </>
      )}
      <span className={styles.thumbIcon}>
        <Icon aria-hidden />
      </span>
      <span className={styles.thumbLabel}>{label}</span>
    </div>
  );
}

// The thumbnail YouTube publishes for every video. It is 4:3 with black bars
// above and below; cropping it to the card's 16:9 shape removes them. Only
// YouTube videos get one automatically. Other hosts keep the generated artwork.
export function thumbnailFor(source: VideoSource | null): string | null {
  if (source?.type === 'youtube') {
    return `https://i.ytimg.com/vi/${encodeURIComponent(source.id)}/hqdefault.jpg`;
  }
  return null;
}

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
  icon,
}: {
  source: VideoSource | null;
  title: string;
  icon?: ThumbIcon;
}) {
  if (!source) {
    return (
      <div role="img" aria-label={`${title}: video coming soon`}>
        <ThumbArt icon={icon} label="Video coming soon" large />
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
export function VideoThumb({ source, icon }: { source: VideoSource | null; icon?: ThumbIcon }) {
  return (
    <div aria-hidden="true">
      <ThumbArt icon={icon} label={source ? 'Watch' : 'Coming soon'} imageSrc={thumbnailFor(source)} />
    </div>
  );
}
