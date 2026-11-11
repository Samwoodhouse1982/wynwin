# Medicus practice time calculator

Hidden client area at `/client/medicus-roi-4e72e00b`. The folder name is the
access control, so share the link privately and never add it to the sitemap,
robots or navigation.

## Files

- `calculator.html` — the calculator itself: a self-contained page (styles and
  script inline). The PDF library is served from `public/vendor/jspdf-2.5.1.umd.min.js`
  (MIT), with cdnjs as a fallback, because some NHS networks block CDNs. This is the
  file to edit.
- `build.mjs` — converts `calculator.html` into `calculator.ts`. Run
  `node app/client/medicus-roi-4e72e00b/build.mjs` after every edit and commit
  both files.
- `calculator.ts` — generated; the route serves this string.
- `route.ts` — serves the page with `noindex`.

## Lead capture

The "Download PDF report" form posts to `/api/medicus-roi/lead`
(`app/api/medicus-roi/lead/route.ts`), which validates the submission and
hands it to `lib/medicus-roi/sinks.ts`:

- If `MEDICUS_ROI_LEAD_WEBHOOK_URL` is set, the lead is POSTed there as JSON
  (Zapier, Make or a direct Attio hook).
- Otherwise it is emailed through Web3Forms to the site's inbox, using the same
  access key as the contact form.

The PDF is generated in the browser either way, so a failed send never blocks
the report.

## Model

Assumptions, prices and the basis for each are in the `WILMSLOW_ASSUMP`,
`DEFAULTS` and `VENDORS` blocks near the top of the script in
`calculator.html`. Sources are linked in the page's "Basis and limits" section.

The first step asks who the estimate is for: a practice, a PCN, a federation or
an ICB. The `ORG` block holds the slider ranges and wording for each. For a
network or region the same model runs on the total list and the number of
practices entered: staffing is estimated from the total list, admin time
follows the total list, and each add-on is costed for a practice of average list
size and multiplied by the number of practices using it (the "of N practices"
field on the functions step). Leads carry `orgType` and `practices` alongside
`patients`, plus the add-on saving paid by the practice and the cautious-case figures.

The inputs and current step are kept in the URL hash (`#s=`), so a results link
can be shared, and in localStorage for a returning visitor. Add-on prices follow
Accurx's G-Cloud 15 tiers by total list size; each add-on records who pays
(practice, or ICB/trust/other) and the saving is split accordingly.

## Option B

`option-b/` holds a second layout of the same calculator for comparison: one page,
questions on the left, a results card on the right that sticks as you scroll and
updates on every input (modelled on Doctolib's gain simulator). It shares the
model, the report and the lead endpoint; leads from it carry `variant: 'B'`.
Live at `/client/medicus-roi-4e72e00b/option-b`.
