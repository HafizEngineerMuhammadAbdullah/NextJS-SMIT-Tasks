# Slugs and missing pages

## What a slug is

A slug is the last part of the address. The title “My new post” becomes the slug `my-new-post`. The page is:

```text
http://localhost:3000/blog/my-new-post
```

Studio generates the slug from the title. You can edit it before you publish. After you publish, changing the slug changes the address. The old address stops working.

## How Next.js matches it

The folder `src/app/(site)/blog/[slug]` means “any one segment after `/blog`.” The page reads `params.slug` and passes it to `getPostBySlug`.

`generateStaticParams` asks Sanity for the published slugs so the build knows which posts exist. The page is still marked `force-dynamic`, so a request on your computer loads the latest published post instead of a frozen empty page.

## When the page is missing

If the slug is wrong, or the post is still a draft, `getPostBySlug` does not return a post. The page calls `notFound()`. The reader sees the not-found screen, not a broken layout.

## What this site does not have

This version does not have category pages, search, or filters. If a lesson note mentions `/category` or a search box, that note is out of date. The only public content routes are `/`, `/blog`, `/blog/[slug]`, and `/about`.

## Mistakes

- Publishing without clicking Generate on the slug. The query skips that post.
- Putting spaces in the slug. Use the generated value.
- Looking for a category route. It was removed.

## Try this

Publish a post, copy its slug, and open `/blog/` plus that slug. Then open `/blog/this-slug-does-not-exist` and confirm you get the not-found page.

## Questions

- What turns a title into a URL?
- What happens if you change a published slug?
- Which function loads one post?

## You can say you learned it when

You can build a post URL from a slug and explain what the reader sees when the slug is wrong.
