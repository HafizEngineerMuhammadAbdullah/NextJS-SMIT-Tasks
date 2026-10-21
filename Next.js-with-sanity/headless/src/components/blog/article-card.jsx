import Link from "next/link";
import { SanityImage } from "@/components/blog/sanity-image";
import { formatDate } from "@/lib/text";

export function ArticleCard({ post }) {
  if (!post?.slug) {
    return null;
  }

  return (
    <article className="border-t border-line py-8">
      <p className="text-xs tracking-[0.16em] text-graphite uppercase">{formatDate(post.publishedAt) || "Draft date"}</p>
      <h2 className="mt-2 font-display text-3xl leading-tight">
        <Link href={`/blog/${post.slug}`} className="hover:text-forest">
          {post.title}
        </Link>
      </h2>
      {post.excerpt ? <p className="mt-3 max-w-2xl leading-7 text-graphite">{post.excerpt}</p> : null}
      {post.mainImage?.asset ? (
        <Link href={`/blog/${post.slug}`} className="mt-5 block max-w-3xl overflow-hidden">
          <SanityImage
            image={post.mainImage}
            alt={post.mainImage.alt || ""}
            width={1200}
            height={700}
            className="aspect-[16/9]"
            sizes="(min-width: 768px) 48rem, 100vw"
          />
        </Link>
      ) : null}
    </article>
  );
}
