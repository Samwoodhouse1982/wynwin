import type { LeadRecord } from './lead';

// Server-side only. Where a calculator lead goes once the route has validated it.
//
// Two sinks, tried in order:
//
// 1. A webhook (MEDICUS_ROI_LEAD_WEBHOOK_URL), for a Zapier or Make scenario
//    or a direct hook into Attio, once Medicus decides how leads should land.
// 2. Web3Forms, which emails the lead to the site's inbox. This is the default
//    while the calculator is a client preview, so nothing is lost before the
//    webhook exists. The access key is the public one the contact form uses:
//    it can only submit to that form, whose recipient is set in the Web3Forms
//    dashboard.

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '732edaa2-f324-4831-a8dd-0e6dc46a92d8';

export type SaveResult = { ok: true; via: 'webhook' | 'email' | 'log' } | { ok: false };

export async function saveLead(record: LeadRecord): Promise<SaveResult> {
  const webhook = process.env.MEDICUS_ROI_LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'wynwin-medicus-roi', ...record }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return { ok: true, via: 'webhook' };
    } catch {
      // Fall through to email so the lead still reaches someone.
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[medicus-roi] lead (dev only, not sent):', record);
    return { ok: true, via: 'log' };
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Medicus calculator report request: ${record.practice}`,
        from_name: 'WYN WIN site — Medicus calculator',
        name: record.name,
        email: record.email,
        practice: record.practice,
        role: record.role,
        marketing_consent: record.consent ? 'yes' : 'no',
        patients: String(record.patients),
        staffing_basis: record.staffingBasis,
        hours_per_week: String(record.hoursPerWeek),
        value_per_year: String(record.valuePerYear),
        add_ons_per_year: String(record.addOnsPerYear),
        functions: record.functions.join(', '),
        message: record.summary,
      }),
      signal: AbortSignal.timeout(8000),
    });
    const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
    return res.ok && result?.success ? { ok: true, via: 'email' } : { ok: false };
  } catch {
    return { ok: false };
  }
}
