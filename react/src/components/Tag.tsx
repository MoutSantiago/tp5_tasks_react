import type { JSX } from "react";
import type { TagProps } from "../types/props";

/**
 * Etiqueta visual que identifica un valor de una tarea según su tipo.
 *
 * @param value - Texto que se muestra en la etiqueta.
 * @param type - Categoría del valor, define el estilo aplicado.
 */
export default function Tag({ value, type }: TagProps): JSX.Element {
	let classes: string = "tag";
	if (type === "type") classes += " tag-type";
	else if (type === "state") classes += " tag-state";
	else classes += ` tag-priority--${value.toLowerCase()}`;

	return <span className={classes}>{value}</span>;
}
