import { useEffect, useState, type JSX, type SubmitEvent } from "react";
import { toast } from "sonner";
import type { ModalProps } from "../../types/props";
import type {
  Activity,
  AddTaskDto,
  Priority,
  Sprint,
  User,
} from "../../types/data";
import { loadSprints } from "../../api/sprint";
import { loadUsers } from "../../api/user";
import { addTask } from "../../api/task";

/**
 * Componente modal con el formulario para añadir nuevas tareas
 *
 * @prop {Function} onClose Funcion para cerrar el modal
 * @prop {Function} onExecute Funcion a ejecutar luego de crear la tarea
 */
export default function CreateTaskModal({
  onClose,
  onExecute,
}: ModalProps): JSX.Element {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      setSprints(await loadSprints());
      setUsers(await loadUsers());
    })();
  }, []);

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
    const assignee: FormDataEntryValue | null = form.get("assignee_id");

    const task: AddTaskDto = {
      summary: String(form.get("summary") ?? ""),
      description: String(form.get("description") ?? ""),
      activity: form.get("activity") as Activity,
      priority: form.get("priority") as Priority,
      sprint_id: Number(form.get("sprint_id")),
      reporter_id: Number(form.get("reporter_id")),
      assignee_id: assignee ? Number(assignee) : undefined,
    };

    await addTask(task);
    toast.info("Tarea añadida");
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
          <h2 className="card__title">Nueva tarea</h2>
        </header>

        <div className="card__body">
          <div className="field">
            <label className="field__label" htmlFor="task-summary">
              Titulo
            </label>
            <input
              className="field__input"
              id="task-summary"
              name="summary"
              type="text"
              placeholder="Resumen breve de la tarea"
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="task-description">
              Descripcion
            </label>
            <textarea
              className="field__input"
              id="task-description"
              name="description"
              placeholder="Detalles de la tarea"
            />
          </div>

          <div className="form__row">
            <div className="field">
              <label className="field__label" htmlFor="task-activity">
                Tipo
              </label>
              <select
                className="field__input"
                id="task-activity"
                name="activity"
              >
                <option value="bug">bug</option>
                <option value="feature">feature</option>
                <option value="improvement">improvement</option>
                <option value="task">task</option>
                <option value="documentation">documentation</option>
              </select>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="task-priority">
                Prioridad
              </label>
              <select
                className="field__input"
                id="task-priority"
                name="priority"
              >
                <option value="must">must</option>
                <option value="should">should</option>
                <option value="could">could</option>
                <option value="wont">wont</option>
              </select>
            </div>
          </div>

          <div className="form__row">
            <div className="field">
              <label className="field__label" htmlFor="task-sprint">
                Sprint
              </label>
              <select
                className="field__input"
                id="task-sprint"
                name="sprint_id"
              >
                {sprints.map(
                  (sprint: Sprint): JSX.Element => (
                    <option key={sprint.id} value={sprint.id}>
                      {sprint.name}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="task-assignee">
                Asignado a
              </label>
              <select
                className="field__input"
                id="task-assignee"
                name="assignee_id"
              >
                <option value="">Sin asignar</option>
                {users.map(
                  (user: User): JSX.Element => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="task-reporter">
              Reportado por
            </label>
            <select
              className="field__input"
              id="task-reporter"
              name="reporter_id"
            >
              {users.map(
                (user: User): JSX.Element => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        <footer className="form__actions">
          <button className="button" type="button" onClick={() => onClose()}>
            Cancelar
          </button>
          <button className="button button--primary" type="submit">
            Crear tarea
          </button>
        </footer>
      </form>
    </div>
  );
}
