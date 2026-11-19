import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Shared packages must stay independent of the apps that use them: no
// imports from any app, and no app path aliases (@/..., @c/...), which
// only exist inside an app. Import other files in this package relatively.
const apps = ["personal-site", "monitor-site"];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            ...apps.map((app) => ({
              group: [app, `${app}/**`, `**/${app}`, `**/${app}/**`],
              message: `Shared packages can't import from apps (${app}).`,
            })),
            {
              group: ["@/*", "@c/*", "@d/*", "@l/*", "@p/*"],
              message:
                "App path aliases don't exist in packages/ui. Use a relative import instead.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
