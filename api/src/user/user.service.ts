import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { app_user } from '@prisma/client';
import { UserDto } from './dto/user.dto';

/**
 * Servicio encargado de la logica relacioanda a los usuarios
 */
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca en la base de datos todos los usuarios existentes y retorna su información
   *
   * @async
   * @returns Usuarios encontrados
   */
  async getUsers(): Promise<app_user[]> {
    return await this.prisma.app_user.findMany();
  }

  /**
   * Crea un nuevo usuario y lo añade a la base de datos
   *
   * @async
   * @param {UserDto} createUserDto Datos para crear al ususario
   * @returns {Promise<app_user>} El ususario creado
   */
  async addUser(createUserDto: UserDto): Promise<app_user> {
    return await this.prisma.app_user.create({ data: createUserDto });
  }

  /**
   * Modifica el parametro nombre de un ususario seleccionado mediante id
   *
   * @async
   * @param {number} id Id del usuario a modificar
   * @param {string} name Nombre que se desea poner
   * @return {Promise<user>} Usuario modificado
   */
  async modifyName(id: number, name: string): Promise<app_user> {
    return await this.prisma.app_user.update({ where: { id }, data: { name } });
  }

  /**
   * Elimina los datos de un usuario de la base de datos
   *
   * @async
   * @param {number} id Id del usuario a eliminar
   */
  async removeUser(id: number): Promise<void> {
    await this.prisma.app_user.delete({ where: { id } });
  }
}
