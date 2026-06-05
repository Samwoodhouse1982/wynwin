import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-navy min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] flex items-center py-20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          We couldn&apos;t find that page.
        </h1>
        <p className="text-white/60 leading-relaxed mb-10">
          The page you&apos;re after may have moved or never existed. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-colors duration-200"
          >
            Back to home
          </Link>
          <Link
            href="/get-in-touch"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:border-white hover:bg-white/5 transition-colors duration-200"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
