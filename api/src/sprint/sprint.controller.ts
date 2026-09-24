import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { sprint, sprint_state } from '@prisma/client';
import { CreateSprintDto } from './dto/createSprint.dto';
import { ModifySprintDto } from './dto/modifySprint.dto';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  /**
   * Obiente los sprints
   *
   * @returns {Promise<sprint[]>} Los sprints
   */
  @Get()
  async getSprints(): Promise<sprint[]> {
    return await this.sprintService.getSprints();
  }

  /**
   * Crea un nuevo sprint
   *
   * @param createSprintDto Datos para crear un nuevo sprint
   * @returns {Promise<sprint>} El sprint creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addSprint(@Body() createSprintDto: CreateSprintDto): Promise<sprint> {
    return await this.sprintService.addSprint(createSprintDto);
  }

  /**
   * Modifica los datos de un sprint
   *
   * @param id Id del sprint
   * @param modifySprintDto Datos para actualizar
   * @return {sprint} Sprint modificado
   */
  @Put(':id')
  async modifySprint(
    @Param('id', ParseIntPipe) id: number,
    @Body() modifySprintDto: ModifySprintDto,
  ): Promise<sprint> {
    return await this.sprintService.modifySprint(id, modifySprintDto);
  }

  /**
   * Actualiza el estado de un sprint
   *
   * @param id Id del sprint
   * @returns {Promise<{ status: sprint_state }>} Status actualizado
   */
  @Put('advance/:id')
  async advanceSprint(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ status: sprint_state }> {
    return await this.sprintService.advanceSprint(id);
  }

  /**
   * Permiote cancelar un sprint
   *
   * @param {number} id Id del sprint
   */
  @Put('cancel/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelSprint(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.sprintService.cancelSprint(id);
  }
}
