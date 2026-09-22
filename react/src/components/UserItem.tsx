import type { JSX } from "react";
import type { UserItemProps } from "../types/props";

/**
 * Item de lista que representa un usuario.
 *
 * @param user - Usuario a mostrar.
 * @param func - Acción al clickear el usuario.
 */
export default function UserItem({ user, func }: UserItemProps): JSX.Element {
	return (
		<div className="list-item" onClick={() => func()}>
			<div className="list-item__top">
				<span className="list-item__title">{user.name}</span>
			</div>
		</div>
	);
}
