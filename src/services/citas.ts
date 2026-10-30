import { api } from "../lib/axios";
import type { CrearCitaDTO } from "../types/dtos";
import type { Cita } from "../types/cita";
import type { RespuestaPaginada } from "../types/api";

export type EstadoCita = "Todos" | "Programada" | "Completada" | "Cancelada";

export const create = (data: CrearCitaDTO) => api.post("/citas", data);

export const updateEstado = (id: string, estado: EstadoCita) =>
  api.patch(`/citas/${id}/estado`, { estado });

export const getHistorial = (
  pagina: number,
  estado: EstadoCita,
  signal?: AbortSignal,
) => {
  return api.get<RespuestaPaginada<Cita>>("/citas", {
    params: {
      pagina,
      estado,
    },
    signal,
  });
};
