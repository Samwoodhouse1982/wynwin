// Turns each calculator.html into a calculator.ts so the routes can serve it
// without reading the file system at request time (nothing to trace or bundle).
//
//   node app/client/medicus-roi-4e72e00b/build.mjs
//
// Run it after every edit to a calculator.html and commit both files. Two
// variants live here: the step-by-step calculator (Option A, this folder) and
// the single-page one with the live results card (Option B, ./option-b).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

for (const dir of ['.', 'option-b']) {
  const html = readFileSync(join(here, dir, 'calculator.html'), 'utf8');
  const ts =
    '// GENERATED from calculator.html by build.mjs. Edit the HTML, then rebuild.\n' +
    'export const calculatorHtml = ' +
    JSON.stringify(html) +
    ';\n';
  writeFileSync(join(here, dir, 'calculator.ts'), ts);
  console.log(`${dir}/calculator.ts written (${html.length.toLocaleString('en-GB')} characters)`);
}
