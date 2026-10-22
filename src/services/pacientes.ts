import { api } from "../lib/axios";
import type { Paciente } from "../types/paciente";

export interface CrearPacienteData {
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  fecha_nacimiento: string;
}

export const create = (data: CrearPacienteData) =>
  api.post<Paciente>("/pacientes", data);

export const update = (id: string, data: Partial<CrearPacienteData>) =>
  api.put<Paciente>(`/pacientes/${id}`, data);

export const remove = (id: string) => api.delete(`/pacientes/${id}`);
