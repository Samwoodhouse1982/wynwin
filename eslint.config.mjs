import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Third-party libraries copied in as-is (minified jsPDF for the Medicus
    // calculator's PDF report). They are not our code, so linting them only
    // produces noise.
    "public/vendor/**",
  ]),
]);

export default eslintConfig;
