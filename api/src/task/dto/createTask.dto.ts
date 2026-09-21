import {
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { activity, priority } from '@prisma/client';

/**
 * Dto usado para cuando se quiere crear una nueva tarea
 */
export class CreateTaskDto {
  @IsString()
  @MaxLength(150)
  summary: string;

  @IsString()
  description: string;

  @IsEnum(activity)
  activity: activity;

  @IsEnum(priority)
  @IsOptional()
  priority?: priority;

  @IsNumber()
  @IsOptional()
  sprint_id?: number;

  @IsNumber()
  reporter_id: number;

  @IsNumber()
  @IsOptional()
  assignee_id?: number;
}
