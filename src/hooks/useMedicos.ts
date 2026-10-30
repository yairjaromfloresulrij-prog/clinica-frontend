import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import type { Medico } from "../types/medico";

export function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarMedicos = async () => {
      try {
        const res = await api.get("/medicos");

        const medicos: Medico[] = res.data.data.map(
          (medico: {
            id_medico: number;
            nombre: string;
            apellido: string;
          }) => ({
            id: String(medico.id_medico),
            nombre: `${medico.nombre} ${medico.apellido}`,
            especialidad: "",
          }),
        );

        setMedicos(medicos);
      } finally {
        setCargando(false);
      }
    };

    cargarMedicos();
  }, []);

  return {
    medicos,
    cargando,
  };
}
