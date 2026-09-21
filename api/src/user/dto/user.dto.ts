import { IsString, Length } from 'class-validator';

/**
 * Dto con el unico dato necesario para crear usuarios
 */
export class UserDto {
  @IsString()
  @Length(3, 30)
  name: string;
}
