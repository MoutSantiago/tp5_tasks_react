import type { Project, Task, User } from "./data";

export type TaskListProps = {
	title: string;
	tasks: Task[];
	func: Function;
	select: Function;
};

export type ChartProps = {
	title: string;
	subtitle: string;
	bars: number[];
};

export type ListItemProps = {
	title: string;
	subtitle?: string;
	func: Function;
};

export type ProjectItemProps = {
	project: Project;
	select: Function;
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
	select?: Function;
};

export type LinearTaskProps = {
	task: Task;
	select: Function;
};

export type StatisticProps = {
	title: string;
	value: number;
	change: string;
	increasing?: boolean;
	select: Function;
};

type TagType = "type" | "state" | "proirity";

export type TagProps = {
	value: string;
	type: TagType;
};
