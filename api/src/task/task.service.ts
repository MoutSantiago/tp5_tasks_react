import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { precondition, task, task_state } from '@prisma/client';
import { AttachTaskDto } from './dto/attachTask.dto';

/**
 * Servicio con las reglas de negocio relacionadas con la manipulación de datos
 * de las tareas
 */
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Verifica si establecer una dependencia entre dos tareas generaria un ciclo
   * en el grafo de dependencias, recorriendo las tareas que dependen
   * transitivamente de la tarea independiente
   *
   * Esto eta echo con IA, una vergüenza
   *
   * @private
   * @async
   * @param {number} dependent Id de la tarea que pasaria a depender
   * @param {number} independent Id de la tarea de la que se dependeria
   * @returns {Promise<boolean>} true si la dependencia crearia un ciclo
   */
  private async wouldCreateCycle(
    dependent: number,
    independent: number,
  ): Promise<boolean> {
    const toVisit: number[] = [independent];
    const visited: Set<number> = new Set([independent]);

    while (toVisit.length > 0) {
      const current = toVisit.shift();

      const relations = await this.prisma.precondition.findMany({
        where: { independent_task_id: current },
        select: { dependent_task_id: true },
      });

      for (const { dependent_task_id } of relations) {
        if (dependent_task_id === dependent) return true;

        if (!visited.has(dependent_task_id)) {
          visited.add(dependent_task_id);
          toVisit.push(dependent_task_id);
        }
      }
    }

    return false;
  }

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
   * Crea una nueva tarea con los datos dados, la añade a la base de datos y
   * la retorna si se creo correctamente
   *
   * @async
   * @param {CreateTaskDto} createTaskDto Datos para crear la nueva tarea
   * @returns {Promise<task>} La tarea creada
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<task> {
    return await this.prisma.task.create({ data: createTaskDto });
  }

  /**
   * Edita una tarea no cerrada existente y especificada mediante un id, los
   * cambios son enviados a la base de datos
   *
   * @async
   * @param {number} id Id de la tarea que se quiere editar
   * @param {EditTaskDto} editTaskDto Parametros que se desean cambiar de la tarea
   * @throws {NotFoundException} Si no se encuentra ninguna tarea o está cerrada
   * @returns {Promise<task>} Tarea con los datos modificados
   */
  async editTask(id: number, editTaskDto: EditTaskDto): Promise<task> {
    const task: task | null = await this.prisma.task.findFirst({
      where: {
        id,
        closed_at: null,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found or already closed');
    }

    return await this.prisma.task.update({
      where: { id },
      data: editTaskDto,
    });
  }

  /**
   * Actuliza el estado de una tarea, asegurandose de que la tarea no este
   * finalizada y que, en caso de querer finalizarla no tenga dependencias incompletas;
   * A su vez tambien cierra automaticamente la tarea en caso de pasar a estado 'done'
   *
   * @async
   * @param {number} id Id de la tarea a la que se quiere cambiar el estado
   * @param {task_state} status Estado en el que se quiere poner la tarea
   * @throws {ConflictException} Si la tarea ya ha sido cerrada o tiene dependencias incompletas
   * @returns {status: task_state} Estado en el que quedó la tarea
   */
  async changeStatus(
    id: number,
    status: task_state,
  ): Promise<{ status: task_state }> {
    const task: task = await this.prisma.task.findUniqueOrThrow({
      where: { id },
    });

    if (task.closed_at != null)
      throw new ConflictException('Task has been closed');

    if (status === 'done') {
      const hasIncomplete =
        (await this.prisma.precondition.findFirst({
          where: {
            dependent_task_id: id,
            independent_task: {
              status: { not: 'done' },
            },
          },
          select: { independent_task_id: true },
        })) !== null;

      if (hasIncomplete)
        throw new ConflictException('This task has incomplete dependencies');
    }

    await this.prisma.task.update({
      where: { id },
      data: {
        status: status,
        closed_at: status === 'done' ? new Date() : null,
      },
    });

    return { status: status };
  }

  /**
   * Cierra una tarea que no halla sido cerrada anteriromente y la retorna
   * en caso de que se cierre correctamente
   *
   * @async
   * @param {number} id Id de la tarea que se quiere cerrar
   * @throws {NotFoundException} Si la tarea no se encontro o ya esta cerrada
   * @throws {ConflictException} Si la tarea tiene dependencias incompletas
   */
  async closeTask(id: number): Promise<task> {
    const task: task | null = await this.prisma.task.findFirst({
      where: {
        id,
        closed_at: null,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found or already closed');
    }

    const hasIncomplete =
      (await this.prisma.precondition.findFirst({
        where: {
          dependent_task_id: id,
          independent_task: {
            status: { not: 'done' },
          },
        },
        select: { independent_task_id: true },
      })) !== null;

    if (hasIncomplete) {
      throw new ConflictException('This task has incomplete dependencies');
    }

    return await this.prisma.task.update({
      where: { id: id },
      data: { status: 'done', closed_at: new Date() },
    });
  }

  /**
   * Establece una relación de dependencia entre dos tareas, marcando que una
   * tarea (dependent_task) no puede considerarse completa hasta que la otra
   * (independent_task) lo esté.
   *
   * @async
   * @param {AttachTaskDto} attachTaskDto Ids de las tareas dependiente e independiente
   * @throws {BadRequestException} Si se intenta relacionar una tarea consigo misma o se crea un ciclo
   * @throws {NotFoundException} Si alguna de las dos tareas no existe
   * @throws {ConflictException} Si la relación ya existe
   */
  async attachTask(attachTaskDto: AttachTaskDto): Promise<void> {
    const { dependent_task, independent_task } = attachTaskDto;

    if (dependent_task === independent_task) {
      throw new BadRequestException('A task cannot depend on itself');
    }

    const [dependentTask, independentTask] = await Promise.all([
      this.prisma.task.findUnique({ where: { id: dependent_task } }),
      this.prisma.task.findUnique({ where: { id: independent_task } }),
    ]);

    if (!dependentTask || !independentTask) {
      throw new NotFoundException('Task not found');
    }

    const existingRelation: precondition | null =
      await this.prisma.precondition.findUnique({
        where: {
          dependent_task_id_independent_task_id: {
            dependent_task_id: dependent_task,
            independent_task_id: independent_task,
          },
        },
      });

    if (existingRelation) {
      throw new ConflictException('Tasks are already attached');
    }

    if (await this.wouldCreateCycle(dependent_task, independent_task)) {
      throw new BadRequestException('This dependency would create a cycle');
    }

    await this.prisma.precondition.create({
      data: {
        dependent_task_id: dependent_task,
        independent_task_id: independent_task,
      },
    });
  }

  /**
   * Elimina una relación de dependencia existente entre dos tareas
   *
   * @async
   * @param {AttachTaskDto} detachTaskDto Id de las tareas dependientes e independientes
   * @throws {BadRequestException} Si la tarea dependiente y la independiente son la misma
   * @throws {ConflictException} Si no existe una relación entre ambas tareas
   */
  async detachTask(detachTaskDto: AttachTaskDto) {
    const { dependent_task, independent_task } = detachTaskDto;

    if (dependent_task === independent_task) {
      throw new BadRequestException('A task cannot depend on itself');
    }

    const existingRelation: precondition | null =
      await this.prisma.precondition.findUnique({
        where: {
          dependent_task_id_independent_task_id: {
            dependent_task_id: dependent_task,
            independent_task_id: independent_task,
          },
        },
      });

    if (!existingRelation) {
      throw new ConflictException('Tasks are not attached');
    }

    await this.prisma.precondition.delete({
      where: {
        dependent_task_id_independent_task_id: {
          dependent_task_id: dependent_task,
          independent_task_id: independent_task,
        },
      },
    });
  }
}
