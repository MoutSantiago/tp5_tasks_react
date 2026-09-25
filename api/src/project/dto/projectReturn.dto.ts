import type { sprint } from '@prisma/client';

export class ProjectReturnDto {
  id: number;
  name: string;
  description: string | null;
  created_at: Date;
  sprints: sprint[];
}
