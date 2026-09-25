import type { JSX } from "react";
import { selectProject } from "../types/selection";
import type { ProjectItemProps } from "../types/props";

/**
 * Item de lista que representa un proyecto y es seleccionable.
 *
 * @param project - Proyecto a mostrar.
 */
export default function ProjectItem({ project }: ProjectItemProps): JSX.Element {
	return (
		<div className="list-item" onClick={() => selectProject(project.id)}>
			<div className="list-item__top row-between">
				<span className="list-item__title text-md font-medium">{project.name}</span>
			</div>
		</div>
	);
}