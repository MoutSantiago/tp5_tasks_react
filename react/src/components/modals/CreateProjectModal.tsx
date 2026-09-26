import { type JSX, type SubmitEvent } from "react";
import { toast } from "sonner";
import type { ModalProps } from "../../types/props";
import type { AddProjectDto } from "../../types/data";
import { addProject } from "../../api/project";

/**
 * Componente modal con el formulario para añadir nuevos proyectos
 *
 * @prop {Function} onClose Funcion para cerrar el modal
 * @prop {Function} onExecute Funcion a ejecutar luego de crear el proyecto
 */
export default function CreateProjectModal({
  onClose,
  onExecute,
}: ModalProps): JSX.Element {
  /**
   * Recopila los datos del formulario.
   *
   * @param event - Evento de submit del formulario.
   */
  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const form: FormData = new FormData(event.currentTarget);

    const project: AddProjectDto = {
      name: String(form.get("name")),
      description: String(form.get("description") ?? ""),
    };

    await addProject(project);
    toast.info("Proyecto creado");
    await onExecute();
    onClose();
  };

  return (
    <div className="modal__background" onClick={() => onClose()}>
      <form
        className="modal card surface radius-lg shadow-card"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <header className="card__header">
          <h2 className="card__title">Nuevo proyecto</h2>
        </header>

        <div className="card__body">
          <div className="field">
            <label className="field__label" htmlFor="project-name">
              Nombre
            </label>
            <input
              className="field__input"
              id="project-name"
              name="name"
              type="text"
              placeholder="Nombre del proyecto"
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="project-description">
              Descripción
            </label>
            <textarea
              className="field__input"
              id="project-description"
              name="description"
              placeholder="Descripción del proyecto"
            />
          </div>
        </div>

        <footer className="form__actions">
          <button className="button" type="button" onClick={() => onClose()}>
            Cancelar
          </button>
          <button className="button button--primary" type="submit">
            Crear proyecto
          </button>
        </footer>
      </form>
    </div>
  );
}
