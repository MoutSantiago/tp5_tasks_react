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
 */
export default function TaskList({
	title,
	tasks,
	func,
}: TaskListProps): JSX.Element {
	return (
		<section
			className="card card--tasks surface radius-lg shadow-card hover-lift"
			aria-labelledby="task-list-title"
		>
			<header className="card__header row-between">
				<div className="card__header-title-group flex items-baseline gap-2 minw-0">
					<h2 id="task-list-title" className="card__title">
						{title}
					</h2>
					<span className="card__count pill pill--accent">{tasks.length}</span>
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
						<LinearTask key={task.id} task={task} />
					),
				)}
			</div>
		</section>
	);
}
