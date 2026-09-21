import { IsString, Length } from 'class-validator';

/**
 * Dto con los datos para crear nuevos proyectos
 */
export class CreateProjectDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  description: string;
}
