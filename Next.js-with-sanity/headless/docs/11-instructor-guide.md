# Notes for the teacher

## The promise of this version

Students leave able to publish one post and see it on the website. They can name the schema, the query, and the page file. They are not asked to build authors, categories, search, or a newsletter.

## Suggested timing

| Block | Minutes | Goal |
| --- | --- | --- |
| 1 | 20 | Run the site. Open `/` and `/studio`. |
| 2 | 15 | Explain headless CMS with the diagram in lesson 1. |
| 3 | 20 | Fix CORS if needed. Sign in. |
| 4 | 25 | Publish one post together. Refresh and see it. |
| 5 | 20 | Read `post.js` and `queries.js` out loud. |
| 6 | 20 | Exercises 1 to 3. |

A second session can cover images, the body, and deploy notes.

## Before class

- Confirm Node.js is installed on the student machines.
- Confirm the Sanity project **saylni-blog** (`o2zj2owv`) exists and the students can be members, or they use a shared login you control.
- Add `http://localhost:3000` as a CORS origin with credentials, so the connection screen does not eat the first half hour. Students on another port need that port added too.
- Run `npm install` once in the shared folder if the machines are slow. OneDrive can make installs take several minutes.
- Publish nothing secret. The dataset is readable by the site.

## What to demonstrate live

1. Create a post and click **Save**. Refresh the site. It should stay unchanged.
2. Click **Publish**. Refresh. The post appears.
3. Open the post URL.
4. Show `postsQuery` and point at `!(_id in path("drafts.**"))`.

## If the post does not appear

Check these in order:

1. The document status is Published, not Draft.
2. The slug field is filled.
3. `.env.local` contains `NEXT_PUBLIC_SANITY_PROJECT_ID=o2zj2owv` and `NEXT_PUBLIC_SANITY_DATASET=production`.
4. The dev server was restarted after that file was created.
5. The browser is `http://localhost:3000`, not an old production tab.

The fetch in development uses `cache: "no-store"`. If a student still sees the empty message, the post is not in the published query. Do not tell them to hard-code a sample post.

## Studio login problems

The “Connect this Studio” screen is Sanity’s CORS screen. It is not a missing schema. The student must be logged in, and `http://localhost:3000` must be allowed with credentials.

## What not to add during the first class

- A write token in `NEXT_PUBLIC_`
- Author and category schemas
- Search and filters
- Fake posts for screenshots

## Free plan

Tell students the free plan is enough for class and that they should read current limits before a real launch. Do not promise unlimited API use.

## Files worth projecting

- `src/sanity/schemas/post.js`
- `src/sanity/lib/queries.js`
- `src/sanity/lib/client.js`
- `src/app/(site)/page.js`

The printable handout is `docs/Saylani-Tech-Blog-Student-Guide.pdf`.
