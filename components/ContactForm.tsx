'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

// ── Schemas ────────────────────────────────────────────────

const simpleSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Please say a little more (10+ chars)'),
  consent: z.literal(true, { error: 'You must accept to continue' }),
  _gotcha: z.string().max(0).optional(),
});

const fullSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  jobTitle: z.string().optional(),
  company: z.string().min(1, 'Required'),
  message: z.string().min(10, 'Please say a little more (10+ chars)'),
  consent: z.literal(true, { error: 'You must accept to continue' }),
  _gotcha: z.string().max(0).optional(),
});

type SimpleValues = z.infer<typeof simpleSchema>;
type FullValues = z.infer<typeof fullSchema>;

// ── Shared field styles ─────────────────────────────────────

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-light text-navy dark:text-white placeholder:text-navy/40 dark:placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink transition-all duration-200';
const labelClass = 'block text-sm font-medium text-navy dark:text-white mb-1.5';
const errorClass = 'mt-1 text-xs text-red-500';

// ── Sub-components ──────────────────────────────────────────

function Field({
  label,
  error,
  required,
  labelClassName,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  labelClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClassName ?? labelClass}>
        {label}
        {required && <span className="text-pink ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

// ── Simple Form (Home page) ─────────────────────────────────

export function SimpleContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SimpleValues>({ resolver: zodResolver(simpleSchema) });

  async function onSubmit(data: SimpleValues) {
    if (data._gotcha) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'simple' }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle className="text-mint" size={40} />
        <p className="text-lg font-semibold text-navy dark:text-white">Thanks for getting in touch!</p>
        <p className="text-navy/60 dark:text-white/60 text-sm">We&apos;ll be back with you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
      <input type="text" {...register('_gotcha')} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First name" error={errors.firstName?.message} required>
          <input {...register('firstName')} className={inputClass} placeholder="Jane" />
        </Field>
        <Field label="Last name" error={errors.lastName?.message} required>
          <input {...register('lastName')} className={inputClass} placeholder="Smith" />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message} required>
        <input {...register('email')} type="email" className={inputClass} placeholder="jane@company.com" />
      </Field>

      <Field label="Message" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us what you need…"
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded border-navy/30 text-pink accent-pink"
          />
          <span className="text-xs text-navy/60 dark:text-white/60 leading-relaxed">
            {BRAND.consentNote}{' '}
            <a href="/privacy" className="underline hover:text-pink">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p className={errorClass}>{String(errors.consent.message)}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle size={16} />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send'}
        <Send size={15} />
      </button>
    </form>
  );
}

// ── Full Form (What We Do + Get In Touch) ──────────────────

export function FullContactForm({ onDark = false }: { onDark?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FullValues>({ resolver: zodResolver(fullSchema) });

  const fieldBg = onDark
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-pink focus:ring-pink/30'
    : '';
  const resolvedInputClass = onDark ? `w-full px-4 py-3 rounded-xl border ${fieldBg} text-sm focus:outline-none focus:ring-2 transition-all duration-200` : inputClass;
  const resolvedLabelClass = onDark ? 'block text-sm font-medium text-white mb-1.5' : labelClass;
  const consentClass = onDark ? 'text-white/60' : 'text-navy/60';

  async function onSubmit(data: FullValues) {
    if (data._gotcha) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'full' }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle className="text-mint" size={40} />
        <p className={`text-lg font-semibold ${onDark ? 'text-white' : 'text-navy'}`}>
          Thanks, we&apos;ll be in touch soon.
        </p>
        <p className={`text-sm ${onDark ? 'text-white/60' : 'text-navy/60'}`}>
          Expect a reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input type="text" {...register('_gotcha')} className="hidden" tabIndex={-1} autoComplete="off" />

      <Field label="Name" error={errors.name?.message} required labelClassName={resolvedLabelClass}>
        <input
          {...register('name')}
          className={resolvedInputClass}
          placeholder="Jane Smith"
        />
      </Field>

      <Field label="Email" error={errors.email?.message} required labelClassName={resolvedLabelClass}>
        <input {...register('email')} type="email" className={resolvedInputClass} placeholder="jane@company.com" />
      </Field>

      <Field label="Job title" error={errors.jobTitle?.message} labelClassName={resolvedLabelClass}>
        <input {...register('jobTitle')} className={resolvedInputClass} placeholder="Marketing Manager" />
      </Field>

      <Field label="Company name" error={errors.company?.message} required labelClassName={resolvedLabelClass}>
        <input {...register('company')} className={resolvedInputClass} placeholder="Acme Ltd" />
      </Field>

      <Field label="What do you need?" error={errors.message?.message} required labelClassName={resolvedLabelClass}>
        <textarea
          {...register('message')}
          rows={5}
          className={`${resolvedInputClass} resize-none`}
          placeholder="Tell us about your project, timeline, or challenge…"
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded border-navy/30 accent-pink"
          />
          <span className={`text-xs ${consentClass} leading-relaxed`}>
            {BRAND.consentNote}{' '}
            <a href="/privacy" className="underline hover:text-pink">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p className={errorClass}>{String(errors.consent.message)}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle size={16} />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Submit'}
        <Send size={15} />
      </button>
    </form>
  );
}
