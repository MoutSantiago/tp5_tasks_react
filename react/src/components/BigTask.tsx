import Tag from "./Tag";
import type { JSX } from "react";
import type { Task } from "../types/data";

/**
 * Vista detallada de una tarea, con sus etiquetas, responsables,
 * dependencias y fechas.
 *
 * @param task - Tarea a mostrar.
 * @param func - Acción para editar la tarea.
 */
export default function BigTask({
	task,
	func,
}: {
	task: Task;
	func: Function;
}): JSX.Element {
	return (
		<>
			<header className="card__header">
				<span className="task__id">#{task.id}</span>
				<span className="task__summary">{task.summary}</span>
				<Tag value={task.activity} type="type" />
				<Tag value={task.status} type="state" />
				<Tag value={task.priority} type="proirity" />
				<button
					className="icon-button icon-button--accent"
					type="button"
					aria-label={`Editar ${task.summary.toLowerCase()}`}
					onClick={() => func()}
				>
					<span aria-hidden="true">+</span>
				</button>
			</header>
			<div className="task__body">
				<p className="card__subtitle">{task.description}</p>
				<div className="task__users-container">
					<div className="task__user">
						<span className="task__user--role">Creado por </span>
						<span className="task__user--name">{task.reporter_id}</span>
					</div>
					<div className="task__user">
						<span className="task__user--role">Asignado a </span>
						<span className="task__user--name">
							{task.assignee_id ?? "---"}
						</span>
					</div>
				</div>
				<p className="task__user--name">Prerequisitos:</p>
				<div className="task__dependencies">
					<p className="card__subtitle">- Compra de materiales</p>
					<p className="card__subtitle">- Compra de materiales</p>
					<p className="card__subtitle">- Compra de materiales</p>
					<p className="card__subtitle">- Compra de materiales</p>
					<p className="card__subtitle">- Compra de materiales</p>
					<p className="card__subtitle">- Compra de materiales</p>
				</div>
			</div>
			<footer className="card__footer">
				<span className="task__date">Sprint #{task.sprint_id}</span>
				<span className="task__date">
					{task.created_at.toLocaleDateString("en-GB")}
					{task.closed_at
						? " - " + task.closed_at.toLocaleDateString("en-GB")
						: ""}
				</span>
			</footer>
		</>
	);
}
