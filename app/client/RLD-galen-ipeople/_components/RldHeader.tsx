'use client';

import { useState } from 'react';

const NAV = ['Solutions', 'Company', 'Resources', 'Community'];

// Stand-in for the RLDatix header: utility bar, sticky bar with wordmark,
// primary links and a demo button. The real site uses mega menus; these are
// plain links because this is a layout preview, not a working site.
export default function RldHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[var(--rld-dark-teal)] text-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-end px-4 py-1.5 sm:px-6">
          <span className="rounded border border-white/60 bg-[var(--rld-teal)] px-2 py-0.5 text-xs">
            🇺🇸🇨🇦
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 px-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between py-3">
          <span className="text-[1.6rem] font-bold tracking-tight text-[var(--rld-dark-teal)]">
            RLDatix
          </span>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--rld-dark-teal)] text-white xl:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? 'top-1/2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`}
              />
            </span>
          </button>

          <div
            className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-4 bg-[var(--rld-off-white)] px-6 py-6 xl:static xl:flex xl:flex-1 xl:flex-row xl:items-center xl:justify-between xl:bg-transparent xl:p-0 xl:pl-10`}
          >
            <ul className="flex flex-col gap-4 xl:flex-row xl:gap-8">
              {NAV.map((item) => (
                <li key={item}>
                  <span className="cursor-default font-medium text-[var(--rld-dark-teal)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-6">
              <span className="cursor-default text-[var(--rld-dark-teal)] underline decoration-[var(--rld-turquoise)] underline-offset-4">
                Support
              </span>
              <span className="cursor-default text-[var(--rld-dark-teal)] underline decoration-[var(--rld-turquoise)] underline-offset-4">
                Login
              </span>
              <span className="inline-block cursor-default rounded-full bg-[var(--rld-turquoise)] px-6 py-2.5 text-center font-semibold text-[var(--rld-dark-teal)]">
                Book a Demo
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
