import { api } from "./axios";
import type {
  AddTaskDto,
  EditTaskDto,
  Task,
  TaskDependencie,
  TaskStatus,
} from "../types/data";

/**
 * Obtiene todas las tareas con sus dependencias desde la api y
 * formatea las fechas
 *
 * @returns {Promise<Task[]>} Array de tareas
 */
export async function loadTasks(): Promise<Task[]> {
  const response = await api.get("/task");
  return response.data.map((task: Task) => ({
    ...task,
    created_at: new Date(task.created_at),
    closed_at: task.closed_at ? new Date(task.closed_at) : null,
  }));
}

/**
 * Crea una nueva tarea en la base de datos
 *
 * @param {AddTaskDto} taskData Datos para crear una nueva tarea
 */
export async function addTask(taskData: AddTaskDto): Promise<void> {
  await api.post("/task", taskData);
}

/**
 * Modifica los datos de una tarea en la base de datos
 *
 * @param id Id de la tarea
 * @param taskData Datos a modificar de la tarea
 */
export async function editTask(
  id: number,
  taskData: EditTaskDto,
): Promise<void> {
  await api.put(`/task/${id}`, taskData);
}

/**
 * Cambia el estado de una tarea
 *
 * @param id Id de la tarea
 * @param state Estado que se le quiere aplicar a la tarea
 * @returns {Promise<TaskStatus>} Estado de la tarea
 */
export async function changeTaskState(
  id: number,
  state: TaskStatus,
): Promise<TaskStatus> {
  await api.put(`/task/state/${id}`, { status: state });
  return state;
}

/**
 * Crea una relación de dependencia entre dos tareas
 *
 * @param {TaskDependencie} dependencie Datso de la dependencia
 */
export async function attachDependencie(
  dependencie: TaskDependencie,
): Promise<void> {
  await api.post("/task/attach", dependencie);
}

/**
 * Elimina una realción de dependencia entre dos tareas
 *
 * @param {TaskDependencie} dependencie Dependenncia que se va a eliminar
 */
export async function detachDependencie(
  dependencie: TaskDependencie,
): Promise<void> {
  await api.delete("/task/detach", { data: dependencie });
}

/**
 * Elimina una tarea y todo lo que depende de ella
 *
 * @param {number} id Id de la tarea a eliminar
 */
export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/task/${id}`);
}
