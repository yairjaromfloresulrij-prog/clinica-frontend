import { useEffect } from "react";
import toast from "react-hot-toast";

import { extraerMensajeError } from "./lib/errorHandler";
import { useCitasStore } from "./stores/citasStore";
import type { EstadoCita } from "./services/citas";

export function PaginaCitas() {
  const citas = useCitasStore((state) => state.citas);

  const cargando = useCitasStore((state) => state.cargando);

  const cargar = useCitasStore((state) => state.cargar);
  const actualizarEstado = useCitasStore((state) => state.actualizarEstado);

  useEffect(() => {
    cargar().catch((err: unknown) => {
      toast.error(extraerMensajeError(err));
    });
  }, [cargar]);

  const cambiarEstado = async (id: number, nuevoEstado: EstadoCita) => {
    try {
      await actualizarEstado(String(id), nuevoEstado);

      toast.success("Estado actualizado");
    } catch (err: unknown) {
      toast.error(extraerMensajeError(err));
    }
  };

  if (cargando && citas.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">Cargando citas...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Citas</h1>

          <p className="mt-2 text-slate-600">Gestión de estados de las citas</p>
        </header>

        <section className="space-y-4">
          {citas.map((cita) => (
            <article
              key={cita.id_cita}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    Cita #{cita.id_cita}
                  </p>

                  <p className="text-sm text-slate-600">
                    Paciente: {cita.id_paciente}
                  </p>

                  <p className="text-sm text-slate-600">
                    Médico: {cita.id_medico}
                  </p>

                  <p className="text-sm text-slate-600">
                    {new Date(cita.fecha_hora).toLocaleString()}
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-700">
                    Estado: {cita.estado}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => cambiarEstado(cita.id_cita, "Completada")}
                    disabled={cita.estado === "Completada" || cargando}
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Completar
                  </button>

                  <button
                    type="button"
                    onClick={() => cambiarEstado(cita.id_cita, "Cancelada")}
                    disabled={cita.estado === "Cancelada" || cargando}
                    className="rounded-lg bg-rose-600 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
