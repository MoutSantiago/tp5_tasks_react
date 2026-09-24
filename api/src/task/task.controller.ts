import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/createTask.dto';
import { task, task_state } from '@prisma/client';
import { EditTaskDto } from './dto/editTask.dto';
import { AttachTaskDto } from './dto/attachTask.dto';
import { StateTaskDto } from './dto/stateTask.dto';

/**
 * Controlador encargado de gestionar las tareas
 */
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Obtiene todas las tareas
   *
   * @returns {Promise<task[]>} Las tareas encontradas
   */
  @Get()
  async getTasks(): Promise<task[]> {
    return await this.taskService.getTasks();
  }

  /**
   * Obtiene una tarea mediante su id
   *
   * @param {number} id Id de la tarea buscada
   * @returns {Promise<task>} La tarea buscada
   */
  @Get(':id')
  async getTask(@Param('id', ParseIntPipe) id: number): Promise<task> {
    const task: task | null = await this.taskService.getTask(id);

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  /**
   * Crea una tarea nueva
   *
   * @param {CreateTaskDto} createTaskDto Datos para crear una tarea
   * @returns {Promise<task>} La tarea creada
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<task> {
    return await this.taskService.createTask(createTaskDto);
  }

  /**
   * Modifica los datos de una tarea
   *
   * @param {number} id Id de la tarea a modificar
   * @param {EditTaskDto} editTaskDto Datos a modificar
   * @return {Promise<task>} Tarea madificada
   */
  @Put(':id')
  async editTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTaskDto: EditTaskDto,
  ): Promise<task> {
    return await this.taskService.editTask(id, editTaskDto);
  }

  /**
   * Cambia el estado de una tarea
   *
   * @param id Id de la tarea
   * @param stateTaskDto Estado al que se quiere actualizar
   * @returns {status: task_state} Estado en el que quedó la tarea
   */
  @Put('state/:id')
  async changeState(
    @Param('id', ParseIntPipe) id: number,
    @Body() stateTaskDto: StateTaskDto,
  ): Promise<{ status: task_state }> {
    return await this.taskService.changeStatus(id, stateTaskDto.status);
  }

  /**
   * Cierra una tarea
   *
   * @param {number} id Id de la tarea a cerrar
   * @return {Promise<task>} Tarea madificada
   */
  @Put('close/:id')
  async closeTask(@Param('id', ParseIntPipe) id: number): Promise<task> {
    return await this.taskService.closeTask(id);
  }

  /**
   * Relaciona dos tareas mediante una dependencia
   *
   * @param {AttachTaskDto} attachTaskDto Ids de las tareas dependiente e independiente
   */
  @Post('/attach')
  @HttpCode(HttpStatus.CREATED)
  async attachTasks(@Body() attachTaskDto: AttachTaskDto): Promise<void> {
    await this.taskService.attachTask(attachTaskDto);
  }

  /**
   * Elimina la relación de dependencia entre dos tareas
   *
   * @param {Promise<void>} detachTaskDto Ids de las tareas dependiente e independiente
   */
  @Delete('/detach')
  @HttpCode(HttpStatus.NO_CONTENT)
  async detachTasks(@Body() detachTaskDto: AttachTaskDto): Promise<void> {
    await this.taskService.detachTask(detachTaskDto);
  }
}
