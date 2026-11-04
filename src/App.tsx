import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./layouts/Layout";
import { PaginaLogin } from "./PaginaLogin";
import { PaginaDashboard } from "./PaginaDashboard";
import { RutaProtegida } from "./components/RutaProtegida";
import { ErrorBoundary } from "./shared/components/ui/ErrorBoundary";
import { AlertaBanner } from "./shared/components/ui/AlertaBanner";
import { Spinner } from "./shared/components/ui/Spinner";

// Páginas con carga diferida

const PaginaSinAcceso = lazy(() =>
  import("./PaginaSinAcceso").then((modulo) => ({
    default: modulo.PaginaSinAcceso,
  })),
);

const PaginaPacientes = lazy(() =>
  import("./PaginaPacientes").then((modulo) => ({
    default: modulo.PaginaPacientes,
  })),
);

const PaginaDetallePaciente = lazy(() =>
  import("./PaginaDetallePaciente").then((modulo) => ({
    default: modulo.PaginaDetallePaciente,
  })),
);

const PaginaNotFound = lazy(() =>
  import("./PaginaNotFound").then((modulo) => ({
    default: modulo.PaginaNotFound,
  })),
);

const PaginaCitas = lazy(() =>
  import("./PaginaCitas").then((modulo) => ({
    default: modulo.PaginaCitas,
  })),
);

const PaginaReportes = lazy(() =>
  import("./PaginaReportes").then((modulo) => ({
    default: modulo.PaginaReportes,
  })),
);

const PaginaPerfil = lazy(() =>
  import("./PaginaPerfil").then((modulo) => ({
    default: modulo.PaginaPerfil,
  })),
);

const PaginaHistorialCitas = lazy(() =>
  import("./PaginaHistorialCitas").then((modulo) => ({
    default: modulo.PaginaHistorialCitas,
  })),
);
const FormularioCita = lazy(() => import("./FormularioCita"));
function App() {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
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
              element={
                <RutaProtegida rolesPermitidos={["GERENCIA", "ADMIN"]} />
              }
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
    </Suspense>
  );
}

export default App;
