# Client training hubs

A reusable training library for hidden client pages. The engine lives in
`lib/training` and `components/training`; each client only supplies a
catalogue, a theme and a page.

## Add a video

Edit that client's `catalogue.ts` and add an entry to `videos`:

```ts
{
  id: 'booking-appointments',            // unique, lowercase, hyphens
  title: 'Booking appointments',
  summary: 'One or two sentences.',
  durationMin: 4,                        // optional
  roles: ['gp', 'admin'],                // role ids, or 'all'
  focus: ['day-to-day'],                 // topic ids
  tier: 'premium',                       // optional; ids from catalogue.tiers
  keywords: ['diary', 'slots'],          // search terms not in the title/summary
  source: { type: 'vimeo', id: '123456789' },
}
```

`source` can be `{ type: 'youtube', id }`, `{ type: 'vimeo', id, hash? }` or
`{ type: 'file', url, poster? }`. Leave it `null` (with `placeholder: true`) until
the video exists. Roles, topics and tiers are defined at the top of the same file (tiers are
optional; leave `tiers` out and the Style filter doesn't appear);
filters and search read from it, so nothing else changes.

**Hosting.** Prefer Vimeo or YouTube (unlisted) or a video host over files in
`public/`, which would bloat the repo and the deploy. Embeds use YouTube's
no-cookie domain and Vimeo's do-not-track flag.

## Search

`search.ts` does keyword search with synonyms from the catalogue. Add synonym
groups to `catalogue.synonyms` when real searches miss. The hub only calls a
`SearchFn`, so an LLM or embedding version can replace `makeLocalSearch`: have
it call a server route that returns ranked video ids, and fall back to the
local search if the call fails. Keep the API key on the server.

## Registrations

The onboarding form posts to `/api/training/register`, which validates and hands
the record to `sinks.ts`. Set `TRAINING_REGISTRATION_WEBHOOK_URL` to receive
each registration as JSON (for example a Zapier or Make hook that creates the
record in Attio). With no sink set, development logs the record and production
returns 503, so details are never silently dropped. To write to Attio directly,
add a sink in `sinks.ts`.

The gate is data capture, not security. Anyone with the link and a video URL can
watch, so keep genuinely private material behind the video host's privacy
settings.

## A new client

1. Create `app/client/<name>-<random>/` with `page.tsx`, `catalogue.ts`, `theme.ts`
   (copy the Medicus ones). Use an unguessable folder name.
2. `app/client/layout.tsx` already makes everything under `/client` noindex and
   removes the Wynwin nav, footer and cookie banner.
3. Never add the route to `sitemap.ts` or `robots.ts`.
