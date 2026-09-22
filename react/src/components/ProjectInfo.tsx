import type { JSX } from "react";
import type { Project } from "../types/data";

/**
 * Vista detallada de un proyecto, con su descripción y botón para editarlo.
 *
 * @param project - Proyecto a mostrar.
 * @param func - Acción para editar el proyecto.
 */
export default function ProjectInfo({
	project,
	func,
}: {
	project: Project;
	func: Function;
}): JSX.Element {
	return (
		<>
			<header className="card__header">
				<span className="task__id">#{project.id}</span>
				<span className="task__summary">{project.name}</span>
				<button
					className="icon-button icon-button--accent"
					type="button"
					aria-label={`Editar ${project.name.toLowerCase()}`}
					onClick={() => func()}
				>
					<span aria-hidden="true">+</span>
				</button>
			</header>
			<div className="task__body">
				<p className="card__subtitle">{project.description}</p>
				<div className="task__users-container"></div>
			</div>
			<footer className="card__footer">
				<span className="task__date">
					{project.created_at.toLocaleDateString("en-GB")}
				</span>
			</footer>
		</>
	);
}
