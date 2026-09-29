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
  values,
  bars,
}: ChartProps): JSX.Element {
  const labels = bars.map(
    (_, index: number) =>
      bars.length - 1 - index === 0
        ? "Semana actual"
        : `Semana ${bars.length - 1 - index}`,
  );

  return (
    <>
      <header className="card__header row-between">
        <div className="card__title-block flex flex-col gap-1">
          <h2 className="card__title">{title}</h2>
          <p className="card__subtitle text-sm text-muted">{subtitle}</p>
        </div>
      </header>
      <div
        className="chart"
        role="img"
        aria-label={`Gráfico de barras de ${title.toLowerCase()}, de la semana más reciente a la más antigua: ${[...values].reverse().join(", ")}`}
      >
        {[...bars].reverse().map((value: number, index: number) => (
          <div
            key={index}
            aria-hidden="true"
            className="chart__bar"
            style={{ height: `${value}%` }}
          >
            <span className="bar__value text-lg">
              {values[bars.length - 1 - index]}
            </span>
          </div>
        ))}
      </div>
      <div className="chart__labels" aria-hidden="true">
        {labels.map((label: string, index: number) => (
          <span key={index} className="chart__label">
            {label}
          </span>
        ))}
      </div>
    </>
  );
}
