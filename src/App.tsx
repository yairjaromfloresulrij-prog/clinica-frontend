import { Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";
import { PaginaDashboard } from "./PaginaDashboard";
import { PaginaPacientes } from "./PaginaPacientes";
import { PaginaDetallePaciente } from "./PaginaDetallePaciente";
import { PaginaNotFound } from "./PaginaNotFound";
import FormularioCita from "./FormularioCita";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PaginaDashboard />} />

        <Route path="/pacientes" element={<PaginaPacientes />} />

        <Route path="/pacientes/:id" element={<PaginaDetallePaciente />} />

        <Route path="/citas/nueva" element={<FormularioCita />} />

        <Route path="*" element={<PaginaNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
