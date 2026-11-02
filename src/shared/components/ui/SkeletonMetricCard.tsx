export function SkeletonMetricCard() {
  return (
    <div className="animate-pulse rounded-xl bg-white p-6 shadow-md">
      {/* Título e ícono */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 rounded bg-slate-200"></div>
        <div className="h-8 w-8 rounded-full bg-slate-200"></div>
      </div>

      {/* Valor */}
      <div className="mt-4 h-9 w-20 rounded bg-slate-200"></div>

      {/* Descripción */}
      <div className="mt-3 h-4 w-36 rounded bg-slate-200"></div>
    </div>
  );
}
