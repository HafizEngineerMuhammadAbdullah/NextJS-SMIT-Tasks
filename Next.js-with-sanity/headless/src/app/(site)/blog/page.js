import { PostList } from "@/components/blog/post-list";
import { getPosts } from "@/sanity/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Posts",
  description: "Published posts from Saylani Tech Blog.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const result = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <h1 className="font-display text-5xl">Posts</h1>
      <p className="mt-4 text-lg text-graphite">Every published post from Sanity.</p>
      <div className="mt-8">
        <PostList result={result} />
      </div>
    </div>
  );
}
