import { api } from "../lib/axios";
import type { Paciente } from "../types/paciente";
import type { CrearPacienteDTO, ActualizarPacienteDTO } from "../types/dtos";

export const create = (data: CrearPacienteDTO) =>
  api.post<Paciente>("/pacientes", data);

export const update = (id: string, data: ActualizarPacienteDTO) =>
  api.put<Paciente>(`/pacientes/${id}`, data);

export const remove = (id: string) => api.delete(`/pacientes/${id}`);
