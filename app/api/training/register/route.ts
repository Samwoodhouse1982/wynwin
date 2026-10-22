import { z } from 'zod';
import { clientIdSchema, registrationSchema } from '@/lib/training/registration';
import { saveRegistration } from '@/lib/training/sinks';

const submissionSchema = registrationSchema.extend({ clientId: clientIdSchema });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'invalid', fields: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const { clientId, name, practice, role, email, _gotcha } = parsed.data;

  // Bots fill the hidden field. Answer as if it worked so they don't retry.
  if (_gotcha) return Response.json({ ok: true });

  const result = await saveRegistration({
    clientId,
    name,
    practice,
    role,
    ...(email ? { email } : {}),
    registeredAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return Response.json(
      { ok: false, error: result.reason },
      { status: result.reason === 'not_configured' ? 503 : 502 },
    );
  }
  return Response.json({ ok: true });
}
