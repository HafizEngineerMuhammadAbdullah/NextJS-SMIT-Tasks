import { PostList } from "@/components/blog/post-list";
import { siteConfig } from "@/lib/site";
import { getPosts } from "@/sanity/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const result = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <p className="text-xs tracking-[0.16em] text-graphite uppercase">{siteConfig.sanityProjectName}</p>
      <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">{siteConfig.name}</h1>
      <p className="mt-4 text-lg leading-8 text-graphite">{siteConfig.tagline}</p>
      <div className="mt-10">
        <PostList result={result} />
      </div>
    </div>
  );
}
