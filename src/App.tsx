import { Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";
import { PaginaLogin } from "./PaginaLogin";
import { PaginaDashboard } from "./PaginaDashboard";
import { PaginaPacientes } from "./PaginaPacientes";
import { PaginaDetallePaciente } from "./PaginaDetallePaciente";
import { PaginaNotFound } from "./PaginaNotFound";
import { PaginaCitas } from "./PaginaCitas";
import { PaginaSinAcceso } from "./PaginaSinAcceso";
import FormularioCita from "./FormularioCita";
import { PaginaReportes } from "./PaginaReportes";
import { PaginaPerfil } from "./PaginaPerfil";
import { PaginaHistorialCitas } from "./PaginaHistorialCitas";
import { RutaProtegida } from "./components/RutaProtegida";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/sin-acceso" element={<PaginaSinAcceso />} />
      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route path="/" element={<PaginaDashboard />} />
          <Route path="/pacientes" element={<PaginaPacientes />} />
          <Route path="/pacientes/:id" element={<PaginaDetallePaciente />} />
          <Route path="/citas/nueva" element={<FormularioCita />} />
          <Route path="/citas" element={<PaginaCitas />} />
          <Route path="/perfil" element={<PaginaPerfil />} />
          <Route path="/historial" element={<PaginaHistorialCitas />} />
          <Route
            element={<RutaProtegida rolesPermitidos={["GERENCIA", "ADMIN"]} />}
          >
            <Route path="/reportes" element={<PaginaReportes />} />
          </Route>

          <Route path="*" element={<PaginaNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
