interface SpinnerProps {
  fullscreen?: boolean;
}

export function Spinner({ fullscreen = false }: SpinnerProps) {
  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 flex items-center justify-center bg-white/70"
          : "flex items-center justify-center p-4"
      }
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
        role="status"
        aria-label="Cargando"
      />
    </div>
  );
}
