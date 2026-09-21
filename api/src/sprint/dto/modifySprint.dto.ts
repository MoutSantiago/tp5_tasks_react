import { IsString, Length, IsInt, IsOptional } from 'class-validator';

/**
 * Dto para editar un sprint
 */
export class ModifySprintDto {
  @IsString()
  @Length(3, 30)
  @IsOptional()
  name?: string;
}
