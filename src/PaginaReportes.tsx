import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useApi } from "./hooks/useApi";

interface ReporteEspecialidad {
  especialidad: string;
  cantidad: number;
}

interface Cita {
  id_cita: number;
  id_paciente: number;
  id_medico: number;
  fecha_hora: string;
  estado: string;
}

interface RespuestaReporte {
  data: ReporteEspecialidad[];
}

interface RespuestaCitas {
  data: Cita[];
}

interface CitasPorDia {
  fecha: string;
  cantidad: number;
}

export function PaginaReportes() {
  const {
    data: reporteEspecialidades,
    cargando: cargandoEspecialidades,
    error: errorEspecialidades,
  } = useApi<RespuestaReporte>("/reportes/especialidades");

  const {
    data: respuestaCitas,
    cargando: cargandoCitas,
    error: errorCitas,
  } = useApi<RespuestaCitas>("/citas");

  if (cargandoEspecialidades || cargandoCitas) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

        <div className="h-80 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-80 animate-pulse rounded-lg bg-slate-200" />
      </div>
    );
  }

  if (errorEspecialidades || errorCitas) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reportes</h1>

        <p className="mt-4 text-red-600">{errorEspecialidades ?? errorCitas}</p>
      </div>
    );
  }

  const citas = respuestaCitas?.data ?? [];

  const citasPorDia: CitasPorDia[] = [];

  const hoy = new Date();

  for (let i = 6; i >= 0; i--) {
    const fecha = new Date(hoy);

    fecha.setDate(hoy.getDate() - i);

    const fechaTexto = fecha.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
    });

    let cantidad = 0;

    for (const cita of citas) {
      const fechaCita = new Date(cita.fecha_hora);

      const mismoDia =
        fechaCita.getFullYear() === fecha.getFullYear() &&
        fechaCita.getMonth() === fecha.getMonth() &&
        fechaCita.getDate() === fecha.getDate();

      if (mismoDia) {
        cantidad++;
      }
    }

    citasPorDia.push({
      fecha: fechaTexto,
      cantidad,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reportes</h1>

        <p className="mt-2 text-slate-600">
          Estadísticas y reportes de la clínica.
        </p>
      </div>

      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">
          Médicos por especialidad
        </h2>

        {!reporteEspecialidades || reporteEspecialidades.data.length === 0 ? (
          <p className="text-slate-600">
            No hay datos de especialidades para mostrar.
          </p>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reporteEspecialidades.data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="especialidad" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar dataKey="cantidad" name="Médicos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">
          Citas por día
        </h2>

        {citasPorDia.length === 0 ? (
          <p className="text-slate-600">No hay citas para mostrar.</p>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={citasPorDia}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="fecha" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Line type="monotone" dataKey="cantidad" name="Citas" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}
