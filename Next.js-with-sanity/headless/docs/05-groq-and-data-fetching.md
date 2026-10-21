# GROQ and loading posts

## What GROQ is

GROQ is the question you send to Sanity. A simple question has a filter and a projection.

```groq
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  title,
  "slug": slug.current
}
```

`*` means all documents. The filter keeps some of them. The curly braces choose the fields. `"slug": slug.current` turns the nested slug into a plain string.

## The questions in this project

They live in `src/sanity/lib/queries.js`.

| Function | Question | Job |
| --- | --- | --- |
| `getPosts` | `postsQuery` | All published posts, newest first |
| `getPostBySlug` | `postBySlugQuery` | One post, including the body |
| `getPostSlugs` | `postSlugsQuery` | Just the slugs |

Every public question includes:

```groq
_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))
```

That last part leaves drafts out. The client also uses the published perspective and has no token, so it is not asking for drafts.

The slug is passed as a parameter, `$slug`. Do not glue the reader’s text into the query string.

## Where the page calls it

`src/app/(site)/page.js` is an async Server Component:

```js
const result = await getPosts();
```

It does not use `useEffect`. The HTML already contains the titles when it reaches the browser.

`getPosts` lives in `src/sanity/lib/posts.js`. It calls `sanityFetch` in `src/sanity/lib/client.js`.

## Why a post might not show

This happened in class: the post was published, but the page still said “No posts yet.” The first empty answer had been cached forever.

The fix is in `client.js`:

- On your computer, the fetch uses `cache: "no-store"`, so a refresh loads the new post.
- The pages use `export const dynamic = "force-dynamic"` for the same reason.
- In production, the fetch is cached for about 60 seconds. A new post can take up to a minute to appear on a deployed site.

## Empty and errors

`getPosts` returns a `status`:

- `unconfigured` if the project ID is missing
- `ok` with an array, which may be empty
- `error` if the request throws

An empty list is not a crash. The page says “No posts yet.”

## Mistakes

- Clicking Save instead of Publish.
- Forgetting the slug.
- Caching the empty list forever and thinking the query is wrong.
- Building the GROQ string by adding user input into it.

## Try this

Publish a short post. Refresh `/`. Then open `/blog/your-slug`. If the home page is still empty, check that the document says Published and that the slug exists.

## Questions

- What does the projection do?
- Why do we pass `$slug` as a parameter?
- What is the difference between a draft and a published post?

## You can say you learned it when

You can read `postsQuery`, point to the function that runs it, and explain why a refresh shows a newly published post on your computer.
