import type { JSX } from "react";
import LinearTask from "./LinearTask";
import type { TaskListProps } from "../types/props";
import type { Task } from "../types/data";

/**
 * Sección que lista las tareas en formato compacto y permite agregar nuevas.
 *
 * @param title - Título de la sección.
 * @param tasks - Tareas a listar.
 * @param func - Acción para agregar una tarea.
 * @param select - Acción al seleccionar una tarea.
 */
export default function TaskList({
	title,
	tasks,
	func,
	select,
}: TaskListProps): JSX.Element {
	return (
		<section className="card card--tasks" aria-labelledby="task-list-title">
			<header className="card__header">
				<div className="card__header-title-group">
					<h2 id="task-list-title" className="card__title">
						{title}
					</h2>
					<span className="card__count">{tasks.length}</span>
				</div>
				<button
					className="icon-button icon-button--accent"
					type="button"
					aria-label={`Añadir ${title.toLowerCase()}`}
					onClick={() => func()}
				>
					<span aria-hidden="true">+</span>
				</button>
			</header>
			<div className="card__body">
				{tasks.map(
					(task: Task): JSX.Element => (
						<LinearTask key={task.id} task={task} select={select} />
					),
				)}
			</div>
		</section>
	);
}
