import type { EstadoPaciente, Paciente } from "../types/paciente";
import { StatusBadge } from "./StatusBadge";

interface PacienteRowProps {
  paciente: Paciente;
  onChangeEstado: (id: string, estado: EstadoPaciente) => void;
  onEliminar: (id: string) => void;
}

export function PacienteRow({
  paciente,
  onChangeEstado,
  onEliminar,
}: PacienteRowProps) {
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

        <select
          value={paciente.estado}
          onChange={(event) =>
            onChangeEstado(paciente.id, event.target.value as EstadoPaciente)
          }
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="en_espera">En espera</option>
        </select>

        <button
          type="button"
          onClick={() => onEliminar(paciente.id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
