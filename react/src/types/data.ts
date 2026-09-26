export type Activity =
  | "bug"
  | "feature"
  | "improvement"
  | "task"
  | "documentation";
export type TaskStatus =
  | "backlog"
  | "to_do"
  | "in_progress"
  | "review"
  | "done";
export type Priority = "must" | "should" | "could" | "wont";
export type SprintStatus = "planned" | "active" | "completed" | "cancelled";

export type AddTaskDto = {
  summary: string;
  description: string;
  activity: Activity;
  priority: Priority;
  sprint_id: number;
  reporter_id: number;
  assignee_id?: number;
};

export type EditTaskDto = {
  summary?: string;
  description?: string;
  activity?: Activity;
  status?: TaskStatus;
  priority?: Priority;
  assignee_id?: number | null;
};

export type Task = {
  id: number;
  summary: string;
  description: string;
  activity: Activity;
  status: TaskStatus;
  priority: Priority;
  created_at: Date;
  closed_at: Date | undefined;
  sprint: {
    id: number;
    name: string;
  };
  reporter: string;
  assignee: string | undefined;
  dependencies: {
    id: number;
    summary: string;
    closed: boolean;
  }[];
};

export type Sprint = {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date | undefined;
  status: SprintStatus;
  project_id: number;
};

export type AddProjectDto = {
  name: string;
  description?: string;
};

export type EditProjectDto = {
  name?: string;
  description?: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  sprints: Sprint[];
};

export type UserDto = {
  name: string;
};

export type User = {
  id: number;
  name: string;
  created_at: Date;
};
