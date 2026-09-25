import type { JSX } from "react";
import type { ListItemProps } from "../types/props";

/**
 * Item genérico de una lista, con título, subtítulo y acción al clickearlo.
 *
 * @param title - Texto principal del item.
 * @param subtitle - Texto secundario opcional.
 * @param func - Acción al clickear el item.
 */
export default function ListItem({
	title,
	subtitle,
	func,
}: ListItemProps): JSX.Element {
	return (
		<div className="list-item" onClick={() => func()}>
			<div className="list-item__top row-between">
				<span className="list-item__title text-md font-medium">{title}</span>
			</div>
			<span className="list-item__subtitle text-xs text-muted">{subtitle}</span>
		</div>
	);
}
