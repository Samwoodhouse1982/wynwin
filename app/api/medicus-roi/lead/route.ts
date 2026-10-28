import { z } from 'zod';
import { leadSchema } from '@/lib/medicus-roi/lead';
import { saveLead } from '@/lib/medicus-roi/sinks';

// Receives the "Download PDF report" form from the Medicus practice time
// calculator (app/client/medicus-roi-*). The PDF itself is built in the
// browser; this only records who asked for it and what the model showed them.

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'invalid', fields: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const { _gotcha, ...lead } = parsed.data;

  // Bots fill the hidden field. Answer as if it worked so they don't retry.
  if (_gotcha) return Response.json({ ok: true });

  const result = await saveLead({ ...lead, receivedAt: new Date().toISOString() });
  if (!result.ok) return Response.json({ ok: false, error: 'failed' }, { status: 502 });
  return Response.json({ ok: true });
}
