import { useEffect } from "react";
import { useCitasStore } from "../stores/citasStore";

export function useCitas() {
  const citas = useCitasStore((state) => state.citas);
  const citaSeleccionada = useCitasStore((state) => state.citaSeleccionada);
  const cargando = useCitasStore((state) => state.cargando);

  const cargar = useCitasStore((state) => state.cargar);
  const cargarPorPaciente = useCitasStore((state) => state.cargarPorPaciente);
  const seleccionar = useCitasStore((state) => state.seleccionar);
  const actualizarEstado = useCitasStore((state) => state.actualizarEstado);
  const agregarCita = useCitasStore((state) => state.agregarCita);

  useEffect(() => {
    cargar().catch(() => {
      // El error se maneja en el componente que utiliza el hook.
    });
  }, [cargar]);

  return {
    citas,
    citaSeleccionada,
    cargando,
    cargar,
    cargarPorPaciente,
    seleccionar,
    actualizarEstado,
    agregarCita,
  };
}
