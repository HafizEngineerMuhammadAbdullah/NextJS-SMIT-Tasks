import Link from "next/link";

export default function SiteNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-4 font-display text-5xl">That story is not published.</h1>
      <p className="mt-4 text-lg leading-8 text-graphite">
        The slug may be mistyped, or the document may still be a draft.
      </p>
      <Link href="/blog" className="eyebrow mt-8 inline-block text-forest">
        Browse stories
      </Link>
    </div>
  );
}
