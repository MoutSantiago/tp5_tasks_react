import { type JSX, type SubmitEvent } from "react";
import { toast } from "sonner";
import type { UserModalProps } from "../../types/props";
import type { UserDto } from "../../types/data";
import { addUser, editUser } from "../../api/user";

/**
 * Componente modal con el formulario para añadir nuevos ususario
 *
 * @prop {Function} onClose Funcion para cerrar el modal
 * @prop {Function} onExecute Funcion a ejecutar luego de crear al ussuario
 */
export default function UserModal({
  user,
  onClose,
  onExecute,
}: UserModalProps): JSX.Element {
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

    const userData: UserDto = {
      name: String(form.get("name")),
    };

    if (!user) {
      await addUser(userData);
      toast.info("Usuario creado");
    } else {
      await editUser(user.id, userData);
      toast.info("Usuario modificado");
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
            {user ? "Editar ususario" : "Nuevo usuario"}
          </h2>
        </header>

        <div className="card__body">
          <div className="field">
            <label className="field__label" htmlFor="user-name">
              Nombre
            </label>
            <input
              className="field__input"
              id="user-name"
              name="name"
              type="text"
              placeholder="Nombre del ususario"
              defaultValue={user ? user.name : ""}
            />
          </div>
        </div>

        <footer className="form__actions">
          <button className="button" type="button" onClick={() => onClose()}>
            Cancelar
          </button>
          <button className="button button--primary" type="submit">
            {user ? "Modificar ususario" : "Crear usuario"}
          </button>
        </footer>
      </form>
    </div>
  );
}
