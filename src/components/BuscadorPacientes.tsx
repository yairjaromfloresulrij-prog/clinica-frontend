interface BuscadorPacientesProps {
  value: string;
  onChange: (value: string) => void;
}

export function BuscadorPacientes({ value, onChange }: BuscadorPacientesProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar por nombre, apellido o email..."
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
    />
  );
}
