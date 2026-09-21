import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { SprintModule } from './sprint/sprint.module';

@Module({
  imports: [PrismaModule, TaskModule, UserModule, ProjectModule, SprintModule],
})
export class AppModule {}
