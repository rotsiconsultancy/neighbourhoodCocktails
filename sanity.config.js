import { presentationTool } from "sanity/presentation";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "neighbourhood-cocktails",
  title: "The Neighbourhood Cocktails",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
