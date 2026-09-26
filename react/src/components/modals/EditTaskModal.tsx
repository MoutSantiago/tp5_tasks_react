import { useEffect, useState, type JSX, type SubmitEvent } from "react";
import { toast } from "sonner";
import type { EditTaskModalProps } from "../../types/props";
import type {
  Activity,
  EditTaskDto,
  Priority,
  TaskStatus,
  User,
} from "../../types/data";
import { loadUsers } from "../../api/user";
import { editTask } from "../../api/task";

/**
 * Componente modal con el formulario para modificar una tarea existente
 *
 * @prop {Task} task Tarea a modificar
 * @prop {Function} onClose Funcion para cerrar el modal
 * @prop {Function} onExecute Funcion a ejecutar luego de modificar la tarea
 */
export default function EditTaskModal({
  task,
  onClose,
  onExecute,
}: EditTaskModalProps): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const loaded: User[] = await loadUsers();
      setUsers(loaded);

      // La api devuelve el asignado como nombre, se busca su id para
      // dejar marcada la opcion correcta.
      const assignee: User | undefined = loaded.find(
        (user: User): boolean => user.name === task.assignee,
      );

      setAssigneeId(assignee ? String(assignee.id) : "");
    })();
  }, [task.assignee]);

  /**
   * Recopila los datos del formulario y los envia a la api.
   *
   * @param event - Evento de submit del formulario.
   */
  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const form: FormData = new FormData(event.currentTarget);
    const assignee: FormDataEntryValue | null = form.get("assignee_id");

    const data: EditTaskDto = {
      summary: String(form.get("summary") ?? ""),
      description: String(form.get("description") ?? ""),
      activity: form.get("activity") as Activity,
      priority: form.get("priority") as Priority,
      status: form.get("status") as TaskStatus,
      assignee_id: assignee ? Number(assignee) : null,
    };

    setSending(true);

    try {
      await editTask(task.id, data);
      toast.info("Tarea modificada");
      await onExecute();
      onClose();
    } catch {
      setSending(false);
    }
  };

  return (
    <div className="modal__background" onClick={() => onClose()}>
      <form
        className="modal card surface radius-lg shadow-card"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <header className="card__header">
          <h2 className="card__title">Editar tarea #{task.id}</h2>
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
              defaultValue={task.summary}
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
              defaultValue={task.description}
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
                defaultValue={task.activity}
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
                defaultValue={task.priority}
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
              <label className="field__label" htmlFor="task-status">
                Estado
              </label>
              <select
                className="field__input"
                id="task-status"
                name="status"
                defaultValue={task.status}
              >
                <option value="backlog">backlog</option>
                <option value="to_do">to do</option>
                <option value="in_progress">in progress</option>
                <option value="review">review</option>
                <option value="done">done</option>
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
                value={assigneeId}
                onChange={(event) => setAssigneeId(event.target.value)}
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
        </div>

        <footer className="form__actions">
          <button
            className="button"
            type="button"
            disabled={sending}
            onClick={() => onClose()}
          >
            Cancelar
          </button>
          <button
            className="button button--primary"
            type="submit"
            disabled={sending}
          >
            {sending ? "Guardando..." : "Guardar cambios"}
          </button>
        </footer>
      </form>
    </div>
  );
}
