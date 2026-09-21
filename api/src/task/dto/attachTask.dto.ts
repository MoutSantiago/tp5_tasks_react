import { IsNumber, IsPositive } from 'class-validator';

/**
 * Dto para establecer dependencia entre tareas
 */
export class AttachTaskDto {
  @IsNumber()
  @IsPositive()
  dependent_task: number;

  @IsNumber()
  @IsPositive()
  independent_task: number;
}
