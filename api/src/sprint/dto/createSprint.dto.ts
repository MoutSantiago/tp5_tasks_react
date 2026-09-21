import { IsString, Length, IsInt } from 'class-validator';

/**
 * Dto para crear un nuevo sprint
 */
export class CreateSprintDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsInt()
  project_id: number;
}
