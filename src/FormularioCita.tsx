import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "./services/citas";
import { citaSchema, type CitaFormData } from "./schemas/citaSchema";

import { useMedicos } from "./hooks/useMedicos";
import { usePacientesStore } from "./stores/pacientesStore";

export default function FormularioCita() {
  const { medicos, cargando } = useMedicos();

  const {
    pacientes,
    cargar: cargarPacientes,
    cargando: cargandoPacientes,
  } = usePacientesStore();

  const [citaConfirmada, setCitaConfirmada] = useState<CitaFormData | null>(
    null,
  );

  useEffect(() => {
    cargarPacientes();
  }, [cargarPacientes]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      pacienteId: "",
      medicoId: "",
      fecha: "",
      hora: "",
      motivo: "",
      urgencia: "media",
    },
  });

  const onSubmit = async (data: CitaFormData) => {
    alert(`Paciente ID: ${data.pacienteId}`);

    const fechaHora = `${data.fecha}T${data.hora}:00`;

    await create({
      id_paciente: Number(data.pacienteId),
      id_medico: Number(data.medicoId),
      fecha_hora: fechaHora,
    });

    setCitaConfirmada(data);
  };

  const agendarOtraCita = () => {
    setCitaConfirmada(null);
    reset();
  };

  if (citaConfirmada) {
    const pacienteSeleccionado = pacientes.find(
      (paciente) => paciente.id === citaConfirmada.pacienteId,
    );

    const medicoSeleccionado = medicos.find(
      (medico) => medico.id === citaConfirmada.medicoId,
    );

    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-emerald-800">
          Cita agendada correctamente
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Paciente:</strong>{" "}
            {pacienteSeleccionado
              ? `${pacienteSeleccionado.nombre} ${pacienteSeleccionado.apellido}`
              : "Paciente no encontrado"}
          </p>

          <p>
            <strong>Médico:</strong> {medicoSeleccionado?.nombre}
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
        <h1 className="text-2xl font-bold">Agendar nueva cita</h1>

        <p className="text-gray-500">Completa los datos de la cita.</p>
      </div>

      {/* Paciente */}
      <div>
        <label className="mb-1 block font-medium">Paciente</label>

        <select
          {...register("pacienteId")}
          disabled={cargandoPacientes}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">
            {cargandoPacientes
              ? "Cargando pacientes..."
              : "Seleccionar paciente"}
          </option>

          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nombre} {paciente.apellido}
            </option>
          ))}
        </select>

        {errors.pacienteId && (
          <p className="text-sm text-red-600">{errors.pacienteId.message}</p>
        )}
      </div>

      {/* Médico */}
      <div>
        <label className="mb-1 block font-medium">Médico</label>

        <select
          {...register("medicoId")}
          disabled={cargando}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">
            {cargando ? "Cargando médicos..." : "Seleccionar médico"}
          </option>

          {medicos.map((medico) => (
            <option key={medico.id} value={medico.id}>
              {medico.nombre}
            </option>
          ))}
        </select>

        {errors.medicoId && (
          <p className="text-sm text-red-600">{errors.medicoId.message}</p>
        )}
      </div>

      {/* Fecha */}
      <div>
        <label className="mb-1 block font-medium">Fecha</label>

        <input
          type="date"
          {...register("fecha")}
          className="w-full rounded-md border px-3 py-2"
        />

        {errors.fecha && (
          <p className="text-sm text-red-600">{errors.fecha.message}</p>
        )}
      </div>

      {/* Hora */}
      <div>
        <label className="mb-1 block font-medium">Hora</label>

        <input
          type="time"
          {...register("hora")}
          className="w-full rounded-md border px-3 py-2"
        />

        {errors.hora && (
          <p className="text-sm text-red-600">{errors.hora.message}</p>
        )}
      </div>

      {/* Motivo */}
      <div>
        <label className="mb-1 block font-medium">Motivo</label>

        <textarea
          {...register("motivo")}
          rows={4}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Describe el motivo de la consulta..."
        />

        {errors.motivo && (
          <p className="text-sm text-red-600">{errors.motivo.message}</p>
        )}
      </div>

      {/* Urgencia */}
      <div>
        <label className="mb-1 block font-medium">Urgencia</label>

        <select
          {...register("urgencia")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="critica">Crítica</option>
        </select>

        {errors.urgencia && (
          <p className="text-sm text-red-600">{errors.urgencia.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Agendando..." : "Agendar cita"}
      </button>
      {Object.keys(errors).length > 0 && (
        <p className="text-red-600">Hay errores en el formulario</p>
      )}
    </form>
  );
}
