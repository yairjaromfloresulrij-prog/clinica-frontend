import { useEffect, useState } from "react";
import type { Medico } from "../types/medico";

const medicosSimulados: Medico[] = [
  {
    id: "1",
    nombre: "Carlos Rodríguez",
    especialidad: "Cardiología",
  },
  {
    id: "2",
    nombre: "Laura Martínez",
    especialidad: "Dermatología",
  },
  {
    id: "3",
    nombre: "Andrés Gómez",
    especialidad: "Neurología",
  },
  {
    id: "4",
    nombre: "Sofía Fernández",
    especialidad: "Pediatría",
  },
];

export function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMedicos(medicosSimulados);
      setCargando(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return {
    medicos,
    cargando,
  };
}
