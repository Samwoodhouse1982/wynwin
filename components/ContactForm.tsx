'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

// ── Web3Forms submission ───────────────────────────────────
// Submissions go straight from the browser to Web3Forms (no backend). The
// access key is public by design — it can only submit to the form it belongs
// to, whose recipient inbox is configured in the Web3Forms dashboard.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '732edaa2-f324-4831-a8dd-0e6dc46a92d8';

async function sendToWeb3Forms(fields: Record<string, string>) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...fields }),
  });
  const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (!res.ok || !result?.success) throw new Error('Web3Forms submission failed');
}

// ── Schemas ────────────────────────────────────────────────

// Validation messages are written in the same voice as the rest of the site —
// 'Required' and '10+ chars' were the only developer-speak on it.
const simpleSchema = z.object({
  firstName: z.string().min(1, 'We\'ll need your first name'),
  lastName: z.string().min(1, 'And your last name'),
  email: z.string().email('That email doesn\'t look right'),
  message: z.string().min(10, 'Give us a line or two more so we can help'),
  consent: z.literal(true, { error: 'You must accept to continue' }),
  _gotcha: z.string().max(0).optional(),
});

const fullSchema = z.object({
  name: z.string().min(1, 'We\'ll need your name'),
  email: z.string().email('That email doesn\'t look right'),
  jobTitle: z.string().optional(),
  company: z.string().min(1, 'Which company are you with?'),
  message: z.string().min(10, 'Give us a line or two more so we can help'),
  consent: z.literal(true, { error: 'You must accept to continue' }),
  _gotcha: z.string().max(0).optional(),
});

type SimpleValues = z.infer<typeof simpleSchema>;
type FullValues = z.infer<typeof fullSchema>;

// ── Shared field styles ─────────────────────────────────────

// text-base on phones (16px) — anything smaller makes iOS Safari zoom the
// viewport on focus and leave the page zoomed. Unchanged from sm upwards.
const inputClass =
  'w-full px-4 py-3 rounded-xl border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-light text-navy dark:text-white placeholder:text-navy/40 dark:placeholder:text-white/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink transition-all duration-200';
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
      const name = `${data.firstName} ${data.lastName}`.trim();
      await sendToWeb3Forms({
        subject: `New enquiry from ${name}`,
        from_name: name || 'WYNWIN website',
        name,
        email: data.email,
        message: data.message,
        consent: data.consent ? 'Yes — accepted the Privacy Policy' : 'Not given',
      });
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle className="text-mint" size={40} aria-hidden />
        <p className="text-lg font-semibold text-navy dark:text-white">Consider it done.</p>
        <p className="text-navy/60 dark:text-white/60 text-sm max-w-sm">{BRAND.responsePromise}</p>
        <p className="text-navy/60 dark:text-white/60 text-sm">
          Need it sooner?{' '}
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink font-medium hover:underline"
          >
            Message us on WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
      <input type="text" {...register('_gotcha')} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First name" error={errors.firstName?.message} required>
          <input {...register('firstName')} autoComplete="given-name" className={inputClass} placeholder="Jane" />
        </Field>
        <Field label="Last name" error={errors.lastName?.message} required>
          <input {...register('lastName')} autoComplete="family-name" className={inputClass} placeholder="Smith" />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message} required>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          inputMode="email"
          className={inputClass}
          placeholder="jane@company.com"
        />
      </Field>

      <Field label="What do you need?" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="A task, a deadline, a headache — anything works."
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

      <div className="space-y-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark active:scale-[0.97] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
          <Send
            size={15}
            aria-hidden
            className={status === 'loading' ? 'animate-pulse' : undefined}
          />
        </button>
        <p className="text-xs text-navy/50 dark:text-white/50">{BRAND.responsePromise}</p>
      </div>
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
  const resolvedInputClass = onDark ? `w-full px-4 py-3 rounded-xl border ${fieldBg} text-base sm:text-sm focus:outline-none focus:ring-2 transition-all duration-200` : inputClass;
  const resolvedLabelClass = onDark ? 'block text-sm font-medium text-white mb-1.5' : labelClass;
  const consentClass = onDark ? 'text-white/60' : 'text-navy/60';

  async function onSubmit(data: FullValues) {
    if (data._gotcha) return;
    setStatus('loading');
    try {
      const fields: Record<string, string> = {
        subject: `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`,
        from_name: data.name || 'WYNWIN website',
        name: data.name,
        email: data.email,
      };
      if (data.jobTitle) fields.job_title = data.jobTitle;
      fields.company = data.company;
      fields.message = data.message;
      fields.consent = data.consent ? 'Yes — accepted the Privacy Policy' : 'Not given';
      await sendToWeb3Forms(fields);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle className="text-mint" size={40} aria-hidden />
        <p className={`text-lg font-semibold ${onDark ? 'text-white' : 'text-navy'}`}>
          Consider it done.
        </p>
        <p className={`text-sm max-w-sm ${onDark ? 'text-white/60' : 'text-navy/60'}`}>
          {BRAND.responsePromise}
        </p>
        <p className={`text-sm ${onDark ? 'text-white/60' : 'text-navy/60'}`}>
          Need it sooner?{' '}
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink font-medium hover:underline"
          >
            Message us on WhatsApp
          </a>
          .
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
          autoComplete="name"
          className={resolvedInputClass}
          placeholder="Jane Smith"
        />
      </Field>

      <Field label="Email" error={errors.email?.message} required labelClassName={resolvedLabelClass}>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          inputMode="email"
          className={resolvedInputClass}
          placeholder="jane@company.com"
        />
      </Field>

      <Field label="Job title" error={errors.jobTitle?.message} labelClassName={resolvedLabelClass}>
        <input
          {...register('jobTitle')}
          autoComplete="organization-title"
          className={resolvedInputClass}
          placeholder="Marketing Manager"
        />
      </Field>

      <Field label="Company name" error={errors.company?.message} required labelClassName={resolvedLabelClass}>
        <input
          {...register('company')}
          autoComplete="organization"
          className={resolvedInputClass}
          placeholder="Acme Ltd"
        />
      </Field>

      <Field label="What do you need?" error={errors.message?.message} required labelClassName={resolvedLabelClass}>
        <textarea
          {...register('message')}
          rows={5}
          className={`${resolvedInputClass} resize-none`}
          placeholder="What needs doing, by when, and what's getting in the way?"
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

      <div className="space-y-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-7 py-3.5 bg-pink text-white font-semibold rounded-full hover:bg-pink-dark active:scale-[0.97] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
          <Send
            size={15}
            aria-hidden
            className={status === 'loading' ? 'animate-pulse' : undefined}
          />
        </button>
        <p className={`text-xs ${onDark ? 'text-white/50' : 'text-navy/50'}`}>
          {BRAND.responsePromise}
        </p>
      </div>
    </form>
  );
}
