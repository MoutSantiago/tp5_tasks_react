import { api } from "./axios";
import type { AddSprintDto, Sprint } from "../types/data";

/**
 * Obtiene todos los sprints desde la api y
 * formatea las fechas
 *
 * @returns {Promise<Sprint[]>} Array de sprints
 */
export async function loadSprints(): Promise<Sprint[]> {
  const response = await api.get("/sprint");
  return response.data.map((sprint: Sprint) => ({
    ...sprint,
    start_date: new Date(sprint.start_date),
    end_date: sprint.end_date ? new Date(sprint.end_date) : undefined,
  }));
}

/**
 * Crea un nuevo sprint en la base de datos y lo retorna
 *
 * @param newSprint Datos del nuevo sprint
 * @returns {Promise<Sprint>} El sprint recien creado
 */
export async function addSprint(newSprint: AddSprintDto): Promise<Sprint> {
  const response = await api.post("/sprint", newSprint);
  return {
    ...response.data,
    start_date: new Date(response.data.start_date),
    end_date: response.data.end_date
      ? new Date(response.data.end_date)
      : undefined,
  };
}

/**
 * Modifica los datos de un sprint en la base de datos
 *
 * @param {number} id Id del sprint a modificar
 * @param {{name: string}} changes Cmabios a realizar sobre el sprint
 * @returns {Promise<Sprint>} Sprint con los datos actualizados
 */
export async function editSprint(
  id: number,
  changes: { name: string },
): Promise<Sprint> {
  const response = await api.put(`/sprint/${id}`, changes);
  return {
    ...response.data,
    start_date: new Date(response.data.start_date),
    end_date: response.data.end_date
      ? new Date(response.data.end_date)
      : undefined,
  };
}

/**
 * Avanza el estado de un sprint.
 *
 * @param {number} id Id del sprint que se desea avanzar
 * @returns {Promise<Sprint>} Sprint con datos actualizados
 */
export async function avanceSprint(id: number): Promise<Sprint> {
  const response = await api.put(`/sprint/advance/${id}`);
  return {
    ...response.data,
    start_date: new Date(response.data.start_date),
    end_date: response.data.end_date
      ? new Date(response.data.end_date)
      : undefined,
  };
}

/**
 * Cancela un sprint, poniendo su estado den canceled
 *
 * @param {number} id Id del sprint
 * @returns {Promise<Sprint>} Sprint con el estado modificado
 */
export async function cancelSprint(id: number): Promise<Sprint> {
  const response = await api.put(`/sprint/cancel/${id}`);
  return {
    ...response.data,
    start_date: new Date(response.data.start_date),
    end_date: response.data.end_date
      ? new Date(response.data.end_date)
      : undefined,
  };
}
