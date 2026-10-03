import LinearTask from "./LinearTask";

import { useState, type ChangeEvent, type JSX } from "react";
import type { TaskListProps } from "../types/props";
import type { Task } from "../types/data";
import { useModal } from "./modals/ModalProvider";

/**
 * Sección que lista las tareas en formato compacto y permite agregar nuevas.
 *
 * @param title - Título de la sección.
 * @param tasks - Tareas a listar.
 * @param onExecute - Acción a ejecutar cuando se crea una tarea.
 */
export default function TaskList({
  title,
  tasks,
  onExecute,
}: TaskListProps): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const { openModal } = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <section
      className="card card--tasks surface radius-lg shadow-card hover-lift"
      aria-labelledby="task-list-title"
    >
      <header className="card__header row-between">
        <div className="card__header-title-group flex items-baseline gap-2 minw-0">
          <h2 id="task-list-title" className="card__title">
            {title}
          </h2>
          <span className="card__count pill pill--accent">{tasks.length}</span>
        </div>
        <div className="button__container">
          <input
            type="search"
            className="search"
            value={search}
            onChange={handleChange}
            placeholder="Buscar..."
            aria-label="Buscar tareas"
          />
          <button
            className="icon-button icon-button--accent"
            type="button"
            title={`Añadir ${title.toLowerCase()}`}
            aria-label={`Añadir ${title.toLowerCase()}`}
            onClick={() => openModal("createTask", { onExecute })}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </header>
      <div className="card__body">
        {tasks
          .filter(
            (task: Task): boolean =>
              task.summary
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              task.description
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()),
          )
          .map(
            (task: Task): JSX.Element => (
              <LinearTask key={task.id} task={task} />
            ),
          )}
      </div>
    </section>
  );
}
