import type { Project, Task, User } from "./data";

export type TaskListProps = {
  title: string;
  tasks: Task[];
  func: Function;
};

export type ChartProps = {
  title: string;
  subtitle: string;
  values: number[];
  bars: number[];
};

export type ListItemProps = {
  title: string;
  subtitle?: string;
  func: Function;
};

export type ProjectItemProps = {
  project: Project;
};

export type UserItemProps = {
  user: User;
  func: Function;
};

export type InfoCardProps = {
  title: string;
  values?: ListItemProps[];
  projects?: Project[];
  users?: User[];
  func: Function;
};

export type LinearTaskProps = {
  task: Task;
};

export type StatisticProps = {
  title: string;
  value: number;
  change: string;
  increasing?: boolean;
};

type TagType = "type" | "state" | "proirity";

export type TagProps = {
  value: string;
  type: TagType;
};
