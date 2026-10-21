const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const siteConfig = {
  name: "Saylani Tech Blog",
  shortName: "Saylani",
  sanityProjectName: "saylni-blog",
  sanityProjectId: "o2zj2owv",
  tagline: "Stories, perspectives, and things worth thinking about.",
  description:
    "Saylani Tech Blog is a simple student blog. Posts are written in Sanity and shown on the web with Next.js.",
  url: siteUrl.replace(/\/$/, ""),
  issueLabel: "Vol. 01",
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Posts" },
    { href: "/about", label: "About" },
    { href: "/studio", label: "Studio" },
  ],
};

export { siteConfig };
