# Exercises and answers

Work in pairs. Publish only posts you are happy for the class to see. Do not put passwords or private notes in a post.

## Exercise 1 — Publish one post

1. Open `http://localhost:3000/studio` and sign in.
2. Create a post.
3. Set the title to something you can recognize, for example `Hello from class`.
4. Click **Generate** on the slug.
5. Write a one-sentence summary.
6. Add a cover image and alternative text.
7. Write two paragraphs and one heading in the body.
8. Click **Publish**.
9. Refresh `http://localhost:3000`.

**Answer.** The home page shows the title, date, summary, and cover. The link goes to `/blog/` plus the slug. If the page is still empty, the post is a draft, the slug is missing, or the dev server was started before `.env.local` existed.

## Exercise 2 — Trace the data

On paper, write the path of the title from Studio to the screen.

**Answer.** Studio document → published dataset `production` → `postsQuery` in `src/sanity/lib/queries.js` → `getPosts()` → `src/app/(site)/page.js` → `PostList` → `ArticleCard`.

## Exercise 3 — A missing slug

Open `/blog/not-a-real-post`.

**Answer.** You see the not-found page. `getPostBySlug` returns no post, and the page calls `notFound()`.

## Exercise 4 — Optional kicker field

In `src/sanity/schemas/post.js`, add this field after the title:

```js
defineField({
  name: "kicker",
  title: "Kicker",
  type: "string",
  description: "A short label above the title.",
  validation: (rule) => rule.max(40),
}),
```

Refresh Studio. The field appears. The website does not show it until you add `kicker` to the query and print it in the card.

**Answer.** Schema first, then query, then component. Doing only the schema changes the form, not the public page.

## Exercise 5 — Explain the empty state

Unpublish your post, or imagine the dataset has no published posts. What should `/` say?

**Answer.** “No posts yet.” The code must not insert a fake article.

## Exercise 6 — CORS in your own words

A classmate sees “Connect this Studio to your project.” What do you tell them?

**Answer.** Sign in to Sanity, open project saylni-blog, add the CORS origin `http://localhost:3000`, and allow credentials. The origin does not include `/studio`. Then refresh the editor.

## Review questions

1. What is the project ID for this class?
2. What is the only schema called?
3. Which button makes a post public?
4. Why can a live site wait about a minute?

**Answers.** `o2zj2owv`. `post`. Publish. Production caches the Sanity response for about 60 seconds.
