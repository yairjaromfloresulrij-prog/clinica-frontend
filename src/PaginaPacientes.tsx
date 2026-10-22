import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { PacienteRow } from "./components/PacienteRow";
import { BuscadorPacientes } from "./components/BuscadorPacientes";
import { ModalConfirmacion } from "./components/ModalConfirmacion";
import { extraerMensajeError } from "./lib/errorHandler";
import { usePacientesStore } from "./stores/pacientesStore";
import { useFiltrosStore } from "./stores/filtrosStore";
import type { EstadoPaciente } from "./types/paciente";

export function PaginaPacientes() {
  const pacientes = usePacientesStore((state) => state.pacientes);

  const cargando = usePacientesStore((state) => state.cargando);

  const errorStore = usePacientesStore((state) => state.error);

  const cargar = usePacientesStore((state) => state.cargar);

  const crear = usePacientesStore((state) => state.crear);

  const eliminar = usePacientesStore((state) => state.eliminar);

  const cambiarEstadoStore = usePacientesStore((state) => state.cambiarEstado);

  const queryPacientes = useFiltrosStore((state) => state.queryPacientes);

  const setQueryPacientes = useFiltrosStore((state) => state.setQueryPacientes);

  const estadoPacienteFiltro = useFiltrosStore(
    (state) => state.estadoPacienteFiltro,
  );

  const setEstadoPaciente = useFiltrosStore((state) => state.setEstadoPaciente);

  const [nombre, setNombre] = useState("");

  const [apellido, setApellido] = useState("");

  const [email, setEmail] = useState("");

  const [telefono, setTelefono] = useState("");

  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [estado, setEstado] = useState<EstadoPaciente>("activo");

  const [error, setError] = useState("");

  const [pacienteAEliminar, setPacienteAEliminar] = useState<string | null>(
    null,
  );

  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    cargar(queryPacientes).catch((err: unknown) => {
      toast.error(extraerMensajeError(err));
    });
  }, [cargar, queryPacientes]);

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const textoBusqueda = queryPacientes.toLowerCase();

    const coincideBusqueda =
      paciente.nombre.toLowerCase().includes(textoBusqueda) ||
      paciente.apellido.toLowerCase().includes(textoBusqueda) ||
      paciente.email.toLowerCase().includes(textoBusqueda);

    const coincideEstado =
      estadoPacienteFiltro === "Todos" ||
      paciente.estado === estadoPacienteFiltro;

    return coincideBusqueda && coincideEstado;
  });

  const eliminarPaciente = (id: string) => {
    setPacienteAEliminar(id);
  };

  const confirmarEliminacion = async () => {
    if (!pacienteAEliminar) {
      return;
    }

    setEliminando(true);

    try {
      await eliminar(pacienteAEliminar);

      toast.success("Paciente eliminado");

      setPacienteAEliminar(null);
    } catch (err: unknown) {
      const mensaje = extraerMensajeError(err);

      toast.error(mensaje);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Pacientes</h1>

          <p className="mt-2 text-slate-600">
            Gestión de pacientes de la clínica
          </p>
        </header>

        <section className="mb-6">
          <BuscadorPacientes
            value={queryPacientes}
            onChange={setQueryPacientes}
          />
        </section>

        <section className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setEstadoPaciente("Todos")}
            className="rounded-lg border bg-white px-4 py-2 font-medium"
          >
            Todos
          </button>

          <button
            type="button"
            onClick={() => setEstadoPaciente("activo")}
            className="rounded-lg border bg-white px-4 py-2 font-medium"
          >
            Activos
          </button>

          <button
            type="button"
            onClick={() => setEstadoPaciente("inactivo")}
            className="rounded-lg border bg-white px-4 py-2 font-medium"
          >
            Inactivos
          </button>

          <button
            type="button"
            onClick={() => setEstadoPaciente("en_espera")}
            className="rounded-lg border bg-white px-4 py-2 font-medium"
          >
            En espera
          </button>
        </section>

        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Registrar paciente
          </h2>

          <form
            onSubmit={async (event) => {
              event.preventDefault();

              if (
                !nombre.trim() ||
                !apellido.trim() ||
                !telefono.trim() ||
                !fechaNacimiento
              ) {
                setError(
                  "Nombre, apellido, teléfono y fecha de nacimiento son obligatorios",
                );

                return;
              }

              try {
                await crear({
                  nombre: nombre.trim(),
                  apellido: apellido.trim(),
                  telefono: telefono.trim(),
                  email: email.trim() || undefined,
                  fecha_nacimiento: fechaNacimiento,
                });

                setNombre("");
                setApellido("");
                setEmail("");
                setTelefono("");
                setFechaNacimiento("");
                setEstado("activo");
                setError("");

                toast.success("Paciente registrado");
              } catch (err: unknown) {
                const mensaje = extraerMensajeError(err);

                setError(mensaje);

                toast.error(mensaje);
              }
            }}
            className="grid gap-4 md:grid-cols-2"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Nombre
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="w-full rounded-lg border px-3 py-2"
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
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Teléfono
              </label>

              <input
                type="text"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                className="w-full rounded-lg border px-3 py-2"
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
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Fecha de nacimiento
              </label>

              <input
                type="date"
                value={fechaNacimiento}
                onChange={(event) => setFechaNacimiento(event.target.value)}
                className="w-full rounded-lg border px-3 py-2"
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
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="activo">Activo</option>

                <option value="inactivo">Inactivo</option>

                <option value="en_espera">En espera</option>
              </select>
            </div>

            {(error || errorStore) && (
              <p className="md:col-span-2 text-sm text-red-600">
                {error || errorStore}
              </p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={cargando}
                className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-50"
              >
                {cargando ? "Guardando..." : "Registrar paciente"}
              </button>
            </div>
          </form>
        </section>

        {cargando && pacientes.length === 0 ? (
          <p className="text-slate-600">Cargando pacientes...</p>
        ) : pacientesFiltrados.length === 0 ? (
          <p className="text-slate-600">
            No hay pacientes que coincidan con los filtros.
          </p>
        ) : (
          <section className="space-y-3">
            {pacientesFiltrados.map((paciente) => (
              <PacienteRow
                key={paciente.id}
                paciente={paciente}
                onChangeEstado={cambiarEstadoStore}
                onEliminar={eliminarPaciente}
              />
            ))}
          </section>
        )}

        <ModalConfirmacion
          abierto={pacienteAEliminar !== null}
          titulo="Eliminar paciente"
          mensaje="¿Estás seguro de que quieres eliminar este paciente? Esta acción no se puede deshacer."
          textoConfirmar="Eliminar"
          textoCancelar="Cancelar"
          cargando={eliminando}
          onConfirmar={confirmarEliminacion}
          onCancelar={() => {
            if (!eliminando) {
              setPacienteAEliminar(null);
            }
          }}
        />
      </div>
    </main>
  );
}
