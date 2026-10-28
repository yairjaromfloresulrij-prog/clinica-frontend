import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export function Layout() {
  const { usuario, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-900 p-6 text-white">
        <h1 className="mb-8 text-xl font-bold">Clínica Salud Integral</h1>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium ${
                isActive
                  ? "bg-sky-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/pacientes"
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium ${
                isActive
                  ? "bg-sky-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            👥 Pacientes
          </NavLink>

          <NavLink
            to="/reportes"
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium ${
                isActive
                  ? "bg-sky-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            📊 Reportes
          </NavLink>

          <NavLink
            to="/citas/nueva"
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium ${
                isActive
                  ? "bg-sky-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            📅 Nueva cita
          </NavLink>
        </nav>

        <div className="mt-auto border-t border-slate-700 pt-6">
          <p className="font-medium">{usuario?.nombre}</p>

          <p className="mt-1 text-sm text-slate-400">Rol: {usuario?.rol}</p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}
