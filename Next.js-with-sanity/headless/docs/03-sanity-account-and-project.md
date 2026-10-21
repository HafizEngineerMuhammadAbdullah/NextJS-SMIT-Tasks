# The Sanity project

## The names

| Word | Value in this class | What it means |
| --- | --- | --- |
| Project name | saylni-blog | The label you see in Sanity |
| Project ID | o2zj2owv | The ID the code uses |
| Dataset | production | The content folder inside the project |

The name and the ID are not the same thing. The website reads the ID from `.env.local`. `src/sanity/env.js` also falls back to `o2zj2owv` if the variable is empty.

The project ID is public. Anyone can read published posts with it. It cannot edit posts by itself. Editing requires a Sanity login.

## Open Studio

1. Run `npm run dev`.
2. Open `http://localhost:3000/studio`.
3. Sign in with an account that belongs to **saylni-blog**.

Studio is a client-side app. `sanity.config.js` starts with `"use client"` and sets `basePath: "/studio"`. The catch-all folder `[[...tool]]` lets Studio open its own inner pages.

## If Studio says it is not connected

Sanity is blocking the browser until this address is allowed.

1. Open [https://www.sanity.io/manage](https://www.sanity.io/manage) and sign in.
2. Open the project **saylni-blog**.
3. Go to API, then CORS origins.
4. Add `http://localhost:3000`.
5. Turn on **Allow credentials**.
6. Save and refresh `/studio`.

Use `http://localhost:3000` as the origin. Do not put `/studio` on the end of the CORS origin.

The Studio URL is not a secret. People who open it still have to sign in.

## What not to commit

- `.env.local`
- Passwords
- Any Sanity token that can write content

This blog does not need a token. It only reads published posts.

## How the code uses the settings

`src/sanity/lib/client.js` builds a Sanity client with the project ID and dataset. In development it reads the live API, so a new post shows up when you refresh. In production it uses the CDN and caches the result for about 60 seconds.

## Mistakes

- Typing the project name `saylni-blog` into `NEXT_PUBLIC_SANITY_PROJECT_ID`. That field needs `o2zj2owv`.
- Adding CORS without credentials. Studio login needs credentials.
- Committing `.env.local`.

## Try this

Open `/studio`. Stop when you see either the post list or the Sanity login. If you see the connection screen, follow the CORS steps above.

## Questions

- Which value is secret, and which value is safe to put in the frontend?
- What is a dataset?
- Why do we restart the dev server after an env change?

## You can say you learned it when

You can open Studio, explain the project ID, and fix the CORS screen without guessing.
