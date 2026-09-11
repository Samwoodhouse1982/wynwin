'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TbcNote } from '@/components/RoiShared';
import { ROI } from '@/lib/constants';

export default function RoiFaqs() {
  const { faqs } = ROI;
  // All items start collapsed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10 dark:divide-white/10 dark:border-white/10">
      {faqs.items.map((faq, i) => {
        const isOpen = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
              >
                <span className="font-semibold text-navy dark:text-white">{faq.question}</span>
                <ChevronDown
                  size={18}
                  aria-hidden
                  className={`flex-shrink-0 text-pink transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <div className="space-y-3 pb-6 pr-8">
                {faq.answer && (
                  <p className="text-sm leading-relaxed text-navy/70 dark:text-white/70">{faq.answer}</p>
                )}
                {faq.tbc && <TbcNote>{faq.tbc}</TbcNote>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
