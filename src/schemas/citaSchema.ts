import { z } from "zod";

export const citaSchema = z.object({
  pacienteId: z.string().min(1, "Debes seleccionar un paciente"),
  medicoId: z.string().min(1, "Debes seleccionar un médico"),

  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD")
    .refine(
      (fecha) => fecha >= new Date().toISOString().split("T")[0],
      "La fecha no puede ser pasada",
    ),

  hora: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe tener formato HH:MM"),

  motivo: z
    .string()
    .min(10, "El motivo debe tener al menos 10 caracteres")
    .max(500, "El motivo no puede superar los 500 caracteres"),

  urgencia: z.enum(["baja", "media", "alta", "critica"]),
});

export type CitaFormData = z.infer<typeof citaSchema>;
