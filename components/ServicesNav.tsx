'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';

export default function ServicesNav() {
  const [activeId, setActiveId] = useState<string>(SERVICES.pillars[0].id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ids = SERVICES.pillars.map((p) => p.id);

    const handleScroll = () => {
      // Offset accounts for the main nav + ServicesNav sticky bar heights
      const offset = 150;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll the nav bar so the active link stays visible on mobile
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeLink = nav.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeLink) return;
    activeLink.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  }, [activeId]);

  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-white dark:bg-navy border-b border-navy/10 dark:border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav
          ref={navRef}
          className="flex gap-6 overflow-x-auto py-3 text-sm font-medium whitespace-nowrap scrollbar-none"
        >
          {SERVICES.pillars.map((pillar) => {
            const isActive = activeId === pillar.id;
            return (
              <Link
                key={pillar.id}
                href={`#${pillar.id}`}
                data-active={isActive}
                className={`py-1 border-b-2 transition-all duration-200 ${
                  isActive
                    ? 'text-pink border-pink'
                    : 'text-navy/50 dark:text-white/50 border-transparent hover:text-navy dark:hover:text-white hover:border-navy/30 dark:hover:border-white/30'
                }`}
              >
                {pillar.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
