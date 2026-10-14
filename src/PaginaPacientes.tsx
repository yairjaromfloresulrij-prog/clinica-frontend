import { useState } from "react";
import { PacienteRow } from "./components/PacienteRow";
import { BuscadorPacientes } from "./components/BuscadorPacientes";
import { pacientes } from "./data/patients";

export function PaginaPacientes() {
  const [busqueda, setBusqueda] = useState("");

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const texto = busqueda.toLowerCase();

    return (
      paciente.nombre.toLowerCase().includes(texto) ||
      paciente.apellido.toLowerCase().includes(texto) ||
      paciente.email.toLowerCase().includes(texto)
    );
  });

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

        <p className="mb-4 text-sm text-slate-500">
          {pacientesFiltrados.length}{" "}
          {pacientesFiltrados.length === 1 ? "paciente" : "pacientes"}
        </p>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {pacientesFiltrados.map((paciente) => (
            <PacienteRow key={paciente.id} paciente={paciente} />
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
