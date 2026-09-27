import { useEffect, useState, type JSX, type SubmitEvent } from "react";
import { toast } from "sonner";
import type { AttachModalProps } from "../../types/props";
import type { Task } from "../../types/data";
import { attachDependencie, loadTasks } from "../../api/task";

/**
 * Componente modal con el formulario para establecer una dependencia entre tareas
 *
 * @prop {number} id Id de la tarea dependiente
 * @prop {Function} onClose Funcion para cerrar el modal
 * @prop {Function} onExecute Funcion a ejecutar luego de establecer la dependencia
 */
export default function AttachDependencieModal({
  id,
  onClose,
  onExecute,
}: AttachModalProps): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const loaded: Task[] = await loadTasks();
      setTasks(loaded);
    })();
  }, []);

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

    const independent_task = Number(form.get("independent"));

    await attachDependencie({ dependent_task: id, independent_task });
    toast.success("Dependencia creada");
    onExecute();
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
          <h2 className="card__title">Agregar dependencia</h2>
        </header>

        <div className="card__body">
          <div className="field">
            <label className="field__label" htmlFor="independent">
              Depende de
            </label>
            <select
              className="field__input"
              id="independent"
              name="independent"
            >
              {tasks.map(
                (task: Task): JSX.Element => (
                  <option key={task.id} value={task.id}>
                    {task.summary}
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
            Establecer dependencia
          </button>
        </footer>
      </form>
    </div>
  );
}
