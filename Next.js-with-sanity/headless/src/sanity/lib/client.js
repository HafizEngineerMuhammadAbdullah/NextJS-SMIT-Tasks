import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/**
 * Read-only client for published content.
 * useCdn sends public queries to Sanity's API CDN, which is the right
 * default for a read-focused site on the free plan.
 * No token is attached, so drafts are not requested.
 */
const isDev = process.env.NODE_ENV === "development";

const client = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The CDN can lag behind Publish. Local development reads the live API
      // so a new post shows up on the next refresh.
      useCdn: !isDev,
      perspective: "published",
    })
  : null;

/**
 * Fetch published content.
 * In development, skip the Next.js cache so Publish is visible immediately.
 * In production, refresh the cached result about once a minute.
 */
async function sanityFetch({ query, params = {} }) {
  if (!client) {
    return null;
  }

  if (isDev) {
    return client.fetch(query, params, { cache: "no-store" });
  }

  return client.fetch(query, params, {
    next: { revalidate: 60 },
  });
}

export { client, sanityFetch };
