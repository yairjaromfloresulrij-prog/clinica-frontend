import { useEffect, useState } from "react";
import { PacienteRow } from "./components/PacienteRow";
import { BuscadorPacientes } from "./components/BuscadorPacientes";
import { api } from "./lib/axios";
import type { EstadoPaciente, Paciente } from "./types/paciente";

export function PaginaPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<"Todos" | EstadoPaciente>(
    "Todos",
  );

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<EstadoPaciente>("activo");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get("/pacientes")
      .then((res) => {
        const pacientesApi: Paciente[] = res.data.data.map(
          (paciente: {
            id_paciente: number;
            nombre: string;
            apellido: string;
            telefono: string;
            email: string;
          }) => ({
            id: paciente.id_paciente.toString(),
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            email: paciente.email,
            telefono: paciente.telefono,
            especialidadAsignada: "Sin asignar",
            ultimaCita: "Sin cita",
            estado: "activo",
          }),
        );

        setPacientes(pacientesApi);
      })
      .catch(() => {
        setError("No se pudieron cargar los pacientes.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const texto = busqueda.toLowerCase();

    const coincideTexto =
      paciente.nombre.toLowerCase().includes(texto) ||
      paciente.apellido.toLowerCase().includes(texto) ||
      paciente.email.toLowerCase().includes(texto);

    const coincideEstado =
      estadoFiltro === "Todos" || paciente.estado === estadoFiltro;

    return coincideTexto && coincideEstado;
  });

  const cambiarEstado = (id: string, estado: EstadoPaciente) => {
    setPacientes((prev) =>
      prev.map((paciente) =>
        paciente.id === id ? { ...paciente, estado } : paciente,
      ),
    );
  };

  const eliminarPaciente = (id: string) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este paciente?",
    );

    if (!confirmar) {
      return;
    }

    setPacientes((prev) => prev.filter((paciente) => paciente.id !== id));
  };

  if (cargando) {
    return (
      <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-slate-600">Cargando pacientes...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Pacientes</h1>

          <p className="mt-1 text-slate-500">
            Gestiona y consulta la información de los pacientes
          </p>
        </header>

        <div className="mb-6">
          <BuscadorPacientes value={busqueda} onChange={setBusqueda} />
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <select
            value={estadoFiltro}
            onChange={(event) =>
              setEstadoFiltro(event.target.value as "Todos" | EstadoPaciente)
            }
            className="rounded-lg border border-slate-300 bg-white px-4 py-2"
          >
            <option value="Todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_espera">En espera</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setBusqueda("");
              setEstadoFiltro("Todos");
            }}
            className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            Limpiar filtros
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!nombre.trim() || !email.trim()) {
              setError("Nombre y email son obligatorios");
              return;
            }

            const nuevoPaciente: Paciente = {
              id: Date.now().toString(),
              nombre: nombre.trim(),
              apellido: apellido.trim(),
              email: email.trim(),
              telefono: "Sin teléfono",
              especialidadAsignada: "Sin asignar",
              ultimaCita: "Sin cita",
              estado,
            };

            setPacientes((prev) => [...prev, nuevoPaciente]);

            setNombre("");
            setApellido("");
            setEmail("");
            setEstado("activo");
            setError("");
          }}
          className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Agregar paciente
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Nombre
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Apellido
              </label>

              <input
                type="text"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Estado
              </label>

              <select
                value={estado}
                onChange={(event) =>
                  setEstado(event.target.value as EstadoPaciente)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="en_espera">En espera</option>
              </select>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="mt-4 rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
          >
            Agregar paciente
          </button>
        </form>

        <p className="mb-4 text-sm text-slate-500">
          {pacientesFiltrados.length} paciente(s) encontrado(s)
        </p>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {pacientesFiltrados.map((paciente) => (
            <PacienteRow
              key={paciente.id}
              paciente={paciente}
              onChangeEstado={cambiarEstado}
              onEliminar={eliminarPaciente}
            />
          ))}
        </div>

        {pacientesFiltrados.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-500">No se encontraron pacientes.</p>
          </div>
        )}
      </div>
    </main>
  );
}
