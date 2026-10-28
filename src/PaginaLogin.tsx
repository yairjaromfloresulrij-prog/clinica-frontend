import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { loginSchema, type LoginFormData } from "./schemas/loginSchema";
import { login } from "./services/auth";
import { useAuthStore } from "./stores/authStore";
import { extraerMensajeError } from "./lib/errorHandler";

export function PaginaLogin() {
  const navigate = useNavigate();

  const guardarSesion = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (datos: LoginFormData) => {
    try {
      const respuesta = await login(datos);

      guardarSesion(respuesta.token, respuesta.usuario);

      toast.success("Inicio de sesión exitoso");

      navigate("/", { replace: true });
    } catch (err: unknown) {
      toast.error(extraerMensajeError(err));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Clínica Salud Integral
          </h1>

          <p className="mt-2 text-slate-600">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="ejemplo@clinica.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-sky-600 px-4 py-3 font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}
