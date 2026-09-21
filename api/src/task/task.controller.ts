import {
  Controller,
  Get,
  Post,
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
import { task } from '@prisma/client';
import { EditTaskDto } from './dto/editTask.dto';

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
   */
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async editTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTaskDto: EditTaskDto,
  ): Promise<void> {
    await this.taskService.editTask(id, editTaskDto);
  }

  /**
   * Cierra una tarea
   *
   * @param {number} id Id de la tarea a cerrar
   */
  @Put('close/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async closeTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskService.closeTask(id);
  }
}
