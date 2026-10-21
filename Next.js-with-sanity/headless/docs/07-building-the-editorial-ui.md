# The pages students see

## What the site looks like

The design is quiet: a cream page, dark text, a serif headline, and a small header. The header links are Home, Posts, About, and Studio. A button switches light and dark mode.

There is no search box, no category menu, and no newsletter. Those were removed so the first version stays easy to teach.

## Which file draws which page

| Address | File | What it shows |
| --- | --- | --- |
| `/` | `src/app/(site)/page.js` | The blog name and the post list |
| `/blog` | `src/app/(site)/blog/page.js` | The same list |
| `/blog/my-new-post` | `src/app/(site)/blog/[slug]/page.js` | One article |
| `/about` | `src/app/(site)/about/page.js` | A short explanation |
| `/studio` | `src/app/studio/[[...tool]]/page.js` | The editor |

`src/app/(site)/layout.js` wraps the public pages with the header and footer. Studio does not use that layout.

## How a list item is built

`src/components/post-list.jsx` loops over the posts. `src/components/article-card.jsx` prints the date, the title as a link, the summary, and the cover image when one exists.

`src/components/status.jsx` has the empty message. If Sanity returns an empty array, the reader sees “No posts yet.” The page does not invent a sample article.

## The article page

`src/app/(site)/blog/[slug]/page.js` asks for one post with the slug from the URL. It prints the title, date, summary, cover, and body. `generateMetadata` uses the title and summary for the browser tab.

If the slug does not match a published post, Next.js shows the not-found page.

## Shared words

`src/lib/site.js` holds the site name, the tagline, and the nav links. Change the tagline there if the whole class should see a new sentence.

## Mistakes

- Editing the home page and wondering why Studio looks the same. Studio is a separate route.
- Adding a fake post array when the list is empty. The empty message is the correct state.
- Forgetting that `/blog` and `/` both call `getPosts()`. A query bug shows up on both pages.

## Try this

Change the Home nav label in `src/lib/site.js` to `Start`, refresh, then change it back to `Home`.

## Questions

- Which component prints one card?
- Why do `/` and `/blog` show the same posts?
- What should the page do when the list is empty?

## You can say you learned it when

You can open the home page file and name the component that renders each post.
