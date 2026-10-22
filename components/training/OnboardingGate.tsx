'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Option } from '@/lib/training/types';
import { registrationSchema, type RegistrationValues } from '@/lib/training/registration';
import type { StoredRegistration } from '@/lib/training/storage';
import styles from './Training.module.css';

interface Props {
  clientId: string;
  roles: Option[];
  onDone: (value: StoredRegistration) => void;
}

// First thing a new visitor sees. It collects who they are before they reach
// the videos. This is data capture, not security: anyone with the link and
// the video URLs can still watch, so keep genuinely private material behind
// the video host's own privacy settings.
export default function OnboardingGate({ clientId, roles, onDone }: Props) {
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState<RegistrationValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationValues>({ resolver: zodResolver(registrationSchema) });

  const finish = (values: RegistrationValues, synced: boolean) => {
    onDone({
      name: values.name,
      practice: values.practice,
      role: values.role,
      email: values.email || undefined,
      registeredAt: new Date().toISOString(),
      synced,
    });
  };

  const send = async (values: RegistrationValues) => {
    setSaving(true);
    setFailed(null);
    try {
      const res = await fetch('/api/training/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, ...values }),
      });
      if (!res.ok) throw new Error('save failed');
      finish(values, true);
    } catch {
      setFailed(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={styles.gate} onSubmit={handleSubmit(send)} noValidate>
      <h2>Before you start</h2>

      <div className={styles.field}>
        <label htmlFor="t-name">Your name</label>
        <input
          id="t-name"
          className={styles.input}
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="t-practice">GP practice</label>
        <input
          id="t-practice"
          className={styles.input}
          autoComplete="organization"
          aria-invalid={!!errors.practice}
          {...register('practice')}
        />
        {errors.practice && <p className={styles.error}>{errors.practice.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="t-role">Your role</label>
        <select
          id="t-role"
          className={styles.input}
          defaultValue=""
          aria-invalid={!!errors.role}
          {...register('role')}
        >
          <option value="" disabled>
            Choose one
          </option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
        <p className={styles.help}>We use this to show you the videos that matter most to you.</p>
        {errors.role && <p className={styles.error}>{errors.role.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="t-email">
          Work email <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="t-email"
          type="email"
          className={styles.input}
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="t-gotcha">Leave this empty</label>
        <input id="t-gotcha" tabIndex={-1} autoComplete="off" {...register('_gotcha')} />
      </div>

      {failed && (
        <div className={styles.formError} role="alert">
          <span>We couldn&apos;t save your details just now.</span>
          <span className={styles.formErrorActions}>
            <button type="button" className={styles.linkButton} onClick={() => send(failed)}>
              Try again
            </button>
            <button type="button" className={styles.linkButton} onClick={() => finish(failed, false)}>
              Continue to the videos anyway
            </button>
          </span>
        </div>
      )}

      <div>
        <button type="submit" className={styles.button} disabled={saving}>
          {saving ? 'Saving…' : 'Continue to the videos'}
        </button>
      </div>

      <p className={styles.privacy}>
        We use these details to understand who is using the training and to follow up with help.
        See our{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
