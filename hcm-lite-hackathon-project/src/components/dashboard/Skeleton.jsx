export default function DashboardSkeleton() {
  const block = "animate-pulse rounded-[20px] bg-slate-200/70";
  return (
    <div aria-busy="true" aria-label="Loading dashboard" className="space-y-5">
      <div className={`${block} h-40`} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{[0, 1, 2, 3].map((i) => <div key={i} className={`${block} h-36`} />)}</div>
      <div className="grid gap-5 lg:grid-cols-3"><div className={`${block} h-72 lg:col-span-2`} /><div className={`${block} h-72`} /></div>
    </div>
  );
}
