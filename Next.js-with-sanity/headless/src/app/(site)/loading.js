import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingIssue() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading the journal</p>
      <Skeleton className="h-3 w-40" />
      <Skeleton className="mt-6 h-16 w-2/3" />
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-80 lg:col-span-7" />
        <div className="space-y-4 lg:col-span-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
