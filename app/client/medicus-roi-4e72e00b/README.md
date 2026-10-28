# Medicus practice time calculator

Hidden client area at `/client/medicus-roi-4e72e00b`. The folder name is the
access control, so share the link privately and never add it to the sitemap,
robots or navigation.

## Files

- `calculator.html` — the calculator itself: a self-contained page (styles and
  script inline, jsPDF from cdnjs for the PDF report). This is the file to edit.
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
