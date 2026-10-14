// Problemas encontrados en el código generado por la IA:
// 1. No respetó exactamente los tipos solicitados: usó Patient y PatientStatus en lugar de Paciente y EstadoPaciente.
// 2. Definió id como number y especialidad como nombre de propiedad, cuando la interfaz pide id: string y especialidadAsignada.
// 3. Dejó gran parte de la interfaz dentro de App.tsx en vez de separar BuscadorPacientes, PacienteRow y PaginaPacientes en componentes.
export type EstadoPaciente = "activo" | "inactivo" | "en_espera";

export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidadAsignada: string;
  ultimaCita: string;
  estado: EstadoPaciente;
}
