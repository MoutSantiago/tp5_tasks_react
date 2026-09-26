import Tag from "./Tag";
import { useModal } from "./modals/ModalProvider";

import type { JSX } from "react";
import type { Project, Sprint } from "../types/data";
import type { OnExecute } from "../types/props";
import { avanceSprint, cancelSprint } from "../api/sprint";

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
      <header className="card__header row-between">
        <span className="task__summary grow text-md">{project.name}</span>
        <button
          className="icon-button icon-button--accent"
          type="button"
          aria-label={`Editar ${project.name.toLowerCase()}`}
          onClick={() => openModal("editProject", { project, onExecute })}
        >
          <span aria-hidden="true">+</span>
        </button>
      </header>
      <div className="task__body">
        <p className="card__subtitle text-sm text-muted">
          {project.description}
        </p>
        <div className="card__body">
          <h3 className="task__id">Sprints</h3>
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
            <article className="sprint surface surface--raised radius-md">
              <span className="sprint__id">#{sprint.id}</span>
              <span className="text-md">{sprint.name}</span>
              <span className="grow text-md text-muted">{`
                ${sprint.start_date.toLocaleDateString("en-GB")}${
                  sprint.end_date
                    ? ` - ${sprint.end_date.toLocaleDateString("en-GB")}`
                    : ""
                }
              `}</span>
              <Tag value={sprint.status} type="state" />
              <button
                className="icon-button icon-button--accent"
                type="button"
                aria-label={`Avanzar sprint`}
                onClick={async () => {
                  await avanceSprint(sprint.id);
                  onExecute();
                }}
              >
                <span aria-hidden="true">{">"}</span>
              </button>
              <button
                className="icon-button icon-button--accent"
                type="button"
                aria-label={`Cancelar sprint`}
                onClick={async () => {
                  await cancelSprint(sprint.id);
                  onExecute();
                }}
              >
                <span aria-hidden="true">x</span>
              </button>
              <button
                className="icon-button icon-button--accent"
                type="button"
                aria-label={`Añadir sprint`}
                onClick={() =>
                  openModal("editSprint", {
                    sprint: sprint,
                    onExecute,
                  })
                }
              >
                <span aria-hidden="true">+</span>
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
