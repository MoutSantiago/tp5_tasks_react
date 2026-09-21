import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { project } from '@prisma/client';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

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
   * @returns {Promise<project[]>} Todos los proyectos de la base de datos
   */
  async getProjects(): Promise<project[]> {
    return await this.prisma.project.findMany();
  }

  /**
   * Metodo para crear nuevos proyectos en la base de datos
   *
   * @async
   * @param {CreateProjectDto} createProjectDto Datos de creación de proyectos
   * @returns {Promise<project>} Proyecto creado
   */
  async addProject(createProjectDto: CreateProjectDto): Promise<project> {
    return await this.prisma.project.create({ data: createProjectDto });
  }

  /**
   * Modifica la información de un proyecto en la base de datos
   *
   * @async
   * @param {number} id Id del proyecto a modificar
   * @param {UpdateProjectDto} updateProjectDto Datos a modificar en la base de datos
   */
  async modifyProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<void> {
    await this.prisma.project.update({ where: { id }, data: updateProjectDto });
  }

  /**
   * Elimina los datos de un proyecto de la base de datos
   *
   * @async
   * @param {number} id Id del proyecto a eliminar
   */
  async deleteProject(id: number): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }
}
