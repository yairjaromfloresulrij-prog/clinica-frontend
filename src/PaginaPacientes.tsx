import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { PacienteRow } from "./components/PacienteRow";
import { BuscadorPacientes } from "./components/BuscadorPacientes";
import { ModalConfirmacion } from "./components/ModalConfirmacion";
import { api } from "./lib/axios";
import { extraerMensajeError } from "./lib/errorHandler";
import { create, remove } from "./services/pacientes";
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
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [estado, setEstado] = useState<EstadoPaciente>("activo");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  const [pacienteAEliminar, setPacienteAEliminar] = useState<string | null>(
    null,
  );

  const [eliminando, setEliminando] = useState(false);

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
    const textoBusqueda = busqueda.toLowerCase();

    const coincideBusqueda =
      paciente.nombre.toLowerCase().includes(textoBusqueda) ||
      paciente.apellido.toLowerCase().includes(textoBusqueda) ||
      paciente.email.toLowerCase().includes(textoBusqueda);

    const coincideEstado =
      estadoFiltro === "Todos" || paciente.estado === estadoFiltro;

    return coincideBusqueda && coincideEstado;
  });

  const cambiarEstado = (id: string, nuevoEstado: EstadoPaciente) => {
    setPacientes((prev) =>
      prev.map((paciente) =>
        paciente.id === id ? { ...paciente, estado: nuevoEstado } : paciente,
      ),
    );
  };

  const eliminarPaciente = (id: string) => {
    setPacienteAEliminar(id);
  };

  const confirmarEliminacion = async () => {
    if (!pacienteAEliminar) {
      return;
    }

    setEliminando(true);

    try {
      await remove(pacienteAEliminar);

      setPacientes((prev) =>
        prev.filter((paciente) => paciente.id !== pacienteAEliminar),
      );

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pacientes</h1>

        <p className="text-gray-600">Gestión de pacientes de la clínica</p>
      </div>

      <BuscadorPacientes value={busqueda} onChange={setBusqueda} />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setEstadoFiltro("Todos")}
          className="rounded-lg border px-4 py-2"
        >
          Todos
        </button>

        <button
          type="button"
          onClick={() => setEstadoFiltro("activo")}
          className="rounded-lg border px-4 py-2"
        >
          Activos
        </button>

        <button
          type="button"
          onClick={() => setEstadoFiltro("inactivo")}
          className="rounded-lg border px-4 py-2"
        >
          Inactivos
        </button>

        <button
          type="button"
          onClick={() => setEstadoFiltro("en_espera")}
          className="rounded-lg border px-4 py-2"
        >
          En espera
        </button>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Registrar paciente</h2>

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
              const respuesta = await create({
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                telefono: telefono.trim(),
                email: email.trim() || undefined,
                fecha_nacimiento: fechaNacimiento,
              });

              const pacienteCreado: Paciente = {
                id: respuesta.data.id,
                nombre: respuesta.data.nombre,
                apellido: respuesta.data.apellido,
                email: respuesta.data.email,
                telefono: respuesta.data.telefono,
                especialidadAsignada: "Sin asignar",
                ultimaCita: "Sin cita",
                estado,
              };

              setPacientes((prev) => [...prev, pacienteCreado]);

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
            <label className="mb-1 block text-sm font-medium">Nombre</label>

            <input
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Nombre"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Apellido</label>

            <input
              type="text"
              value={apellido}
              onChange={(event) => setApellido(event.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Apellido"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Teléfono</label>

            <input
              type="text"
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Teléfono"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
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
            <label className="mb-1 block text-sm font-medium">Estado</label>

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

          {error && (
            <p className="md:col-span-2 text-sm text-red-600">{error}</p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Registrar paciente
            </button>
          </div>
        </form>
      </div>

      {cargando ? (
        <p>Cargando pacientes...</p>
      ) : pacientesFiltrados.length === 0 ? (
        <p>No hay pacientes que coincidan con la búsqueda.</p>
      ) : (
        <div className="space-y-3">
          {pacientesFiltrados.map((paciente) => (
            <PacienteRow
              key={paciente.id}
              paciente={paciente}
              onChangeEstado={cambiarEstado}
              onEliminar={eliminarPaciente}
            />
          ))}
        </div>
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
  );
}
