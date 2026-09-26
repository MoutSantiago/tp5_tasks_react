import { useModal } from "./modals/ModalProvider";
import type { JSX } from "react";
import type { UserItemProps } from "../types/props";

/**
 * Item de lista que representa un usuario
 *
 * @prop {User} user Usuario a mostrar
 * @prop {OnExecute} onExecute Acción al editar usuario
 */
export default function UserItem({
  user,
  onExecute,
}: UserItemProps): JSX.Element {
  const { openModal } = useModal();
  return (
    <div
      className="list-item"
      onClick={() => openModal("editUser", { user, onExecute })}
    >
      <div className="list-item__top row-between">
        <span className="list-item__title text-md font-medium">
          {user.name}
        </span>
      </div>
    </div>
  );
}
