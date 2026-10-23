import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { extraerMensajeError } from "../lib/errorHandler";

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const recargar = useCallback(() => {
    setVersion((valor) => valor + 1);
  }, []);

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const response = await api.get<T>(url);

        if (activo) {
          setData(response.data);
        }
      } catch (err: unknown) {
        if (activo) {
          setError(extraerMensajeError(err));
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargar();

    return () => {
      activo = false;
    };
  }, [url, version]);

  return {
    data,
    cargando,
    error,
    recargar,
  };
}
