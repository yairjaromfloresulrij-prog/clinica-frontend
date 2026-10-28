import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { api } from "../lib/axios";
import { extraerMensajeError } from "../lib/errorHandler";
import { create as crearCita, updateEstado } from "../services/citas";
import type { EstadoCita } from "../services/citas";
import type { CrearCitaDTO } from "../types/dtos";
import type { Cita } from "../types/cita";

interface CitasState {
  citas: Cita[];
  citaSeleccionada: Cita | null;
  cargando: boolean;

  cargar: () => Promise<void>;

  cargarPorPaciente: (id: number) => Promise<void>;

  seleccionar: (id: number) => void;

  actualizarEstado: (id: string, estado: EstadoCita) => Promise<void>;

  agregarCita: (data: CrearCitaDTO) => Promise<void>;
}

export const useCitasStore = create<CitasState>()(
  devtools(
    (set) => ({
      citas: [],
      citaSeleccionada: null,
      cargando: false,

      cargar: async () => {
        set({
          cargando: true,
        });

        try {
          const respuesta = await api.get("/citas");

          set({
            citas: respuesta.data.data,
            cargando: false,
          });
        } catch (err) {
          set({
            cargando: false,
          });

          throw new Error(extraerMensajeError(err));
        }
      },

      cargarPorPaciente: async (id) => {
        set({
          cargando: true,
        });

        try {
          const respuesta = await api.get("/citas", {
            params: {
              id_paciente: id,
            },
          });

          set({
            citas: respuesta.data.data,
            cargando: false,
          });
        } catch (err) {
          set({
            cargando: false,
          });

          throw new Error(extraerMensajeError(err));
        }
      },

      seleccionar: (id) => {
        set((state) => ({
          citaSeleccionada:
            state.citas.find((cita) => cita.id_cita === id) ?? null,
        }));
      },

      actualizarEstado: async (id, estado) => {
        set({
          cargando: true,
        });

        try {
          const respuesta = await updateEstado(id, estado);

          set((state) => ({
            citas: state.citas.map((cita) =>
              cita.id_cita === Number(id) ? respuesta.data.data : cita,
            ),
            cargando: false,
          }));
        } catch (err) {
          set({
            cargando: false,
          });

          throw new Error(extraerMensajeError(err));
        }
      },

      agregarCita: async (data) => {
        set({
          cargando: true,
        });

        try {
          const respuesta = await crearCita(data);

          set((state) => ({
            citas: [...state.citas, respuesta.data.data],
            cargando: false,
          }));
        } catch (err) {
          set({
            cargando: false,
          });

          throw new Error(extraerMensajeError(err));
        }
      },
    }),
    {
      name: "CitasStore",
    },
  ),
);
