import ListItem from "./ListItem";
import ProjectItem from "./ProjectItem";
import UserItem from "./UserItem";

import type { JSX } from "react";
import type { InfoCardProps, ListItemProps } from "../types/props";
import type { Project, User } from "../types/data";

/**
 * Tarjeta que muestra una lista de elementos: proyectos, usuarios o
 * elementos genéricos, y permite agregar más desde su encabezado.
 *
 * @param title - Título de la tarjeta.
 * @param values - Elementos genéricos a listar.
 * @param projects - Proyectos a listar, si se proveen tienen prioridad.
 * @param users - Usuarios a listar, si se proveen tienen prioridad sobre values.
 * @param func - Acción para agregar o editar elementos.
 */
export default function InfoCard({
	title,
	values,
	projects,
	users,
	func,
}: InfoCardProps): JSX.Element {
	const items: JSX.Element[] | undefined = projects
		? projects.map((project: Project) => (
				<ProjectItem key={project.id} project={project} />
			))
		: users
			? users.map((user: User) => (
					<UserItem key={user.id} user={user} func={func} />
				))
			: values
				? values.map((value: ListItemProps, index: number) => (
						<ListItem
							key={index}
							title={value.title}
							subtitle={value.subtitle ?? ""}
							func={value.func}
						/>
					))
				: undefined;

	const count: number =
		values?.length ?? projects?.length ?? users?.length ?? 0;

	return (
		<article className="card surface radius-lg shadow-card hover-lift">
			<header className="card__header row-between">
				<div className="card__header-title-group flex items-baseline gap-2 minw-0">
					<h2 className="card__title">{title}</h2>
					<span className="card__count pill pill--accent">{count}</span>
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
			<div className="card__body card__body--list">{items}</div>
		</article>
	);
}
