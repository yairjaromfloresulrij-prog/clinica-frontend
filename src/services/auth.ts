import { api } from "../lib/axios";
import type { LoginFormData } from "../schemas/loginSchema";

export interface LoginResponse {
  token: string;
}

export async function login(datos: LoginFormData): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", datos);

  return data;
}
