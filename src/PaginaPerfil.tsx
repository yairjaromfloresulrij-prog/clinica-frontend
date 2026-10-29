import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useAuthStore } from "./stores/authStore";
import { InputFotoPerfil } from "./components/InputFotoPerfil";
import { perfilSchema, type PerfilFormData } from "./schemas/perfilSchema";
import { api } from "./lib/axios";
import { extraerMensajeError } from "./lib/errorHandler";

export function PaginaPerfil() {
  const { usuario, actualizarUsuario } = useAuthStore();

  const [foto, setFoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nombre: usuario?.nombre ?? "",
      email: usuario?.email ?? "",
      telefono: usuario?.telefono ?? "",
    },
  });

  const onSubmit = async (datos: PerfilFormData) => {
    try {
      const formData = new FormData();

      formData.append("nombre", datos.nombre);
      formData.append("email", datos.email);

      if (datos.telefono) {
        formData.append("telefono", datos.telefono);
      }

      if (foto) {
        formData.append("foto", foto);
      }

      const { data } = await api.put("/auth/perfil", formData);

      actualizarUsuario({
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        rol: data.role,
        telefono: data.telefono,
        foto: data.foto,
      });

      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error(extraerMensajeError(error));
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>

        <p className="mt-2 text-slate-600">
          Actualizá tus datos personales y foto de perfil.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <InputFotoPerfil fotoActual={usuario?.foto} onChange={setFoto} />

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Nombre
            </label>

            <input
              type="text"
              {...register("nombre")}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />

            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Teléfono
            </label>

            <input
              type="text"
              {...register("telefono")}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />

            {errors.telefono && (
              <p className="mt-1 text-sm text-red-600">
                {errors.telefono.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-sky-600 px-4 py-3 font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
