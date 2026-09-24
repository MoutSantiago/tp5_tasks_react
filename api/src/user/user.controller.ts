import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { app_user } from '@prisma/client';
import { UserDto } from './dto/user.dto';

/**
 * Controlador encargado de los usuarios
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Obtiene todos los usuarios
   *
   * @returns {Promise<app_user[]>} Lista de los usuarios
   */
  @Get()
  async getUsers(): Promise<app_user[]> {
    return await this.userService.getUsers();
  }

  /**
   * Crea un nuevo ususario
   *
   * @param userDto Datos del usuario
   * @returns {Promise<app_user>} Usuario creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() userDto: UserDto): Promise<app_user> {
    return await this.userService.addUser(userDto);
  }

  /**
   * Cambia el nombre de un usuario
   *
   * @param id Id del usuario
   * @param userDto Datos con el nuevo nombre
   * @return {Promise<app_user>} Usuario con el nombre cambiado
   */
  @Put(':id')
  async modifyName(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ): Promise<app_user> {
    return await this.userService.modifyName(id, userDto.name);
  }

  /**
   * Elimina un usuario
   *
   * @param id Id del usuario
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.removeUser(id);
  }
}
