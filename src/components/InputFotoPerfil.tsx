import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface InputFotoPerfilProps {
  fotoActual?: string;
  onChange: (archivo: File | null) => void;
}

export function InputFotoPerfil({
  fotoActual,
  onChange,
}: InputFotoPerfilProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSeleccion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith("image/")) {
      toast.error("El archivo debe ser una imagen");
      e.target.value = "";
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      toast.error("La imagen no puede superar los 5MB");
      e.target.value = "";
      return;
    }

    const nuevaPreview = URL.createObjectURL(archivo);

    setPreview(nuevaPreview);
    onChange(archivo);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-md"
      >
        {preview || fotoActual ? (
          <img
            src={
              preview ??
              (fotoActual ? `http://localhost:3000${fotoActual}` : undefined)
            }
            alt="Foto de perfil"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-5xl">
            👤
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleSeleccion}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-sm font-medium text-sky-600 hover:text-sky-700"
      >
        Seleccionar foto
      </button>
    </div>
  );
}
