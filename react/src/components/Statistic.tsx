import type { JSX } from "react";
import type { StatisticProps } from "../types/props";

/**
 * Tarjeta de estadística que muestra un valor y su tendencia.
 *
 * @param title - Nombre de la estadística.
 * @param value - Valor numérico a destacar.
 * @param change - Variación en texto (ej. "+12%").
 * @param increasing - Indica si la variación es positiva.
 * @param select - Acción al clickear la tarjeta.
 */
export default function Statistic({
	title,
	value,
	change,
	increasing = true,
	select,
}: StatisticProps): JSX.Element {
	return (
		<article
			className="stat-card"
			onClick={() =>
				select({ type: "chart", task: undefined, project: undefined })
			}
		>
			<div className="stat-card__header">
				<h3 className="stat-card__title">{title}</h3>
				<span
					className={`stat-card__trend ${
						increasing ? "stat-card__trend--up" : "stat-card__trend--down"
					}`}
				>
					{change}
				</span>
			</div>
			<p className="stat-card__value">{value}</p>
		</article>
	);
}
