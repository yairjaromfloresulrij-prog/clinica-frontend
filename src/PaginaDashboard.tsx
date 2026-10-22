import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetricCard } from "./components/MetricCard";
import { StatusBadge } from "./components/StatusBadge";
import { api } from "./lib/axios";
import type { Metrica } from "./types";

type EstadoCita = "Programada" | "Cancelada" | "Realizada";

type Cita = {
  estado: EstadoCita;
};

export function PaginaDashboard() {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState(0);
  const [cargandoPacientes, setCargandoPacientes] = useState(true);
  const [errorPacientes, setErrorPacientes] = useState(false);

  const [medicos, setMedicos] = useState(0);
  const [cargandoMedicos, setCargandoMedicos] = useState(true);
  const [errorMedicos, setErrorMedicos] = useState(false);

  const [citasProgramadas, setCitasProgramadas] = useState(0);
  const [cargandoCitas, setCargandoCitas] = useState(true);
  const [errorCitas, setErrorCitas] = useState(false);

  const [completadas, setCompletadas] = useState(0);

  useEffect(() => {
    api
      .get("/pacientes")
      .then((res) => {
        setPacientes(res.data.data.length);
      })
      .catch(() => {
        setErrorPacientes(true);
      })
      .finally(() => {
        setCargandoPacientes(false);
      });
  }, []);

  useEffect(() => {
    api
      .get("/medicos")
      .then((res) => {
        setMedicos(res.data.data.length);
      })
      .catch(() => {
        setErrorMedicos(true);
      })
      .finally(() => {
        setCargandoMedicos(false);
      });
  }, []);

  useEffect(() => {
    api
      .get("/citas")
      .then((res) => {
        const citas: Cita[] = res.data.data;

        const programadas = citas.filter(
          (cita) => cita.estado === "Programada",
        );

        const realizadas = citas.filter((cita) => cita.estado === "Realizada");

        setCitasProgramadas(programadas.length);
        setCompletadas(realizadas.length);
      })
      .catch(() => {
        setErrorCitas(true);
      })
      .finally(() => {
        setCargandoCitas(false);
      });
  }, []);

  const metricaPacientes: Metrica = {
    id: "pacientes",
    titulo: "Pacientes",
    valor: cargandoPacientes ? "..." : errorPacientes ? "Error" : pacientes,
    descripcion: "Pacientes registrados",
    tendencia: "positiva",
    icono: "👥",
  };

  const metricaMedicos: Metrica = {
    id: "medicos",
    titulo: "Médicos",
    valor: cargandoMedicos ? "..." : errorMedicos ? "Error" : medicos,
    descripcion: "Médicos registrados",
    tendencia: "positiva",
    icono: "👨‍⚕️",
  };

  const metricaCitasProgramadas: Metrica = {
    id: "citas-programadas",
    titulo: "Citas Programadas",
    valor: cargandoCitas ? "..." : errorCitas ? "Error" : citasProgramadas,
    descripcion: "Citas con estado programado",
    tendencia: "positiva",
    icono: "📅",
  };

  const metricaCompletadas: Metrica = {
    id: "completadas",
    titulo: "Completadas Hoy",
    valor: cargandoCitas ? "..." : errorCitas ? "Error" : completadas,
    descripcion: "Citas realizadas",
    tendencia: "positiva",
    icono: "✅",
  };

  const [mantenimiento, setMantenimiento] = useState(false);

  const incrementarPacientes = () => {
    setPacientes((prev) => prev + 1);
  };

  const decrementarPacientes = () => {
    setPacientes((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard de Clínica
          </h1>

          <p className="mt-2 text-slate-600">Resumen general de la clínica</p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard metrica={metricaPacientes} />
          <MetricCard metrica={metricaMedicos} />
          <MetricCard metrica={metricaCitasProgramadas} />
          <MetricCard metrica={metricaCompletadas} />
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
              onClick={() => setMantenimiento((prev) => !prev)}
              className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300"
            >
              Mantenimiento
            </button>

            <button
              type="button"
              onClick={incrementarPacientes}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
            >
              + Paciente
            </button>

            <button
              type="button"
              onClick={decrementarPacientes}
              className="rounded-lg bg-rose-600 px-4 py-2 font-medium text-white hover:bg-rose-700"
            >
              - Paciente
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
