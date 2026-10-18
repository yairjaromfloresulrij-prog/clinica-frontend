import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { citaSchema, type CitaFormData } from "./schemas/citaSchema";
import { useMedicos } from "./hooks/useMedicos";

export default function FormularioCita() {
  const { medicos, cargando } = useMedicos();

  const [citaConfirmada, setCitaConfirmada] = useState<CitaFormData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      pacienteNombre: "",
      medicoId: "",
      fecha: "",
      hora: "",
      motivo: "",
      urgencia: "media",
    },
  });

  const onSubmit = async (data: CitaFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setCitaConfirmada(data);
  };

  const agendarOtraCita = () => {
    setCitaConfirmada(null);
    reset();
  };

  if (citaConfirmada) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-emerald-800">
          Cita agendada correctamente
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Paciente:</strong> {citaConfirmada.pacienteNombre}
          </p>

          <p>
            <strong>Médico:</strong>{" "}
            {
              medicos.find((medico) => medico.id === citaConfirmada.medicoId)
                ?.nombre
            }
          </p>

          <p>
            <strong>Fecha:</strong> {citaConfirmada.fecha}
          </p>

          <p>
            <strong>Hora:</strong> {citaConfirmada.hora}
          </p>

          <p>
            <strong>Motivo:</strong> {citaConfirmada.motivo}
          </p>

          <p>
            <strong>Urgencia:</strong> {citaConfirmada.urgencia}
          </p>
        </div>

        <button
          type="button"
          onClick={agendarOtraCita}
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Agendar otra cita
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-6 rounded-lg border bg-white p-6 shadow"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Nueva cita</h1>

        <p className="mt-1 text-sm text-gray-500">
          Completa los datos para agendar una nueva cita.
        </p>
      </div>

      {/* Paciente */}

      <div>
        <label
          htmlFor="pacienteNombre"
          className="mb-1 block font-medium text-gray-700"
        >
          Nombre del paciente
        </label>

        <input
          id="pacienteNombre"
          type="text"
          {...register("pacienteNombre")}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.pacienteNombre ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Nombre completo"
        />

        {errors.pacienteNombre && (
          <p className="mt-1 text-sm text-red-600">
            {errors.pacienteNombre.message}
          </p>
        )}
      </div>

      {/* Médico */}

      <div>
        <label
          htmlFor="medicoId"
          className="mb-1 block font-medium text-gray-700"
        >
          Médico
        </label>

        <select
          id="medicoId"
          {...register("medicoId")}
          disabled={cargando}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.medicoId ? "border-red-500" : "border-gray-300"
          }`}
        >
          {cargando ? (
            <option disabled>Cargando médicos...</option>
          ) : (
            <>
              <option value="">Selecciona un médico</option>

              {medicos.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  {medico.nombre} - {medico.especialidad}
                </option>
              ))}
            </>
          )}
        </select>

        {errors.medicoId && (
          <p className="mt-1 text-sm text-red-600">{errors.medicoId.message}</p>
        )}
      </div>

      {/* Fecha */}

      <div>
        <label htmlFor="fecha" className="mb-1 block font-medium text-gray-700">
          Fecha
        </label>

        <input
          id="fecha"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          {...register("fecha")}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.fecha ? "border-red-500" : "border-gray-300"
          }`}
        />

        {errors.fecha && (
          <p className="mt-1 text-sm text-red-600">{errors.fecha.message}</p>
        )}
      </div>

      {/* Hora */}

      <div>
        <label htmlFor="hora" className="mb-1 block font-medium text-gray-700">
          Hora
        </label>

        <input
          id="hora"
          type="time"
          {...register("hora")}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.hora ? "border-red-500" : "border-gray-300"
          }`}
        />

        {errors.hora && (
          <p className="mt-1 text-sm text-red-600">{errors.hora.message}</p>
        )}
      </div>

      {/* Motivo */}

      <div>
        <label
          htmlFor="motivo"
          className="mb-1 block font-medium text-gray-700"
        >
          Motivo de la consulta
        </label>

        <textarea
          id="motivo"
          rows={4}
          {...register("motivo")}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.motivo ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe el motivo de la consulta..."
        />

        {errors.motivo && (
          <p className="mt-1 text-sm text-red-600">{errors.motivo.message}</p>
        )}
      </div>

      {/* Urgencia */}

      <div>
        <label
          htmlFor="urgencia"
          className="mb-1 block font-medium text-gray-700"
        >
          Urgencia
        </label>

        <select
          id="urgencia"
          {...register("urgencia")}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.urgencia ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="critica">Crítica</option>
        </select>

        {errors.urgencia && (
          <p className="mt-1 text-sm text-red-600">{errors.urgencia.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Agendando..." : "Agendar cita"}
      </button>
    </form>
  );
}
