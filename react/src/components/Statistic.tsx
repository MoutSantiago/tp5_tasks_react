import type { JSX } from "react";
import { selectChart } from "../types/selection";
import type { StatisticProps } from "../types/props";

/**
 * Tarjeta de estadística que muestra un valor y su tendencia.
 *
 * @param title - Nombre de la estadística.
 * @param value - Valor numérico a destacar.
 * @param change - Variación en texto (ej. "+12%").
 * @param increasing - Indica si la variación es positiva.
 */
export default function Statistic({
	title,
	value,
	change,
	increasing = true,
}: StatisticProps): JSX.Element {
	return (
		<article
			className="stat-card surface radius-lg shadow-card hover-lift"
			onClick={selectChart}
		>
			<div className="stat-card__header row-between">
				<h3 className="stat-card__title text-sm text-muted font-medium">{title}</h3>
				<span
					className={`pill ${
						increasing ? "pill--success" : "pill--danger"
					}`}
				>
					{change}
				</span>
			</div>
			<p className="stat-card__value">{value}</p>
		</article>
	);
}
