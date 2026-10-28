import type { Paciente } from "./paciente";
import type { Cita } from "./cita";

export interface DatosPaciente {
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  fecha_nacimiento: string;
}

export type CrearPacienteDTO = DatosPaciente;

export type ActualizarPacienteDTO = Partial<CrearPacienteDTO>;

export type ResumenPaciente = Pick<
  Paciente,
  "id" | "nombre" | "apellido" | "email"
>;

export type CrearCitaDTO = Omit<Cita, "id_cita" | "estado">;

export type ActualizarCitaDTO = Partial<Omit<Cita, "id_cita">>;
