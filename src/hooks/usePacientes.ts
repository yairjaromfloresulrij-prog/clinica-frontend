import { useEffect } from "react";
import { usePacientesStore } from "../stores/pacientesStore";

export function usePacientes(query?: string) {
  const pacientes = usePacientesStore((state) => state.pacientes);
  const cargando = usePacientesStore((state) => state.cargando);
  const error = usePacientesStore((state) => state.error);

  const cargar = usePacientesStore((state) => state.cargar);
  const crear = usePacientesStore((state) => state.crear);
  const actualizar = usePacientesStore((state) => state.actualizar);
  const eliminar = usePacientesStore((state) => state.eliminar);
  const cambiarEstado = usePacientesStore((state) => state.cambiarEstado);

  useEffect(() => {
    cargar(query);
  }, [cargar, query]);

  return {
    pacientes,
    cargando,
    error,
    cargar,
    crear,
    actualizar,
    eliminar,
    cambiarEstado,
  };
}
