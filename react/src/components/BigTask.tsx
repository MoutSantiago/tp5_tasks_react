import Tag from "./Tag";
import { selectSprint, selectTask } from "../types/selection";
import type { JSX } from "react";
import type { Task, TaskStatus } from "../types/data";
import type { OnChangeStatus, OnExecute } from "../types/props";
import { useModal } from "./modals/ModalProvider";

const STATUSES: TaskStatus[] = [
  "backlog",
  "to_do",
  "in_progress",
  "review",
  "done",
];

/**
 * Vista detallada de una tarea, con sus etiquetas, responsables,
 * dependencias y fechas.
 *
 * @param task - Tarea a mostrar.
 * @param onExecute - Acción a ejecutar cuando se edita la tarea.
 * @param onChangeStatus - Acción a ejecutar cuando se cambia el estado.
 */
export default function BigTask({
  task,
  onExecute,
  onChangeStatus,
}: {
  task: Task;
  onExecute: OnExecute;
  onChangeStatus: OnChangeStatus;
}): JSX.Element {
  const { openModal } = useModal();

  /**
   * Pide el cambio de estado y avisa al padre para que actualice la tarea.
   *
   * @param event - Evento de cambio del select de estado.
   */
  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    onChangeStatus(task.id, event.target.value as TaskStatus);
  };

  return (
    <>
      <header className="card__header row-between">
        <span className="task__id">#{task.id}</span>
        <span className="task__summary grow text-md">{task.summary}</span>
        <Tag value={task.activity} type="type" />
        <select
          className="tag tag-state tag-select"
          aria-label="Estado de la tarea"
          value={task.status}
          onChange={handleStatusChange}
        >
          {STATUSES.map(
            (status: TaskStatus): JSX.Element => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
            ),
          )}
        </select>
        <Tag value={task.priority} type="proirity" />
        <button
          className="icon-button icon-button--accent"
          type="button"
          aria-label={`Editar ${task.summary.toLowerCase()}`}
          onClick={() => openModal("editTask", { task, onExecute })}
        >
          <span aria-hidden="true">+</span>
        </button>
      </header>
      <div className="task__body">
        <p className="card__subtitle text-sm text-muted">{task.description}</p>
        <div className="task__users-container flex gap-4">
          <div className="task__user grow">
            <span className="task__user--role text-xs font-medium">
              Creado por{" "}
            </span>
            <span className="task__user--name text-xs font-semibold">
              {task.reporter}
            </span>
          </div>
          <div className="task__user grow">
            <span className="task__user--role text-xs font-medium">
              Asignado a{" "}
            </span>
            <span className="task__user--name text-xs font-semibold">
              {task.assignee ?? "---"}
            </span>
          </div>
        </div>
        <p className="task__user--name text-xs font-semibold">Prerequisitos:</p>
        <div className="task__dependencies scroll-y">
          {task.dependencies.map((dependencie) => (
            <p
              key={dependencie.id}
              className="card__subtitle text-sm text-muted"
              onClick={() => selectTask(dependencie.id)}
            >
              {dependencie.summary}
            </p>
          ))}
        </div>
      </div>
      <footer className="card__footer flex justify-between">
        <span
          className="task__date text-xs font-medium"
          onClick={() => selectSprint(task.sprint.id)}
        >
          #{`${task.sprint.id} ${task.sprint.name}`}
        </span>
        <span className="task__date text-xs font-medium">
          {task.created_at.toLocaleDateString("en-GB")}
          {task.closed_at
            ? " - " + task.closed_at.toLocaleDateString("en-GB")
            : ""}
        </span>
      </footer>
    </>
  );
}
