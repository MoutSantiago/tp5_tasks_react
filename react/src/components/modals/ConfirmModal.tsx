import type { JSX } from "react";
import type { ConfirmModalProps } from "../../types/props";
import { toast } from "sonner";

/**
 * Componente modal para confirmación de acción
 *
 * @prop {string} text Texto a mostrar como titulo
 * @prop {Function} onClose Funcion para cerrar el modal
 * @prop {Function} onExecute Funcion a ejecutar si se acepta
 */
export default function ConfirmModal({
  text,
  onClose,
  onExecute,
}: ConfirmModalProps): JSX.Element {
  return (
    <div className="modal__background" onClick={() => onClose()}>
      <div className="modal card surface radius-lg shadow-card">
        <header className="card__header">
          <h2 className="card__title text-wrap">{text}</h2>
        </header>

        <footer className="form__actions">
          <button
            className="button"
            type="button"
            title="Cancelar"
            onClick={() => {
              onClose();
              toast.warning("Se canceló la acción");
            }}
          >
            Cancelar
          </button>
          <button
            className="button button--primary"
            type="button"
            title="Aceptar"
            onClick={() => onExecute()}
          >
            Aceptar
          </button>
        </footer>
      </div>
    </div>
  );
}
