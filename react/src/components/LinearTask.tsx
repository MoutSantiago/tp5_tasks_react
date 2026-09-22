import type { JSX } from "react";
import Tag from "./Tag";
import type { LinearTaskProps } from "../types/props";

/**
 * Tarea en formato compacto para listas, seleccionable al clickearla.
 *
 * @param task - Tarea a mostrar.
 * @param select - Acción al seleccionar la tarea.
 */
export default function LinearTask({
	task,
	select,
}: LinearTaskProps): JSX.Element {
	return (
		<article
			className={`task ${task.closed_at ? "task--done" : ""}`}
			onClick={() => select({ type: "task", task: task, project: undefined })}
		>
			<span className="task__id">#{task.id}</span>
			<span className="task__summary">{task.summary}</span>
			<Tag value={task.activity} type="type" />
			<Tag value={task.status} type="state" />
			<Tag value={task.priority} type="proirity" />
		</article>
	);
}
