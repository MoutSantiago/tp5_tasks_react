import { IsEnum } from 'class-validator';
import { task_state } from '@prisma/client';

/**
 * Dto para cambiar el estado de una tarea
 */
export class StateTaskDto {
  @IsEnum(task_state)
  status: task_state;
}
