import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import path from "node:path";

// The Docker build has no .git folder, so CI passes the commit in as GIT_COMMIT.
function getCommit() {
  if (process.env.GIT_COMMIT) {
    return process.env.GIT_COMMIT.slice(0, 7);
  }

  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "local";
  }
}

const nextConfig: NextConfig = {
  output: "standalone",

  // Trace files from the repo root, so the standalone build includes
  // packages/ui and the hoisted node_modules. The output then mirrors the
  // repo: the server ends up in .next/standalone/apps/personal-site/.
  outputFileTracingRoot: path.join(__dirname, "../.."),

  // @repo/ui ships TypeScript source rather than built files, so Next
  // compiles it along with the app
  transpilePackages: ["@repo/ui"],

  // Shown in the title block at the bottom of the home page
  env: {
    BUILD_COMMIT: getCommit(),
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
};

export default nextConfig;
