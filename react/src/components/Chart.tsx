import type { JSX } from "react";
import type { ChartProps } from "../types/props";

/**
 * Gráfico de barras que resume el rendimiento de las últimas semanas.
 *
 * @param title - Título del gráfico.
 * @param subtitle - Texto secundario aclaratorio.
 * @param bars - Valores (0-100) que determinan la altura de cada barra.
 */
export default function Chart({
	title = "Actividad",
	subtitle = "Rendimiento de las últimas semanas",
	bars = [62, 78, 55, 90, 70, 96, 84],
}: ChartProps): JSX.Element {
	return (
		<>
			<header className="card__header">
				<div className="card__title-block">
					<h2 className="card__title">{title}</h2>
					<p className="card__subtitle">{subtitle}</p>
				</div>
			</header>
			<div
				className="chart"
				role="img"
				aria-label={`Gráfico de barras de ${title.toLowerCase()}: ${bars.join(", ")}`}
			>
				{bars.map((value: number, index: number) => (
					<div
						key={index}
						aria-hidden="true"
						className="chart__bar"
						style={{ height: `${value}%` }}
					/>
				))}
			</div>
		</>
	);
}
