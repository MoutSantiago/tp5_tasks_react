import type { JSX } from "react";
import Tag from "./Tag";
import { selectTask } from "../types/selection";
import type { LinearTaskProps } from "../types/props";

/**
 * Tarea en formato compacto para listas, seleccionable al clickearla.
 *
 * @param task - Tarea a mostrar.
 */
export default function LinearTask({ task }: LinearTaskProps): JSX.Element {
  return (
    <article
      className={`task surface surface--raised radius-md ${
        task.closed_at ? "task--done" : ""
      }`}
      onClick={() => selectTask(task.id)}
    >
      <span className="task__id">#{task.id}</span>
      <span className="task__summary grow text-md">{task.summary}</span>
      <Tag value={task.activity} type="type" />
      <Tag value={task.status} type="state" />
      <Tag value={task.priority} type="proirity" />
    </article>
  );
}
