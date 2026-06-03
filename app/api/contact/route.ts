import { NextRequest, NextResponse } from 'next/server';

// Submissions are delivered by Web3Forms. The recipient inbox is configured in
// the Web3Forms dashboard that this access key belongs to — not here. The key
// is safe to expose (Web3Forms access keys are designed to live in client-side
// code), but we keep it server-side and allow a per-environment override.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ?? '732edaa2-f324-4831-a8dd-0e6dc46a92d8';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot — silently accept (and drop) anything a bot fills into _gotcha.
    if (body._gotcha) {
      return NextResponse.json({ ok: true });
    }

    if (!body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isSimple = body.formType === 'simple';
    const name = isSimple
      ? `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim()
      : String(body.name ?? '').trim();

    const subject = isSimple
      ? `New enquiry from ${name}`
      : `New enquiry from ${name}${body.company ? ` (${body.company})` : ''}`;

    // The keys below become the labelled rows in the Web3Forms notification
    // email; the `email` field is automatically used as the reply-to. The
    // access_key / subject / from_name fields are control fields and are not
    // shown as data rows.
    const payload: Record<string, string> = {
      access_key: ACCESS_KEY,
      subject,
      from_name: name || 'WYNWIN website',
      name,
      email: String(body.email),
    };
    if (!isSimple) {
      if (body.jobTitle) payload.job_title = String(body.jobTitle);
      payload.company = String(body.company ?? '');
    }
    payload.message = String(body.message);
    payload.consent = body.consent ? 'Yes — accepted the Privacy Policy' : 'Not given';

    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = (await res.json().catch(() => null)) as { success?: boolean } | null;

    if (!res.ok || !result?.success) {
      console.error('Web3Forms submission failed:', res.status, result);
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
