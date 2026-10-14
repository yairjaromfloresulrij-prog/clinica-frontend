import type { Metrica, Tendencia } from "../types";

interface MetricCardProps {
  metrica: Metrica;
  onClick?: () => void;
}

const colorPorTendencia: Record<Tendencia, string> = {
  positiva: "text-emerald-700",
  negativa: "text-rose-700",
  neutra: "text-slate-700",
};

export function MetricCard({ metrica, onClick }: MetricCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-white p-6 shadow-md ${
        onClick ? "cursor-pointer hover:shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-black">{metrica.titulo}</h2>

        <span className="text-2xl">{metrica.icono}</span>
      </div>

      <p className="mt-4 text-3xl font-bold text-black">{metrica.valor}</p>

      <p
        className={`mt-2 text-sm font-medium ${
          colorPorTendencia[metrica.tendencia]
        }`}
      >
        {metrica.descripcion}
      </p>
    </div>
  );
}
