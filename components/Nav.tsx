'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy shadow-lg shadow-navy/20' : 'bg-navy/95'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="WYN WIN"
            width={120}
            height={40}
            className="h-8 lg:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-pink'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/get-in-touch"
            className="inline-flex items-center px-5 py-2.5 bg-pink text-white text-sm font-semibold rounded-full hover:bg-pink-dark transition-colors duration-200"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden text-white p-2 -mr-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 pb-6 pt-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium py-2 border-b border-white/10 transition-colors ${
                pathname === link.href ? 'text-pink' : 'text-white/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-in-touch"
            className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-pink text-white font-semibold rounded-full"
          >
            Get In Touch
          </Link>
        </div>
      )}
    </header>
  );
}
