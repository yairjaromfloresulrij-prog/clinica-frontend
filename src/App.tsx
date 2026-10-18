import { useState } from "react";
import { PaginaDashboard } from "./PaginaDashboard";
import { PaginaPacientes } from "./PaginaPacientes";
import FormularioCita from "./FormularioCita";

function App() {
  const [pagina, setPagina] = useState<"dashboard" | "pacientes" | "citas">(
    "dashboard",
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">
            Clínica Salud Integral
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setPagina("dashboard")}
              className={`rounded-lg px-4 py-2 font-medium ${
                pagina === "dashboard"
                  ? "bg-sky-600 text-white"
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setPagina("pacientes")}
              className={`rounded-lg px-4 py-2 font-medium ${
                pagina === "pacientes"
                  ? "bg-sky-600 text-white"
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              Pacientes
            </button>

            <button
              onClick={() => setPagina("citas")}
              className={`rounded-lg px-4 py-2 font-medium ${
                pagina === "citas"
                  ? "bg-sky-600 text-white"
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              Nueva cita
            </button>
          </div>
        </div>
      </nav>

      {pagina === "dashboard" && (
        <PaginaDashboard onIrAPacientes={() => setPagina("pacientes")} />
      )}

      {pagina === "pacientes" && <PaginaPacientes />}

      {pagina === "citas" && (
        <div className="px-6 py-8">
          <FormularioCita />
        </div>
      )}
    </div>
  );
}

export default App;
