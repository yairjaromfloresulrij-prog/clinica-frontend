import { Link } from "react-router-dom";

export function PaginaNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="mb-4 text-6xl">🔎</div>

      <h1 className="text-6xl font-bold text-slate-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-slate-800">
        Página no encontrada
      </h2>

      <p className="mt-2 max-w-md text-slate-600">
        La página que estás buscando no existe o ya no está disponible.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
