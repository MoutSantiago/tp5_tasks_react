import type { JSX } from "react";
import type { ProjectItemProps } from "../types/props";

/**
 * Item de lista que representa un proyecto y es seleccionable.
 *
 * @param project - Proyecto a mostrar.
 * @param select - Acción al seleccionar el proyecto.
 */
export default function ProjectItem({
	project,
	select,
}: ProjectItemProps): JSX.Element {
	return (
		<div
			className="list-item"
			onClick={() =>
				select({ type: "project", project: project, task: undefined })
			}
		>
			<div className="list-item__top">
				<span className="list-item__title">{project.name}</span>
			</div>
			<span className="list-item__subtitle">{project.description}</span>
		</div>
	);
}
