import { z } from 'zod';

// What the Medicus practice time calculator sends when someone asks for the
// PDF report. The calculator lives in app/client/medicus-roi-*/calculator.html
// and posts this shape to /api/medicus-roi/lead.
//
// The numbers are the calculator's outputs at the moment of the request, so
// the lead can be read on its own without re-running the model.

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  practice: z.string().trim().min(2).max(150),
  email: z.email().max(200),
  role: z.string().trim().max(100).optional().default(''),
  // Marketing consent is optional and recorded as given; the report is sent
  // either way, so consent is never a condition of getting it.
  consent: z.boolean().optional().default(false),
  // Honeypot. Real visitors never see it, so anything in here is a bot.
  _gotcha: z.string().max(200).optional(),

  submittedAt: z.string().max(40),
  patients: z.number().int().min(1).max(1_000_000),
  staffingBasis: z.string().max(60),
  gpFte: z.number().min(0).max(1000),
  nurseFte: z.number().min(0).max(1000),
  hoursPerWeek: z.number().min(0),
  hoursPerYear: z.number().min(0),
  valuePerYear: z.number().min(0),
  addOnsPerYear: z.number().min(0),
  functions: z.array(z.string().max(60)).max(40),
  summary: z.string().max(6000),
});

export type LeadValues = z.infer<typeof leadSchema>;

/** What the route hands to a sink: the submission minus the honeypot. */
export type LeadRecord = Omit<LeadValues, '_gotcha'> & { receivedAt: string };
