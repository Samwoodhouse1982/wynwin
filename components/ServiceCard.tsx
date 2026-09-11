'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  body: string;
  href: string;
  index?: number;
}

export default function ServiceCard({ title, body, href, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      // This one IS a link, so it keeps the lift — and now acknowledges a press,
      // which is the only feedback a touch device ever gets.
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className="group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink/50 rounded-2xl p-6 transition-all duration-300 h-full overflow-hidden"
      >
        <div className="flex flex-col h-full gap-4">
          {/* Animated top accent line */}
          <div className="relative h-0.5 bg-white/10 overflow-hidden rounded-full">
            {/* Touch gets the full accent at rest; pointers get the sweep. */}
            <div className="absolute inset-y-0 left-0 bg-pink w-full [@media(hover:hover)]:w-[20%] [@media(hover:hover)]:group-hover:w-full transition-all duration-300 ease-out" />
          </div>

          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-pink transition-colors duration-200">
            {title}
          </h3>

          <p className="text-white/50 text-sm leading-relaxed flex-1">{body}</p>

          <div className="flex items-center gap-2 text-pink text-sm font-semibold group-hover:gap-3 transition-all duration-200">
            Find Out More
            {/* whileHover here only fired with the cursor on the arrow itself,
                so it was dead code layered over the parent's group-hover. */}
            <ArrowRight
              size={14}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
