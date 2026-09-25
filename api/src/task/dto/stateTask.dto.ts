import { task_state } from '@prisma/client';
import { IsEnum } from 'class-validator';

/**
 * Dto para editar solamente el estado de una tarea
 */
export class StateTaskDto {
  @IsEnum(task_state)
  status: task_state;
}
