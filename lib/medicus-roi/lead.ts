import { z } from 'zod';

// What the Medicus practice time calculator sends when someone asks for the
// PDF report. The calculator lives in app/client/medicus-roi-*/calculator.html
// and posts this shape to /api/medicus-roi/lead.
//
// The numbers are the calculator's outputs at the moment of the request, so
// the lead can be read on its own without re-running the model.

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  // The organisation the estimate is for: a practice, PCN, federation or ICB name.
  practice: z.string().trim().min(2).max(150),
  email: z.email().max(200),
  role: z.string().trim().max(100).optional().default(''),
  // Marketing consent is optional and recorded as given; the report is sent
  // either way, so consent is never a condition of getting it.
  consent: z.boolean().optional().default(false),
  // Honeypot. Real visitors never see it, so anything in here is a bot.
  _gotcha: z.string().max(200).optional(),

  submittedAt: z.string().max(40),
  // Who the estimate is for. A practice always has practices = 1; a network
  // or region carries its practice count alongside the total list size.
  orgType: z.enum(['practice', 'pcn', 'federation', 'icb']).optional().default('practice'),
  // Which layout produced the lead: A is the step-by-step calculator, B the single page with the live card.
  variant: z.enum(['A', 'B']).optional().default('A'),
  practices: z.number().int().min(1).max(5000).optional().default(1),
  patients: z.number().int().min(1).max(20_000_000),
  staffingBasis: z.string().max(60),
  gpFte: z.number().min(0).max(20_000),
  nurseFte: z.number().min(0).max(20_000),
  // Time released, in hours: the total, and its clinical (GPs and nurses) and non-clinical (admin) parts.
  hoursPerWeek: z.number().min(0),
  clinicalHoursPerWeek: z.number().min(0).optional().default(0),
  adminHoursPerWeek: z.number().min(0).optional().default(0),
  hoursPerYear: z.number().min(0),
  // Direct savings: add-on costs retired, in total and by who pays today (the practice(s), the PCN or federation
  // itself, or an ICB, trust or other commissioner).
  addOnsPerYear: z.number().min(0),
  addOnsPracticePerYear: z.number().min(0).optional().default(0),
  addOnsNetworkPerYear: z.number().min(0).optional().default(0),
  addOnsCommissionerPerYear: z.number().min(0).optional().default(0),
  // Older submissions valued the time in pounds and carried a cautious case; accepted and ignored so a cached page still posts cleanly.
  valuePerYear: z.number().min(0).optional(),
  totalPerYear: z.number().min(0).optional(),
  totalPracticePerYear: z.number().min(0).optional(),
  cautiousHoursPerWeek: z.number().min(0).optional(),
  cautiousValuePerYear: z.number().min(0).optional(),
  functions: z.array(z.string().max(60)).max(40),
  summary: z.string().max(6000),
});

export type LeadValues = z.infer<typeof leadSchema>;

/** What the route hands to a sink: the submission minus the honeypot. */
export type LeadRecord = Omit<LeadValues, '_gotcha'> & { receivedAt: string };
