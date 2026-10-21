import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { SanityImage } from "@/components/blog/sanity-image";
import { UnconfiguredNotice } from "@/components/blog/status";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/text";
import { urlForImage } from "@/sanity/lib/image";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/posts";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const result = await getPostSlugs();
  return (result.data || []).filter(Boolean).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  const post = result.data;

  if (!post) {
    return { title: "Post" };
  }

  const image = urlForImage(post.mainImage, { width: 1200, height: 630 });

  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: image ? [{ url: image, alt: post.mainImage?.alt || post.title }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (result.status === "unconfigured") {
    return (
      <div className="mx-auto max-w-3xl px-5 py-10">
        <UnconfiguredNotice />
      </div>
    );
  }

  if (result.status === "error") {
    throw new Error(result.message || "Unable to load this post.");
  }

  if (!result.data) {
    notFound();
  }

  const post = result.data;

  return (
    <article className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <p className="text-sm">
        <Link href="/blog" className="text-graphite hover:text-ink">
          All posts
        </Link>
      </p>
      <h1 className="mt-4 font-display text-5xl leading-tight">{post.title}</h1>
      {post.publishedAt ? (
        <p className="mt-4 text-sm tracking-wide text-graphite uppercase">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
      ) : null}
      {post.excerpt ? <p className="mt-6 text-xl leading-8 text-graphite">{post.excerpt}</p> : null}
      {post.mainImage?.asset ? (
        <figure className="mt-8 overflow-hidden">
          <SanityImage
            image={post.mainImage}
            alt={post.mainImage.alt || ""}
            width={1400}
            height={800}
            priority
            sizes="(min-width: 768px) 48rem, 100vw"
          />
        </figure>
      ) : null}
      <ArticleBody value={post.body} />
    </article>
  );
}
