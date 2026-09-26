import LinearTask from "./LinearTask";

import type { JSX } from "react";
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
  const { openModal } = useModal();

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
        <button
          className="icon-button icon-button--accent"
          type="button"
          aria-label={`Añadir ${title.toLowerCase()}`}
          onClick={() => openModal("createTask", { onExecute })}
        >
          <span aria-hidden="true">+</span>
        </button>
      </header>
      <div className="card__body">
        {tasks.map(
          (task: Task): JSX.Element => (
            <LinearTask key={task.id} task={task} />
          ),
        )}
      </div>
    </section>
  );
}
