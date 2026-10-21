# Put the site online

## Two different speeds

On your computer, `npm run dev` does not cache the Sanity response. Publish a post, refresh the browser, and it should be there.

A deployed site caches the response for about 60 seconds. That setting is `next: { revalidate: 60 }` in `src/sanity/lib/client.js`. Production also sets `useCdn: true`, so the read goes through Sanity’s CDN. A brand-new post can take up to a minute to show. That is expected.

## Before you deploy

1. Run `npm run lint`.
2. Run `npm run build`.
3. Confirm `.env.local` is not committed. The host needs the same public variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=o2zj2owv
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-17
NEXT_PUBLIC_SITE_URL=https://your-real-domain
```

`NEXT_PUBLIC_SITE_URL` should be the live address, with `https`, and without a slash at the end. It is used for metadata.

4. In Sanity, add the live origin to CORS, for example `https://your-real-domain`, and allow credentials so Studio works on that domain too.

## Studio on the live site

`/studio` is deployed with the site. It is still protected by the Sanity login. Do not add a write token to make publishing “easier.” Editors sign in.

## Free plan

This class uses Sanity’s free plan. Check [sanity.io/pricing](https://www.sanity.io/pricing) before a public launch, because limits change. This app only reads published content, which is the usual free-plan pattern.

## A production check

After deploy:

- `/` lists published posts
- `/blog/your-slug` opens one post
- A draft does not appear
- `/studio` asks you to sign in
- A new publish shows up within about a minute

## Mistakes

- Deploying with the project ID still set to `your_project_id`.
- Leaving `NEXT_PUBLIC_SITE_URL` as `http://localhost:3000` on the live host.
- Forgetting the live CORS origin, then thinking Studio is broken.
- Expecting a live publish to appear in the same second. Wait a minute and refresh.

## Try this

Write down the four environment variables you would paste into a host, and which one must change between your laptop and the live site.

## Questions

- Why is a new post instant on your laptop and delayed online?
- Which variable must be the public site address?
- Why do we still not add a write token?

## You can say you learned it when

You can explain the cache difference and list the settings a host needs.
