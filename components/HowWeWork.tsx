'use client';

import { motion, type Variants } from 'framer-motion';
import { DiamondAccent } from '@/components/DiamondGraphic';

const steps = [
  {
    number: '01',
    heading: 'Tell us what you need',
    body: 'A quick call or message is all it takes. No lengthy briefs, no procurement process. Tell us the task and we\'ll tell you what we can do.',
  },
  {
    number: '02',
    heading: 'We get on with it',
    body: 'We take full ownership from the moment you brief us. We ask the right questions upfront so we don\'t need to chase you for answers later.',
  },
  {
    number: '03',
    heading: 'You get the result',
    body: 'Delivered on time, exactly as you need it. If anything changes along the way, we adapt. That\'s what we\'re here for.',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HowWeWork() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-14"
        >
          <p className="text-pink font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
            <DiamondAccent />
            How we work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-lg">
            Simple by design.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={item} className="group">
              <div className="relative h-0.5 bg-white/10 mb-6 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-pink"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.2 + 0.3 }}
                />
              </div>
              <span className="block text-6xl font-bold text-white/10 group-hover:text-pink transition-colors duration-500 mb-4 leading-none">
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-white mb-3">{step.heading}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
