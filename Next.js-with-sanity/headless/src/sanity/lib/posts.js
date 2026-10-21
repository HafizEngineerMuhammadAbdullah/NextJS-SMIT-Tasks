import { isSanityConfigured } from "../env";
import { sanityFetch } from "./client";
import { postBySlugQuery, postSlugsQuery, postsQuery } from "./queries";

function unconfigured() {
  return { status: "unconfigured", data: null };
}

async function run(query, params) {
  if (!isSanityConfigured()) {
    return unconfigured();
  }

  try {
    const data = await sanityFetch({ query, params });
    return { status: "ok", data };
  } catch (error) {
    console.error("Sanity query failed", error);
    return {
      status: "error",
      data: null,
      message: error instanceof Error ? error.message : "The content request failed.",
    };
  }
}

export async function getPosts() {
  const result = await run(postsQuery, {});
  return { ...result, data: result.data || [] };
}

export async function getPostBySlug(slug) {
  return run(postBySlugQuery, { slug });
}

export async function getPostSlugs() {
  const result = await run(postSlugsQuery, {});
  return { ...result, data: result.data || [] };
}
