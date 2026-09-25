import type { $Enums } from '@prisma/client';

/**
 * Dto para la respuesta de las tareas, incluye un array con
 * el id y summary de cada una de sus dependencias
 */
export class TaskResponseDto {
  id: number;
  summary: string;
  description: string;
  activity: $Enums.activity | null;
  status: $Enums.task_state;
  priority: $Enums.priority;
  created_at: Date;
  closed_at: Date | null;
  sprint_id: number | null;
  reporter_id: number | null;
  assignee_id: number | null;
  dependencies: {
    id: number;
    summary: string;
    closed: boolean;
  }[];
}
