import { api } from "../lib/axios";

export interface CrearCitaData {
  id_paciente: number;
  id_medico: number;
  fecha_hora: string;
}

export type EstadoCita = "Completada" | "Cancelada";

export const create = (data: CrearCitaData) => api.post("/citas", data);

export const updateEstado = (id: string, estado: EstadoCita) =>
  api.patch(`/citas/${id}/estado`, { estado });
