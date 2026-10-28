import { Link } from "react-router-dom";

export function PaginaSinAcceso() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <section className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="text-5xl">🚫</div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Acceso denegado
        </h1>

        <p className="mt-3 text-slate-600">
          No tienes permisos para acceder a esta sección.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-sky-600 px-5 py-2 font-medium text-white hover:bg-sky-700"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
