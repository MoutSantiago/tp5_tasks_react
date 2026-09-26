import type { Project, Task, TaskStatus, User } from "./data";

export type TaskListProps = {
  title: string;
  tasks: Task[];
  onExecute: () => Promise<void>;
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
  onExecute: OnExecute;
};

export type InfoCardProps = {
  title: string;
  values?: ListItemProps[];
  projects?: Project[];
  users?: User[];
  onExecute: OnExecute;
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

/**
 * Accion que ejecuta un modal cuando termina su trabajo, normalmente
 * para recargar los datos que affecto.
 */
export type OnExecute = () => Promise<void> | void;

/**
 * Accion que cambia el estado de una tarea y actualiza los datos locales
 * sin volver a consultar la api.
 */
export type OnChangeStatus = (id: number, status: TaskStatus) => void;

export type ModalProps = {
  onClose: Function;
  onExecute: OnExecute;
};

export type UserModalProps = {
  user?: User;
  onClose: Function;
  onExecute: OnExecute;
};

export type EditTaskModalProps = {
  task: Task;
  onClose: Function;
  onExecute: OnExecute;
};

export type EditProjectModalProps = {
  project: Project;
  onClose: Function;
  onExecute: OnExecute;
};
