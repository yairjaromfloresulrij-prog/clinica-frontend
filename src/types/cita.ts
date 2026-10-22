import type { EstadoCita } from "../services/citas";

export interface Cita {
  id_cita: number;
  id_paciente: number;
  id_medico: number;
  fecha_hora: string;
  estado: EstadoCita;
}
