import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Servicio que disponibiliza prisma en toda la aplicación
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  /**
   * Conecta con al base de datos
   */
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma initialized correctly');
  }

  /**
   * Se cesconecta cuando se destruye
   */
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma destroyed correctly');
  }
}
