export type Selection =
  | { type: "chart" }
  | { type: "task"; taskId: number }
  | { type: "project"; projectId: number }
  | { type: "sprint"; sprintId: number };

type SelectHandler = (selection: Selection) => void;

let handler: SelectHandler = () => {};

export function bindSelection(onSelect: SelectHandler): void {
  handler = onSelect;
}

export function selectChart(): void {
  handler({ type: "chart" });
}

export function selectTask(taskId: number): void {
  handler({ type: "task", taskId });
}

export function selectProject(projectId: number): void {
  handler({ type: "project", projectId });
}

export function selectSprint(spritId: number): void {
  handler({ type: "sprint", sprintId: spritId });
}
