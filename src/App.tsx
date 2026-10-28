import { Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";
import { PaginaLogin } from "./PaginaLogin";
import { PaginaDashboard } from "./PaginaDashboard";
import { PaginaPacientes } from "./PaginaPacientes";
import { PaginaDetallePaciente } from "./PaginaDetallePaciente";
import { PaginaNotFound } from "./PaginaNotFound";
import FormularioCita from "./FormularioCita";
import { PaginaCitas } from "./PaginaCitas";
import { PaginaReportes } from "./PaginaReportes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />

      <Route element={<Layout />}>
        <Route path="/" element={<PaginaDashboard />} />
        <Route path="/pacientes" element={<PaginaPacientes />} />
        <Route path="/pacientes/:id" element={<PaginaDetallePaciente />} />
        <Route path="/citas/nueva" element={<FormularioCita />} />
        <Route path="/citas" element={<PaginaCitas />} />
        <Route path="/reportes" element={<PaginaReportes />} />
        <Route path="*" element={<PaginaNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
