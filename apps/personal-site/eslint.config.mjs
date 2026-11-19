import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Apps can import from packages/ but never from each other. List the other
// apps' folder names here, imports of them (by path or package name) are
// then an error. Shared code belongs in packages/ instead.
const otherApps = ["monitor-site"];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: otherApps.map((app) => ({
            group: [app, `${app}/**`, `**/${app}`, `**/${app}/**`],
            message: `Apps can't import from other apps (${app}). Move shared code into packages/ instead.`,
          })),
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
