import { api } from "./axios";
import type {
  AddProjectDto,
  EditProjectDto,
  Project,
  Sprint,
} from "../types/data";

/**
 * Obtiene todos los proyectos con sus sprints mediante la api, luego
 * formatea las fechas.
 *
 * @returns {Promise<Project[]>} Array de los proyectos
 */
export async function loadProjects(): Promise<Project[]> {
  const response = await api.get("/project");
  return response.data.map((project: Project) => ({
    ...project,
    created_at: new Date(project.created_at),
    sprints: project.sprints.map((sprint: Sprint) => ({
      ...sprint,
      start_date: new Date(sprint.start_date),
      end_date: sprint.end_date ? new Date(sprint.end_date) : undefined,
    })),
  }));
}

/**
 * Crea un nuevo proyecto y lo añade a la base de datos
 *
 * @param {AddProjectDto} projectData Datos para la creación de un nuevo proyecto
 */
export async function addProject(projectData: AddProjectDto): Promise<void> {
  await api.post("/project", projectData);
}

/**
 * Realiza modificaciones a un proyecto en la base de datos
 *
 * @param {number} id Id de la tarea a modificar
 * @param {EditProjectDto} changes Cmabios que se quieren realizar sobre la tarea
 */
export async function editProject(
  id: number,
  changes: EditProjectDto,
): Promise<void> {
  await api.put(`/project/${id}`, changes);
}
