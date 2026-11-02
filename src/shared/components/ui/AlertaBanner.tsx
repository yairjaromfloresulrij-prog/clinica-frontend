interface AlertaBannerProps {
  tipo: "info" | "exito" | "advertencia" | "error";
  mensaje: string;
}

const estilos = {
  info: "bg-blue-100 text-blue-800 border-blue-300",
  exito: "bg-green-100 text-green-800 border-green-300",
  advertencia: "bg-yellow-100 text-yellow-800 border-yellow-300",
  error: "bg-red-100 text-red-800 border-red-300",
};

export function AlertaBanner({ tipo, mensaje }: AlertaBannerProps) {
  return (
    <div role="alert" className={`rounded-lg border p-4 ${estilos[tipo]}`}>
      {mensaje}
    </div>
  );
}
