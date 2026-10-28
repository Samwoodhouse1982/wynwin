import { calculatorHtml } from './calculator';

// Hidden client area: the Medicus practice time calculator.
//
// The calculator is a self-contained HTML page (calculator.html) with its own
// styles and script, so it is served as-is rather than ported into React. The
// unguessable folder name is the access control, as with the other /client
// areas: don't add this route to sitemap.ts or robots.ts. The page carries its
// own noindex and "Private page" preview tags because layouts don't apply to
// route handlers.
//
// The lead form posts to /api/medicus-roi/lead (see lib/medicus-roi).

export const dynamic = 'force-static';

export function GET() {
  return new Response(calculatorHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
