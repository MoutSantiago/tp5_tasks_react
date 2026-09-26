import { api } from "./axios";
import type { User, UserDto } from "../types/data";

/**
 * Obiente los usuarios mediante la api
 *
 * @returns {Promise<User[]>} Array de usuarios
 */
export async function loadUsers(): Promise<User[]> {
  const response = await api.get("/user");
  return response.data;
}

/**
 * Añade un nuevo usuario a la base de datos
 *
 * @param userData Datos para el nuevo usauraio
 */
export async function addUser(userData: UserDto): Promise<void> {
  await api.post("/user", userData);
}

/**
 * Modifica los datos de un usuario en la base de datos
 *
 * @param id Id del ususario
 * @param changes Cambios que se quieren realizar al usuario
 */
export async function editUser(id: number, changes: UserDto): Promise<void> {
  await api.put(`/user/${id}`, changes);
}
