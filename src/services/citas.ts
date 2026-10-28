import { api } from "../lib/axios";
import type { CrearCitaDTO } from "../types/dtos";

export type EstadoCita = "Completada" | "Cancelada";

export const create = (data: CrearCitaDTO) => api.post("/citas", data);

export const updateEstado = (id: string, estado: EstadoCita) =>
  api.patch(`/citas/${id}/estado`, { estado });
