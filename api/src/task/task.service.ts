import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { task } from '@prisma/client';

/**
 * Servicio con las reglas de negocio relacionadas con la manipulación de datos de las tareas
 */
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca todas las tareas disponibles en la base de datos y las retorna
   *
   * @async
   * @returns {Promise<task[]>} Las tareas cargadas en al base de datos
   */
  async getTasks(): Promise<task[]> {
    return await this.prisma.task.findMany();
  }

  /**
   * Busca una unica tarea en la db filtrada mediante un id
   *
   * @async
   * @param {number} id El id de la tarea a buscar
   * @returns {Promise<task | null>} La tarea buscada si es que existe
   */
  async getTask(id: number): Promise<task | null> {
    return await this.prisma.task.findUnique({ where: { id: id } });
  }

  /**
   * Crea una nueva tarea con los datos dados, la añade a la base de datos y la retorna si se creo correctamente
   *
   * @async
   * @param {CreateTaskDto} createTaskDto Datos para crear la nueva tarea
   * @returns {Promise<task>} La tarea creada
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<task> {
    return await this.prisma.task.create({ data: createTaskDto });
  }

  /**
   * Edita una tarea no cerrada existente y especificada mediante un id, los cambios son enviados a la base de datos
   *
   * @async
   * @param {number} id Id de la tarea que se quiere editar
   * @param {EditTaskDto} editTaskDto Parametros que se desean cambiar de la tarea
   * @throws {NotFoundException} Si no se encuentra ninguna tarea o está cerrada
   */
  async editTask(id: number, editTaskDto: EditTaskDto): Promise<void> {
    const task: task | null = await this.prisma.task.findFirst({
      where: {
        id,
        closed_at: null,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found or already closed');
    }

    this.prisma.task.update({
      where: { id },
      data: editTaskDto,
    });
  }

  /**
   * Cierra una tarea que no halla sido cerrada anteriromente y la retorna en caso de que se cierre correctamente
   *
   * @async
   * @param {number} id Id de la tarea que se quiere cerrar
   * @throws {NotFoundException} Si la tarea no se encontro o ya esta cerrada
   */
  async closeTask(id: number): Promise<void> {
    const task: task | null = await this.prisma.task.findFirst({
      where: {
        id,
        closed_at: null,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found or already closed');
    }

    await this.prisma.task.update({
      where: { id: id },
      data: { closed_at: new Date() },
    });
  }
}
