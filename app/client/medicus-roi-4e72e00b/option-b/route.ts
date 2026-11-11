import { calculatorHtml } from './calculator';

// Option B of the Medicus practice time calculator: one page, inputs on the
// left, a results card on the right that updates as you go. Same model, same
// lead endpoint and report as Option A (../route.ts); only the layout differs.

export const dynamic = 'force-static';

export function GET() {
  return new Response(calculatorHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
