import { IsString, Length, IsOptional } from 'class-validator';

/**
 * Dto con los datos para actualizar datos de proyectos existentes
 */
export class UpdateProjectDto {
  @IsString()
  @Length(3, 30)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
