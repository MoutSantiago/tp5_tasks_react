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
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { ProjectReturnDto } from './dto/projectReturn.dto';

/**
 * Controlador para gestionar los proyectos
 */
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * Obiene todos los proyectos
   *
   * @returns {Promise<ProjectReturnDto[]>} Proyectos encontrados
   */
  @Get()
  async getProjects(): Promise<ProjectReturnDto[]> {
    return await this.projectService.getProjects();
  }

  /**
   * Crea nuevos proyectos
   *
   * @param createProjectDto Datos para crear proyecto
   * @returns {Promise<ProjectReturnDto>} Proyecto creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectReturnDto> {
    return await this.projectService.addProject(createProjectDto);
  }

  /**
   * Modifica los datos de un proyecto
   *
   * @param id Id de lproyecto
   * @param updateProjectDto Datos a modificar
   * @return {Promise<ProjectReturnDto>} Proyecto editado
   */
  @Put(':id')
  async modifyProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectReturnDto> {
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
