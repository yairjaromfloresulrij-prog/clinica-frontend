import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
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
      </aside>

      <main className="ml-64 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}
