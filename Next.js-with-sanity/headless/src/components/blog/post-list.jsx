import { ArticleCard } from "@/components/blog/article-card";
import { QueryError, UnconfiguredNotice } from "@/components/blog/status";

export function PostList({ result }) {
  if (result.status === "unconfigured") {
    return <UnconfiguredNotice />;
  }

  if (result.status === "error") {
    return <QueryError message={result.message} />;
  }

  if (!result.data.length) {
    return (
      <section className="border border-line bg-paper px-6 py-10">
        <h2 className="font-display text-3xl">No posts yet</h2>
        <p className="mt-4 text-graphite">Open Studio, create a post, and press Publish. Drafts stay hidden.</p>
      </section>
    );
  }

  return (
    <div>
      {result.data.map((post) => (
        <ArticleCard key={post._id} post={post} />
      ))}
    </div>
  );
}
