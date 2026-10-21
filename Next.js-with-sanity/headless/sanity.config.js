"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "saylni-blog",
  title: "Saylani Tech Blog",
  basePath: "/studio",
  projectId: projectId || "missing-project-id",
  dataset: dataset || "production",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
