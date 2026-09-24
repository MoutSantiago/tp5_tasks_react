import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { project } from '@prisma/client';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

/**
 * Controlador para gestionar los proyectos
 */
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * Obiene todos los proyectos
   *
   * @returns {Promise<project[]>} Proyectos encontrados
   */
  @Get()
  async getProjects(): Promise<project[]> {
    return await this.projectService.getProjects();
  }

  /**
   * Crea nuevos proyectos
   *
   * @param createProjectDto Datos para crear proyecto
   * @returns {Promise<project>} Proyecto creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<project> {
    return await this.projectService.addProject(createProjectDto);
  }

  /**
   * Modifica los datos de un proyecto
   *
   * @param id Id de lproyecto
   * @param updateProjectDto Datos a modificar
   * @return {Promise<project>} Proyecto editado
   */
  @Put(':id')
  async modifyProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<project> {
    return await this.projectService.modifyProject(id, updateProjectDto);
  }

  /**
   * Elimina un proyecto
   *
   * @param id Id del proyecto
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async endProject(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.projectService.deleteProject(id);
  }
}
