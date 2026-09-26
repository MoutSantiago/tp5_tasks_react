import { api } from "./axios";
import type { Sprint } from "../types/data";

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
