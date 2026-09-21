import {
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { activity, priority, task_state } from '@prisma/client';

/**
 * Dto para editar una tarea
 */
export class EditTaskDto {
  @IsString()
  @MaxLength(150)
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(activity)
  @IsOptional()
  activity?: activity;

  @IsEnum(priority)
  @IsOptional()
  priority?: priority;

  @IsNumber()
  @IsOptional()
  sprint_id?: number;

  @IsNumber()
  @IsOptional()
  assignee_id?: number;

  @IsEnum(task_state)
  @IsOptional()
  status?: task_state;
}
