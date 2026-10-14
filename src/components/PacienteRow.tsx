import type { Paciente } from "../types/paciente";
import { StatusBadge } from "./StatusBadge";

interface PacienteRowProps {
  paciente: Paciente;
}

export function PacienteRow({ paciente }: PacienteRowProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {paciente.nombre} {paciente.apellido}
          </h3>
        </div>

        <p className="text-sm text-slate-600">Email: {paciente.email}</p>

        <p className="text-sm text-slate-600">Teléfono: {paciente.telefono}</p>

        <p className="text-sm text-slate-600">
          Especialidad: {paciente.especialidadAsignada}
        </p>

        <p className="text-sm text-slate-600">
          Última cita: {paciente.ultimaCita}
        </p>

        <div>
          <StatusBadge estado={paciente.estado} />
        </div>
      </div>
    </div>
  );
}
