export function SkeletonPacienteRow() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        {/* Nombre */}
        <div className="h-6 w-40 rounded bg-slate-200"></div>

        {/* Email */}
        <div className="h-4 w-56 rounded bg-slate-200"></div>

        {/* Teléfono */}
        <div className="h-4 w-40 rounded bg-slate-200"></div>

        {/* Especialidad */}
        <div className="h-4 w-48 rounded bg-slate-200"></div>

        {/* Última cita */}
        <div className="h-4 w-36 rounded bg-slate-200"></div>

        {/* Estado */}
        <div className="h-6 w-20 rounded-full bg-slate-200"></div>

        {/* Ver detalle */}
        <div className="h-4 w-24 rounded bg-slate-200"></div>

        {/* Selector de estado */}
        <div className="h-10 w-full rounded-lg bg-slate-200"></div>

        {/* Botón eliminar */}
        <div className="h-10 w-24 rounded-lg bg-slate-200"></div>
      </div>
    </div>
  );
}
