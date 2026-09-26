import { type JSX, type SubmitEvent } from "react";
import { toast } from "sonner";
import type { SprintModalProps } from "../../types/props";
import { addSprint, editSprint } from "../../api/sprint";

/**
 * Componente modal con el formulario para añadir nuevos sprints
 *
 * @prop {Function} onClose Funcion para cerrar el modal
 * @prop {Function} onExecute Funcion a ejecutar luego de crear el sprint
 */
export default function SprintModal({
  project_id,
  sprint,
  onClose,
  onExecute,
}: SprintModalProps): JSX.Element {
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

    if (project_id) {
      await addSprint({
        name: String(form.get("name")),
        project_id: project_id,
      });
      toast.info("Sprint creado");
    }

    if (sprint) {
      await editSprint(sprint.id, {
        name: String(form.get("name")),
      });
      toast.info("Sprint modificado");
    }

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
          <h2 className="card__title">
            {project_id ? "Nuevo sprint" : "Modificar sprint"}
          </h2>
        </header>

        <div className="card__body">
          <div className="field">
            <label className="field__label" htmlFor="sprint-name">
              Nombre
            </label>
            <input
              className="field__input"
              id="sprint-name"
              name="name"
              type="text"
              placeholder="Nombre del sprint"
              defaultValue={sprint ? sprint.name : ""}
            />
          </div>
        </div>

        <footer className="form__actions">
          <button className="button" type="button" onClick={() => onClose()}>
            Cancelar
          </button>
          <button className="button button--primary" type="submit">
            {project_id ? "Crear sprint" : "Modificar sprint"}
          </button>
        </footer>
      </form>
    </div>
  );
}
