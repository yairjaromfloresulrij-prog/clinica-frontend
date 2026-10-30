import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getHistorial } from "./services/citas";
import type { EstadoCita } from "./services/citas";
import type { Cita } from "./types/cita";

export function PaginaHistorialCitas() {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginaInicial = Number(searchParams.get("pagina")) || 1;

  const estadoInicial = (searchParams.get("estado") as EstadoCita) || "Todos";

  const [pagina, setPagina] = useState(paginaInicial);
  const [estado, setEstado] = useState<EstadoCita>(estadoInicial);

  const [citas, setCitas] = useState<Cita[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setCargando(true);

    getHistorial(pagina, estado, controller.signal)
      .then((respuesta) => {
        setCitas(respuesta.data.data);
        setTotal(respuesta.data.total);
        setTotalPaginas(respuesta.data.totalPaginas);
      })
      .finally(() => {
        setCargando(false);
      });

    return () => controller.abort();
  }, [pagina, estado]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Historial de Citas</h1>

        <p className="text-gray-500">
          Consulta las citas registradas en el sistema.
        </p>
      </div>

      <div>
        <label className="mr-2 font-medium">Estado:</label>

        <select
          value={estado}
          onChange={(e) => {
            const nuevoEstado = e.target.value as EstadoCita;

            setEstado(nuevoEstado);
            setPagina(1);

            setSearchParams({
              pagina: "1",
              estado: nuevoEstado,
            });
          }}
          className="rounded border px-3 py-2"
        >
          <option value="Todos">Todos</option>
          <option value="Programada">Programada</option>
          <option value="Completada">Completada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      <div>
        {cargando ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, indice) => (
              <div
                key={indice}
                className="h-12 animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Paciente</th>
                  <th className="p-3">Médico</th>
                  <th className="p-3">Fecha y hora</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>

              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id_cita} className="border-b">
                    <td className="p-3">{cita.id_cita}</td>

                    <td className="p-3">{cita.id_paciente}</td>

                    <td className="p-3">{cita.id_medico}</td>

                    <td className="p-3">
                      {new Date(cita.fecha_hora).toLocaleString()}
                    </td>

                    <td className="p-3">{cita.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const nuevaPagina = pagina - 1;

              setPagina(nuevaPagina);

              setSearchParams({
                pagina: String(nuevaPagina),
                estado,
              });
            }}
            disabled={pagina === 1 || cargando}
            className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
          >
            Anterior
          </button>

          <span>
            Página {pagina} de {totalPaginas} — {total} registros
          </span>

          <button
            onClick={() => {
              const nuevaPagina = pagina + 1;

              setPagina(nuevaPagina);

              setSearchParams({
                pagina: String(nuevaPagina),
                estado,
              });
            }}
            disabled={pagina >= totalPaginas || cargando}
            className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
