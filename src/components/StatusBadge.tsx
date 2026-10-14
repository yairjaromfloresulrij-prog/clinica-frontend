import type { EstadoPaciente } from "../types/paciente";

interface StatusBadgeProps {
  estado: EstadoPaciente;
}

const colorPorEstado = {
  activo: "bg-emerald-100 text-emerald-700",
  inactivo: "bg-rose-100 text-rose-700",
  en_espera: "bg-amber-100 text-amber-700",
};

export function StatusBadge({ estado }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colorPorEstado[estado]}`}
    >
      {estado}
    </span>
  );
}
