export type Activity =
  | "bug"
  | "feature"
  | "improvement"
  | "task"
  | "documentation";
export type TaskStatus =
  | "backlog"
  | "to do"
  | "in progress"
  | "review"
  | "done";
export type Priority = "must" | "should" | "could" | "wont";
export type SprintStatus = "planned" | "active" | "completed" | "cancelled";

export type Task = {
  id: number;
  summary: string;
  description: string;
  activity: Activity;
  status: TaskStatus;
  priority: Priority;
  created_at: Date;
  closed_at: Date | undefined;
  sprint_id: number;
  reporter_id: number;
  assignee_id: number | undefined;
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

export type Project = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  sprints: Sprint[];
};

export type User = {
  id: number;
  name: string;
  created_at: Date;
};
