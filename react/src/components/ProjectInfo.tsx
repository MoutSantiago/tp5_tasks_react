import Tag from "./Tag";
import { useModal } from "./modals/ModalProvider";

import type { JSX } from "react";
import type { Project, Sprint } from "../types/data";
import type { OnExecute } from "../types/props";
import { avanceSprint, cancelSprint } from "../api/sprint";
import { toast } from "sonner";

/**
 * Vista detallada de un proyecto, con su descripción y botón para editarlo.
 *
 * @param project - Proyecto a mostrar.
 * @param func - Acción para editar el proyecto.
 */
export default function ProjectInfo({
  project,
  onExecute,
}: {
  project: Project;
  onExecute: OnExecute;
}): JSX.Element {
  const { openModal } = useModal();

  return (
    <>
      <header className="card__header card__header--detail card__header--project">
        <span className="task__summary detail__heading grow text-md">
          {project.name}
        </span>
        <button
          className="icon-button icon-button--accent"
          type="button"
          aria-label={`Editar ${project.name.toLowerCase()}`}
          onClick={() => openModal("editProject", { project, onExecute })}
        >
          <span aria-hidden="true">✎</span>
        </button>
      </header>
      <div className="task__body task__body--detail">
        <p className="card__subtitle text-sm text-muted">
          {project.description}
        </p>
        <div className="card__body card__body--detail">
          <h3 className="detail__title">Sprints</h3>
          <button
            className="icon-button icon-button--accent"
            type="button"
            aria-label={`Añadir sprint`}
            onClick={() =>
              openModal("createSprint", { project_id: project.id, onExecute })
            }
          >
            <span aria-hidden="true">+</span>
          </button>
          {project.sprints.map((sprint: Sprint) => (
            <article
              key={sprint.id}
              className="sprint surface surface--raised radius-md"
            >
              <span className="sprint__id">#{sprint.id}</span>
              <span className="sprint__name text-md">{sprint.name}</span>
              <span className="sprint__date grow text-md text-muted">{`
                ${sprint.start_date.toLocaleDateString("en-GB")}${
                  sprint.end_date
                    ? ` - ${sprint.end_date.toLocaleDateString("en-GB")}`
                    : ""
                }
              `}</span>
              <Tag value={sprint.status} type="state" />
              <button
                className="icon-button icon-button--ghost icon-button--sm"
                type="button"
                aria-label={`Avanzar sprint`}
                onClick={async () => {
                  await avanceSprint(sprint.id);
                  toast.success("Estado del sprint actualizado");
                  onExecute();
                }}
              >
                <span aria-hidden="true">{">"}</span>
              </button>
              <button
                className="icon-button icon-button--warning icon-button--sm"
                type="button"
                aria-label={`Cancelar sprint`}
                onClick={async () => {
                  await cancelSprint(sprint.id);
                  toast.success("Sprint cancelado");
                  onExecute();
                }}
              >
                <span aria-hidden="true">✕</span>
              </button>
              <button
                className="icon-button icon-button--accent icon-button--sm"
                type="button"
                aria-label={`Editar sprint`}
                onClick={() =>
                  openModal("editSprint", {
                    sprint: sprint,
                    onExecute,
                  })
                }
              >
                <span aria-hidden="true">✎</span>
              </button>
            </article>
          ))}
        </div>
      </div>
      <footer className="card__footer flex justify-between">
        <span className="task__date text-xs font-medium">
          {project.created_at.toLocaleDateString("en-GB")}
        </span>
      </footer>
    </>
  );
}
