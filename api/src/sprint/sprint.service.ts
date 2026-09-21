import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { sprint, sprint_state } from '@prisma/client';
import { CreateSprintDto } from './dto/createSprint.dto';
import { ModifySprintDto } from './dto/modifySprint.dto';

@Injectable()
export class SprintService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtener el siguiente estado en el que deberia entrar el sprint
   *
   * @param {sprint_state} status Estado actual del sprint
   * @returns {sprint_state | undefined} Siguiente estado del sprint
   */
  private advanceStatus(
    status: sprint_state | undefined,
  ): sprint_state | undefined {
    switch (status) {
      case 'planned':
        return 'active';
      case 'active':
        return 'completed';
      default:
        return undefined;
    }
  }

  /**
   * Obtiene todos los sprints cargados en la base de datos
   *
   * @async
   * @returns {Promise<sprint[]>} Sprints encontrados
   */
  async getSprints(): Promise<sprint[]> {
    return await this.prisma.sprint.findMany();
  }

  /**
   * Crea un nuevo sprint con los datos dados y lo añade a la base de datos
   *
   * @async
   * @param {CreateSprintDto} createSprintDto Datos para crear un nuevo sprint
   * @returns {Promise<sprint>} Sprint creado
   */
  async addSprint(createSprintDto: CreateSprintDto): Promise<sprint> {
    return await this.prisma.sprint.create({ data: createSprintDto });
  }

  /**
   * Permite modificar los datos de un sprint y que se vea reflejado en la base de datos
   *
   * @async
   * @param {number} id Id del sprint que se quiere modificar
   * @param {ModifySprintDto} modifySprintDto Datos que se quieren cambiar del sprint
   */
  async modifySprint(
    id: number,
    modifySprintDto: ModifySprintDto,
  ): Promise<void> {
    await this.prisma.sprint.update({ where: { id }, data: modifySprintDto });
  }

  /**
   * Actualiza el estado del sprint en la base de datos, solo permite actualizar el estado hacia delante
   *
   * planned => active => completed
   *
   * @async
   * @param {number} id Id del sprint que se quiere avanzar
   * @returns {Promise<{status: sprint_state}>} Estado actualizado del sprint
   * @throws {NotFoundException} Cuando no se encuentra un sprint con ese id
   * @throws {ConflictException} Cuando el sprint ya esta en su estado mas avanzado o esta cancelado
   */
  async advanceSprint(id: number): Promise<{ status: sprint_state }> {
    const sprint: sprint | null = await this.prisma.sprint.findUnique({
      where: { id },
    });

    if (!sprint) throw new NotFoundException(`Sprint with id ${id} not found`);

    const nextStatus: sprint_state | undefined = this.advanceStatus(
      sprint?.status,
    );

    if (!nextStatus)
      throw new ConflictException(
        'Cannot advance a completed or canceled sprint',
      );

    await this.prisma.sprint.update({
      where: { id },
      data: {
        status: nextStatus,
        end_date: nextStatus === 'completed' ? new Date() : null,
      },
    });

    return { status: nextStatus };
  }

  /**
   * Cancela un sprint, modificando su estado en la base de datos
   * El sprint no puede tener los estado de cancelado o completado para que este cambio tenga efecto
   *
   * @async
   * @param {number} id Id del sprint que se va a cancelar
   * @throws {NotFoundException} Cuando no se encuentra un sprint con el id dado
   * @throws {ConflictException} Cuando el sprint que se quiere cancelar ya esta cancelado o completado
   */
  async cancelSprint(id: number): Promise<void> {
    const sprint: sprint | null = await this.prisma.sprint.findUnique({
      where: { id },
    });

    if (!sprint) throw new NotFoundException(`Sprint with id ${id} not found`);
    if (sprint.status === 'completed' || sprint.status === 'cancelled')
      throw new ConflictException(
        `Cannot cancel a completed or canceled sprint`,
      );

    await this.prisma.sprint.update({
      where: { id },
      data: { status: 'cancelled', end_date: new Date() },
    });
  }
}
