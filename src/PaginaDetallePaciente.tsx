import { useNavigate, useParams } from "react-router-dom";
import { pacientes } from "./data/patients";
import { PaginaNotFound } from "./PaginaNotFound";

export function PaginaDetallePaciente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const paciente = pacientes.find((paciente) => paciente.id === id);

  if (!paciente) {
    return <PaginaNotFound />;
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-md">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-800 hover:bg-slate-300"
      >
        ← Volver
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          {paciente.nombre} {paciente.apellido}
        </h1>

        <p className="mt-1 text-slate-500">Detalle del paciente</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-slate-500">ID</p>
          <p className="text-slate-900">{paciente.id}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">Estado</p>
          <p className="text-slate-900">{paciente.estado}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">Email</p>
          <p className="text-slate-900">{paciente.email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">Teléfono</p>
          <p className="text-slate-900">{paciente.telefono}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Especialidad asignada
          </p>
          <p className="text-slate-900">{paciente.especialidadAsignada}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">Última cita</p>
          <p className="text-slate-900">{paciente.ultimaCita}</p>
        </div>
      </div>
    </div>
  );
}
