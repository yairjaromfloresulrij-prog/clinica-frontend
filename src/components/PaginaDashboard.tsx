import { useState } from "react";
import { MetricCard } from "./MetricCard";
import { StatusBadge } from "./StatusBadge";
import type { Metrica } from "../types";

export function PaginaDashboard() {
  const [pacientes, setPacientes] = useState(128);
  const [citasHoy] = useState<Metrica>({
    id: "citas-hoy",
    titulo: "Citas Hoy",
    valor: 24,
    descripcion: "4 más que ayer",
    tendencia: "positiva",
    icono: "📅",
  });

  const [consultasPendientes] = useState<Metrica>({
    id: "consultas-pendientes",
    titulo: "Consultas Pendientes",
    valor: 8,
    descripcion: "2 menos que ayer",
    tendencia: "positiva",
    icono: "📋",
  });

  const [disponibilidad] = useState<Metrica>({
    id: "disponibilidad",
    titulo: "Disponibilidad",
    valor: "92%",
    descripcion: "Capacidad disponible",
    tendencia: "neutra",
    icono: "🏥",
  });

  const [mantenimiento, setMantenimiento] = useState(false);

  const incrementarPacientes = () => {
    setPacientes((prev) => prev + 1);
  };

  const decrementarPacientes = () => {
    setPacientes((prev) => prev - 1);
  };

  const metricaPacientes: Metrica = {
    id: "pacientes",
    titulo: "Pacientes",
    valor: pacientes,
    descripcion: "Total de pacientes registrados",
    tendencia: "positiva",
    icono: "👥",
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Clínica Salud Integral
            </h1>

            <p className="mt-1 text-slate-500">Dashboard principal</p>
          </div>

          <StatusBadge activo={!mantenimiento} />
        </header>

        {mantenimiento && (
          <div className="mb-6 rounded-lg bg-rose-100 p-4 text-rose-700">
            ⚠️ El sistema se encuentra en modo mantenimiento.
          </div>
        )}

        <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard metrica={metricaPacientes} />
          <MetricCard metrica={citasHoy} />
          <MetricCard metrica={consultasPendientes} />
          <MetricCard metrica={disponibilidad} />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Controles del Dashboard
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={incrementarPacientes}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
            >
              + Paciente
            </button>

            <button
              onClick={decrementarPacientes}
              className="rounded-lg bg-rose-600 px-4 py-2 font-medium text-white hover:bg-rose-700"
            >
              - Paciente
            </button>

            <button
              onClick={() => setMantenimiento((prev) => !prev)}
              className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-800"
            >
              {mantenimiento
                ? "Desactivar mantenimiento"
                : "Activar mantenimiento"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
