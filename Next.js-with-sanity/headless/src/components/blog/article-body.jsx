import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { SanityImage } from "@/components/blog/sanity-image";

const components = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 font-display text-3xl">{children}</h2>,
    normal: ({ children }) => <p className="mt-5 text-lg leading-8">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = href.startsWith("http");
      if (external) {
        return (
          <a href={href} className="text-forest underline" target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-forest underline">
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <SanityImage image={value} alt={value.alt || ""} width={1200} height={800} sizes="(min-width: 768px) 42rem, 100vw" />
      </figure>
    ),
  },
};

export function ArticleBody({ value }) {
  if (!Array.isArray(value) || value.length === 0) {
    return <p className="mt-8 text-graphite">This post has no text yet.</p>;
  }

  return <PortableText value={value} components={components} />;
}
