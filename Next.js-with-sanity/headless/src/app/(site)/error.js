"use client";

import { useEffect } from "react";

export default function SiteError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Something interrupted the page</p>
      <h1 className="mt-4 font-display text-5xl">The story could not be composed.</h1>
      <p className="mt-4 text-lg leading-8 text-graphite">
        Try the page again. If the problem continues, check the Sanity project settings and the server log.
      </p>
      <button type="button" onClick={() => reset()} className="mt-8 h-11 rounded-full bg-forest px-5 text-sm text-[#F7F4ED]">
        Try again
      </button>
    </div>
  );
}
