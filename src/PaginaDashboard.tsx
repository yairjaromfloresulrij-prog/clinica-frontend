import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { MetricCard } from "./components/MetricCard";
import { StatusBadge } from "./components/StatusBadge";
import { SkeletonMetricCard } from "./shared/components/ui/SkeletonMetricCard";
import { Spinner } from "./shared/components/ui/Spinner";
import { AlertaBanner } from "./shared/components/ui/AlertaBanner";
import type { Metrica } from "./types";
import { usePacientesStore } from "./stores/pacientesStore";
import { useCitasStore } from "./stores/citasStore";

export function PaginaDashboard() {
  const navigate = useNavigate();

  const pacientes = usePacientesStore((state) => state.pacientes);
  const cargarPacientes = usePacientesStore((state) => state.cargar);
  const cargandoPacientes = usePacientesStore((state) => state.cargando);
  const errorPacientes = usePacientesStore((state) => state.error);

  const citas = useCitasStore((state) => state.citas);
  const cargarCitas = useCitasStore((state) => state.cargar);
  const cargandoCitas = useCitasStore((state) => state.cargando);

  const [mantenimiento, setMantenimiento] = useState(false);

  // Métricas calculadas y memorizadas
  const metricasCalculadas = useMemo(() => {
    const totalPacientes = pacientes.length;
    const totalCitas = citas.length;

    const completadas = citas.filter(
      (cita) => cita.estado === "Completada",
    ).length;

    const porcentajeCompletadas =
      totalCitas > 0 ? Math.round((completadas / totalCitas) * 100) : 0;

    return {
      totalPacientes,
      totalCitas,
      completadas,
      porcentajeCompletadas,
    };
  }, [pacientes, citas]);

  // Actualizar los datos de ambos stores
  const actualizarDatos = useCallback(async () => {
    await Promise.all([cargarPacientes(), cargarCitas()]);
  }, [cargarPacientes, cargarCitas]);

  const metricaPacientes: Metrica = {
    id: "pacientes",
    titulo: "Pacientes",
    valor: errorPacientes ? "Error" : metricasCalculadas.totalPacientes,
    descripcion: "Pacientes registrados",
    tendencia: "positiva",
    icono: "👥",
  };

  const metricaMedicos: Metrica = {
    id: "medicos",
    titulo: "Médicos",
    valor: "No disponible",
    descripcion: "Médicos registrados",
    tendencia: "positiva",
    icono: "👨‍⚕️",
  };

  const metricaCitasProgramadas: Metrica = {
    id: "citas-programadas",
    titulo: "Citas Programadas",
    valor: metricasCalculadas.totalCitas,
    descripcion: "Total de citas registradas",
    tendencia: "positiva",
    icono: "📅",
  };

  const metricaCompletadas: Metrica = {
    id: "completadas",
    titulo: "Completadas",
    valor: metricasCalculadas.completadas,
    descripcion: "Citas realizadas",
    tendencia: "positiva",
    icono: "✅",
  };

  const metricaPorcentaje: Metrica = {
    id: "porcentaje",
    titulo: "Citas completadas",
    valor: `${metricasCalculadas.porcentajeCompletadas}%`,
    descripcion: "Porcentaje sobre el total de citas",
    tendencia: "positiva",
    icono: "📊",
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard de Clínica
            </h1>
            <p className="mt-2 text-slate-600">Resumen general de la clínica</p>
          </div>

          <button
            type="button"
            onClick={actualizarDatos}
            disabled={cargandoPacientes || cargandoCitas}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cargandoPacientes || cargandoCitas
              ? "Actualizando..."
              : "Actualizar datos"}
          </button>
        </header>

        {errorPacientes && (
          <AlertaBanner
            tipo="error"
            mensaje={`Error al cargar pacientes: ${errorPacientes}`}
          />
        )}

        {cargandoPacientes && cargandoCitas && <Spinner />}

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cargandoPacientes ? (
            <SkeletonMetricCard />
          ) : (
            <MetricCard metrica={metricaPacientes} />
          )}

          <MetricCard metrica={metricaMedicos} />

          {cargandoCitas ? (
            <>
              <SkeletonMetricCard />
              <SkeletonMetricCard />
              <SkeletonMetricCard />
            </>
          ) : (
            <>
              <MetricCard metrica={metricaCitasProgramadas} />
              <MetricCard metrica={metricaCompletadas} />
              <MetricCard metrica={metricaPorcentaje} />
            </>
          )}
        </section>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Acciones rápidas
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/pacientes")}
              className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
            >
              Ver pacientes
            </button>

            <button
              type="button"
              onClick={() => navigate("/citas")}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
            >
              Ver citas
            </button>

            <button
              type="button"
              onClick={() => navigate("/reportes")}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
            >
              Ver reportes
            </button>

            <button
              type="button"
              onClick={() => setMantenimiento((prev) => !prev)}
              className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300"
            >
              Mantenimiento
            </button>
          </div>

          {mantenimiento && (
            <div className="mt-4">
              <StatusBadge estado="en_espera" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
