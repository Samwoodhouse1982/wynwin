'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-navy min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] flex items-center py-20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">
          Something went wrong
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          That didn&apos;t go to plan.
        </h1>
        <p className="text-white/60 leading-relaxed mb-10">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-colors duration-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:border-white hover:bg-white/5 transition-colors duration-200"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
