/**
 * Public Sanity settings. These values identify the project.
 * They are not secrets. A write token must never be placed here.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o2zj2owv";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-17";

const placeholderIds = new Set(["", "your_project_id", "your-project-id"]);

function isSanityConfigured() {
  return !placeholderIds.has(projectId.trim());
}

export { apiVersion, dataset, isSanityConfigured, projectId };
