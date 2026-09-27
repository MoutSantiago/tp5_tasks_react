import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { ProjectReturnDto } from './dto/projectReturn.dto';

/**
 * Servicio con la logica para manejar los datos de los proyectos
 */
@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene todos los proyectos presentes en la base de datos
   *
   * @async
   * @returns {Promise<ProjectReturnDto[]>} Todos los proyectos de la base de datos
   */
  async getProjects(): Promise<ProjectReturnDto[]> {
    return await this.prisma.project.findMany({
      orderBy: { id: 'asc' },
      include: {
        sprints: { orderBy: { id: 'asc' } },
      },
    });
  }

  /**
   * Metodo para crear nuevos proyectos en la base de datos
   *
   * @async
   * @param {CreateProjectDto} createProjectDto Datos de creación de proyectos
   * @returns {Promise<ProjectReturnDto>} Proyecto creado
   */
  async addProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectReturnDto> {
    return await this.prisma.project.create({
      data: createProjectDto,
      include: {
        sprints: {},
      },
    });
  }

  /**
   * Modifica la información de un proyecto en la base de datos
   *
   * @async
   * @param {number} id Id del proyecto a modificar
   * @param {UpdateProjectDto} updateProjectDto Datos a modificar en la base de datos
   * @return {Promise<ProjectReturnDto>} Proyecto con los valores modificados
   */
  async modifyProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectReturnDto> {
    return await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      include: {
        sprints: {},
      },
    });
  }

  /**
   * Elimina los datos de un proyecto de la base de datos usando
   * una transacción, que se asegura que todo se elimine correctamente
   * en el siguiente orden:
   * - Dependencias de tareas
   * - Tareas
   * - Sprints
   * - Proyecto
   *
   * @async
   * @param {number} id Id del proyecto a eliminar
   */
  async deleteProject(id: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const sprintsId = (
        await tx.sprint.findMany({
          where: { project_id: id },
          select: { id: true },
        })
      ).map((sprint) => sprint.id);

      const tasksId = (
        await tx.task.findMany({
          where: { sprint_id: { in: sprintsId } },
          select: { id: true },
        })
      ).map((task) => task.id);

      await tx.precondition.deleteMany({
        where: {
          OR: [
            { independent_task_id: { in: tasksId } },
            { dependent_task_id: { in: tasksId } },
          ],
        },
      });

      await tx.task.deleteMany({ where: { id: { in: tasksId } } });

      await tx.sprint.deleteMany({ where: { id: { in: sprintsId } } });

      await tx.project.delete({ where: { id } });
    });
  }
}
