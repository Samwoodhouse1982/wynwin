import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: { absolute: 'Client preview' },
};

export default function ClientPreviewPage() {
  return (
    <PageHero
      eyebrow="Client preview"
      headline="Test page"
      subline="Placeholder content. Replace this with whatever you want to show the client."
    />
  );
}
