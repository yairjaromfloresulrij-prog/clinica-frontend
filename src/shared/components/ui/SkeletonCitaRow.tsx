export function SkeletonCitaRow() {
  return (
    <div className="grid grid-cols-5 gap-4 rounded-lg border-b p-3 animate-pulse">
      <div className="h-5 w-12 rounded bg-slate-200"></div>
      <div className="h-5 w-20 rounded bg-slate-200"></div>
      <div className="h-5 w-20 rounded bg-slate-200"></div>
      <div className="h-5 w-32 rounded bg-slate-200"></div>
      <div className="h-5 w-24 rounded-full bg-slate-200"></div>
    </div>
  );
}
