import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { EstadoCita } from "../services/citas";
import type { EstadoPaciente } from "../types/paciente";

interface FiltrosState {
  queryPacientes: string;
  estadoPacienteFiltro: EstadoPaciente | "Todos";
  especialidadFiltro: string;
  estadoCitaFiltro: EstadoCita | "Todos";

  setQueryPacientes: (query: string) => void;

  setEstadoPaciente: (estado: EstadoPaciente | "Todos") => void;

  setEspecialidad: (especialidad: string) => void;

  setEstadoCita: (estado: EstadoCita | "Todos") => void;

  resetFiltros: () => void;
}

export const useFiltrosStore = create<FiltrosState>()(
  devtools(
    (set) => ({
      queryPacientes: "",
      estadoPacienteFiltro: "Todos",
      especialidadFiltro: "Todas",
      estadoCitaFiltro: "Todos",

      setQueryPacientes: (query) => {
        set({
          queryPacientes: query,
        });
      },

      setEstadoPaciente: (estado) => {
        set({
          estadoPacienteFiltro: estado,
        });
      },

      setEspecialidad: (especialidad) => {
        set({
          especialidadFiltro: especialidad,
        });
      },

      setEstadoCita: (estado) => {
        set({
          estadoCitaFiltro: estado,
        });
      },

      resetFiltros: () => {
        set({
          queryPacientes: "",
          estadoPacienteFiltro: "Todos",
          especialidadFiltro: "Todas",
          estadoCitaFiltro: "Todos",
        });
      },
    }),
    {
      name: "FiltrosStore",
    },
  ),
);
