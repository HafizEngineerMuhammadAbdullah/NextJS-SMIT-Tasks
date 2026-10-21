import Link from "next/link";

export function EmptyJournal({ title, children }) {
  return (
    <section className="border border-line bg-paper px-6 py-10">
      <h2 className="font-display text-3xl">{title}</h2>
      <div className="mt-4 max-w-xl space-y-3 text-graphite">{children}</div>
      <p className="mt-6">
        <Link href="/studio" className="text-sm tracking-wide text-forest uppercase">
          Open Studio
        </Link>
      </p>
    </section>
  );
}

export function UnconfiguredNotice() {
  return (
    <EmptyJournal title="Connect saylni-blog">
      <p>Add the Sanity project ID to .env.local, restart the dev server, then publish a post in Studio.</p>
    </EmptyJournal>
  );
}

export function QueryError({ message }) {
  return (
    <EmptyJournal title="Could not load posts">
      <p>Check the project ID and that the dataset is named production.</p>
      {message ? <p className="text-sm">{message}</p> : null}
    </EmptyJournal>
  );
}
