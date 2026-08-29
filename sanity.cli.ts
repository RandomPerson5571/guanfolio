import { defineCliConfig } from "sanity/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "missingprojectid";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: "g6wf2z9i84bwx0c3jd89ui5s",
  },
  studioHost: "guanfolio",
});
