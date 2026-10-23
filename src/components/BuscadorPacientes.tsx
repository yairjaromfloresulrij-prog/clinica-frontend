import type { ChangeEvent } from "react";

interface BuscadorPacientesProps {
  value: string;
  onChange: (value: string) => void;
  cargando: boolean;
}

export function BuscadorPacientes({
  value,
  onChange,
  cargando,
}: BuscadorPacientesProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Buscar por nombre, apellido o email..."
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-700 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
      />

      {cargando && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
        </div>
      )}
    </div>
  );
}
