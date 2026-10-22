import { z } from 'zod';

// Shared by the onboarding form (client) and the register route (server), so
// both sides agree on what a valid registration is.

export const registrationSchema = z.object({
  name: z.string().trim().min(2, 'We\'ll need your name').max(100),
  practice: z.string().trim().min(2, 'Which GP practice are you with?').max(150),
  role: z.string().trim().min(1, 'Choose the role closest to yours').max(50),
  // Optional, but it is what lets us match a person to an existing record later.
  email: z.union([z.literal(''), z.email('That email doesn\'t look right').max(200)]).optional(),
  // Honeypot. Real visitors never see it, so anything in here is a bot.
  _gotcha: z.string().max(200).optional(),
});

export type RegistrationValues = z.infer<typeof registrationSchema>;

export const clientIdSchema = z.string().regex(/^[a-z0-9-]{1,40}$/);

/** What the server hands to a sink. */
export interface RegistrationRecord {
  clientId: string;
  name: string;
  practice: string;
  role: string;
  email?: string;
  registeredAt: string;
}
