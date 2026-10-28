// Turns calculator.html into calculator.ts so the route can serve it without
// reading the file system at request time (nothing to trace or bundle).
//
//   node app/client/medicus-roi-4e72e00b/build.mjs
//
// Run it after every edit to calculator.html and commit both files.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, 'calculator.html'), 'utf8');

const ts =
  '// GENERATED from calculator.html by build.mjs. Edit the HTML, then rebuild.\n' +
  'export const calculatorHtml = ' +
  JSON.stringify(html) +
  ';\n';

writeFileSync(join(here, 'calculator.ts'), ts);
console.log(`calculator.ts written (${html.length.toLocaleString('en-GB')} characters)`);
