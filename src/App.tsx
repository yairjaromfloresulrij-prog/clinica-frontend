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
import { ErrorBoundary } from "./shared/components/ui/ErrorBoundary";
import { AlertaBanner } from "./shared/components/ui/AlertaBanner";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/sin-acceso" element={<PaginaSinAcceso />} />
      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <PaginaDashboard />
              </ErrorBoundary>
            }
          />

          <Route
            path="/pacientes"
            element={
              <ErrorBoundary>
                <PaginaPacientes />
              </ErrorBoundary>
            }
          />

          <Route
            path="/pacientes/:id"
            element={
              <ErrorBoundary>
                <PaginaDetallePaciente />
              </ErrorBoundary>
            }
          />

          <Route
            path="/citas/nueva"
            element={
              <ErrorBoundary>
                <FormularioCita />
              </ErrorBoundary>
            }
          />

          <Route
            path="/citas"
            element={
              <ErrorBoundary>
                <PaginaCitas />
              </ErrorBoundary>
            }
          />

          <Route
            path="/perfil"
            element={
              <ErrorBoundary>
                <PaginaPerfil />
              </ErrorBoundary>
            }
          />

          <Route
            path="/historial"
            element={
              <ErrorBoundary>
                <PaginaHistorialCitas />
              </ErrorBoundary>
            }
          />
          <Route
            element={<RutaProtegida rolesPermitidos={["GERENCIA", "ADMIN"]} />}
          >
            <Route
              path="/reportes"
              element={
                <ErrorBoundary
                  fallback={
                    <AlertaBanner
                      tipo="error"
                      mensaje="Error al cargar reportes"
                    />
                  }
                >
                  <PaginaReportes />
                </ErrorBoundary>
              }
            />
          </Route>

          <Route path="*" element={<PaginaNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
