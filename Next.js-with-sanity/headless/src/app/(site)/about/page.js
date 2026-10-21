import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "About",
  description: "A simple blog published from Sanity.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <h1 className="font-display text-5xl">About</h1>
      <div className="mt-6 space-y-4 text-lg leading-8">
        <p>
          {siteConfig.name} is a simple blog. Posts are written in Sanity Studio and shown on this website after they are
          published.
        </p>
        <p>
          The Sanity project is <span className="text-ink">{siteConfig.sanityProjectName}</span>. The only content type is
          a post: title, slug, summary, cover image, date, and body.
        </p>
      </div>
    </div>
  );
}
