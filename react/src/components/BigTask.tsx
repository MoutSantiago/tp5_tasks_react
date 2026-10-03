import Tag from "./Tag";
import { selectSprint, selectTask } from "../types/selection";
import type { JSX } from "react";
import type { Task, TaskStatus } from "../types/data";
import type { OnChangeStatus, OnExecute } from "../types/props";
import { useModal } from "./modals/ModalProvider";
import { deleteTask, detachDependencie } from "../api/task";
import { toast } from "sonner";

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
      <header className="card__header card__header--detail card__header--task">
        <span className="task__id detail__id">#{task.id}</span>
        <span className="task__summary detail__heading grow text-md">
          {task.summary}
        </span>
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
        <div className="button__container">
          <button
            className="icon-button icon-button--accent"
            type="button"
            title="Editar tarea"
            aria-label={`Editar ${task.summary.toLowerCase()}`}
            onClick={() => openModal("editTask", { task, onExecute })}
          >
            <span aria-hidden="true">✎</span>
          </button>
          <button
            className="icon-button icon-button--danger"
            type="button"
            title="Eliminar tarea"
            aria-label={`Eliminar ${task.summary.toLowerCase()}`}
            onClick={() =>
              openModal("confirmModal", {
                text: `Estas segurode eliminar la tarea ${task.summary}?`,
                onExecute: async () => {
                  await deleteTask(task.id);
                  toast.success("Tarea eliminada");
                  onExecute();
                },
              })
            }
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </header>
      <div className="task__body task__body--detail">
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
        <p className="detail__title text-xs font-semibold">Prerequisitos:</p>
        <button
          className="icon-button icon-button--accent"
          type="button"
          title="Añadir dependencia"
          aria-label={`Añadir dependencia`}
          onClick={() =>
            openModal("attachDependencie", { id: task.id, onExecute })
          }
        >
          <span aria-hidden="true">+</span>
        </button>
        <div className="task__dependencies">
          {task.dependencies.map((dependencie) => (
            <article
              key={dependencie.id}
              className={`sprint surface surface--raised radius-md ${dependencie.closed ? "task--done" : ""}`}
            >
              <span className="sprint__id">#{dependencie.id}</span>
              <span
                className="text-md sprint__name sprint__name--link"
                title="Ver detalles de la tarea"
                onClick={() => selectTask(dependencie.id)}
              >
                {dependencie.summary}
              </span>
              <button
                className="icon-button icon-button--danger icon-button--sm"
                type="button"
                title="Eliminar dependencia"
                aria-label={`Eliminar dependencia`}
                onClick={async () => {
                  openModal("confirmModal", {
                    text: "Estas seguro de querer eliminar esta dependencia?",
                    onExecute: async () => {
                      await detachDependencie({
                        dependent_task: task.id,
                        independent_task: dependencie.id,
                      });
                      toast.success("Dependencia eliminada");
                      onExecute();
                    },
                  });
                }}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </article>
          ))}
        </div>
      </div>
      <footer className="card__footer flex justify-between">
        <span
          className="task__date task__date--link text-xs font-medium"
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
