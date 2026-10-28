import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { api } from "../lib/axios";
import {
  create as crearPaciente,
  update as actualizarPaciente,
  remove as eliminarPaciente,
} from "../services/pacientes";
import type { CrearPacienteDTO, ActualizarPacienteDTO } from "../types/dtos";
import type { Paciente } from "../types/paciente";
import type { RespuestaPaginada } from "../types/api";
import { extraerMensajeError } from "../lib/errorHandler";

interface PacientesState {
  pacientes: Paciente[];
  cargando: boolean;
  error: string | null;

  cargar: (query?: string) => Promise<void>;

  crear: (data: CrearPacienteDTO) => Promise<void>;

  actualizar: (id: string, data: ActualizarPacienteDTO) => Promise<void>;

  eliminar: (id: string) => Promise<void>;

  cambiarEstado: (id: string, estado: Paciente["estado"]) => void;
}

export const usePacientesStore = create<PacientesState>()(
  devtools(
    (set) => ({
      pacientes: [],
      cargando: false,
      error: null,

      cargar: async (query) => {
        set({
          cargando: true,
          error: null,
        });

        try {
          const res = await api.get<RespuestaPaginada<Paciente>>("/pacientes", {
            params: { query },
          });

          set({
            pacientes: res.data.data,
            cargando: false,
          });
        } catch (err) {
          set({
            error: extraerMensajeError(err),
            cargando: false,
          });
        }
      },

      crear: async (data) => {
        set({
          cargando: true,
          error: null,
        });

        try {
          const res = await crearPaciente(data);

          set((state) => ({
            pacientes: [...state.pacientes, res.data],
            cargando: false,
          }));
        } catch (err) {
          set({
            error: extraerMensajeError(err),
            cargando: false,
          });

          throw err;
        }
      },

      actualizar: async (id, data) => {
        set({
          cargando: true,
          error: null,
        });

        try {
          const res = await actualizarPaciente(id, data);

          set((state) => ({
            pacientes: state.pacientes.map((paciente) =>
              paciente.id === id ? res.data : paciente,
            ),
            cargando: false,
          }));
        } catch (err) {
          set({
            error: extraerMensajeError(err),
            cargando: false,
          });

          throw err;
        }
      },

      eliminar: async (id) => {
        set({
          cargando: true,
          error: null,
        });

        try {
          await eliminarPaciente(id);

          set((state) => ({
            pacientes: state.pacientes.filter((paciente) => paciente.id !== id),
            cargando: false,
          }));
        } catch (err) {
          set({
            error: extraerMensajeError(err),
            cargando: false,
          });

          throw err;
        }
      },

      cambiarEstado: (id, estado) => {
        set((state) => ({
          pacientes: state.pacientes.map((paciente) =>
            paciente.id === id
              ? {
                  ...paciente,
                  estado,
                }
              : paciente,
          ),
        }));
      },
    }),
    {
      name: "PacientesStore",
    },
  ),
);
