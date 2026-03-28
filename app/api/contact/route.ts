import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'hello@wynwin.co.uk';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'noreply@wynwin.co.uk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body._gotcha) {
      return NextResponse.json({ ok: true });
    }

    const { formType, ...fields } = body;
    const isSimple = formType === 'simple';

    const subject = isSimple
      ? `New enquiry from ${fields.firstName} ${fields.lastName}`
      : `New enquiry from ${fields.name}${fields.company ? ` (${fields.company})` : ''}`;

    const htmlBody = isSimple
      ? `
        <h2 style="color:#0D1B3E;font-family:sans-serif">New website enquiry</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px 0;color:#666;width:140px"><strong>Name</strong></td><td style="padding:8px 0">${fields.firstName} ${fields.lastName}</td></tr>
          <tr><td style="padding:8px 0;color:#666"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${fields.email}">${fields.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666"><strong>Message</strong></td><td style="padding:8px 0;white-space:pre-wrap">${fields.message}</td></tr>
        </table>
      `
      : `
        <h2 style="color:#0D1B3E;font-family:sans-serif">New website enquiry</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px 0;color:#666;width:140px"><strong>Name</strong></td><td style="padding:8px 0">${fields.name}</td></tr>
          <tr><td style="padding:8px 0;color:#666"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${fields.email}">${fields.email}</a></td></tr>
          ${fields.jobTitle ? `<tr><td style="padding:8px 0;color:#666"><strong>Job title</strong></td><td style="padding:8px 0">${fields.jobTitle}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#666"><strong>Company</strong></td><td style="padding:8px 0">${fields.company}</td></tr>
          <tr><td style="padding:8px 0;color:#666"><strong>Message</strong></td><td style="padding:8px 0;white-space:pre-wrap">${fields.message}</td></tr>
        </table>
      `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: fields.email,
      subject,
      html: htmlBody,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
