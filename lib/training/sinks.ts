import type { RegistrationRecord } from './registration';

// Server-side only. Where a registration goes once the route has validated it.
//
// Today there is one sink: a webhook (TRAINING_REGISTRATION_WEBHOOK_URL), which
// can feed a Zapier or Make scenario that creates the record in Attio. When the
// Attio "engagement" shape is settled, add a direct Attio sink here and call it
// from saveRegistration. The route and the form don't need to change.

export type SaveResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'failed' };

export async function saveRegistration(record: RegistrationRecord): Promise<SaveResult> {
  const url = process.env.TRAINING_REGISTRATION_WEBHOOK_URL;

  if (!url) {
    // In development, log so the flow can be tried without any setup. In
    // production an unconfigured sink must fail loudly: reporting success while
    // keeping nothing would quietly lose people's details.
    if (process.env.NODE_ENV !== 'production') {
      console.info('[training] no sink configured (dev only), registration:', record);
      return { ok: true };
    }
    return { ok: false, reason: 'not_configured' };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'wynwin-training', ...record }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: 'failed' };
  } catch {
    return { ok: false, reason: 'failed' };
  }
}
