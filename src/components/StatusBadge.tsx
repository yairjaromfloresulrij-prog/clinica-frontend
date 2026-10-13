interface StatusBadgeProps {
  activo: boolean;
}

const colorPorEstado = {
  activo: "bg-emerald-100 text-emerald-700",
  mantenimiento: "bg-rose-100 text-rose-700",
};

export function StatusBadge({ activo }: StatusBadgeProps) {
  const estado = activo ? "activo" : "mantenimiento";

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colorPorEstado[estado]}`}
    >
      {activo ? "Sistema Operativo" : "Modo Mantenimiento"}
    </span>
  );
}
