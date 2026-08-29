"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

const singletonTypes = new Set(["portfolioSettings", "resume"]);

export default defineConfig({
  name: "default",
  title: "Guanfolio CMS",
  projectId,
  dataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) => action === "publish" || action === "discardChanges" || action === "restore")
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Portfolio settings")
              .id("portfolioSettings")
              .child(
                S.document()
                  .schemaType("portfolioSettings")
                  .documentId("portfolioSettings"),
              ),
            S.listItem()
              .title("Resume")
              .id("resume")
              .child(S.document().schemaType("resume").documentId("resume")),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId() || ""),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
