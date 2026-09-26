import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";
import UserModal from "./UserModal";

const modals = {
  createTask: CreateTaskModal,
  editTask: EditTaskModal,
  createProject: CreateProjectModal,
  editProject: EditProjectModal,
  createUser: UserModal,
  editUser: UserModal,
};

type ModalType = keyof typeof modals;

/**
 * Props que recibe cada modal segun su tipo, sin `onClose` porque la
 * inyecta el provider.
 */
type ModalProps<T extends ModalType> = Omit<
  ComponentProps<(typeof modals)[T]>,
  "onClose"
>;

type ModalEntry = {
  [T in ModalType]: {
    type: T;
    props: ModalProps<T>;
  };
}[ModalType];

type ModalState = ModalEntry | null;

type ModalContextType = {
  openModal: <T extends ModalType>(type: T, props: ModalProps<T>) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);

  const openModal = <T extends ModalType>(type: T, props: ModalProps<T>) => {
    setModal({ type, props } as ModalState);
  };

  const closeModal = () => {
    setModal(null);
  };

  const renderModal = (): ReactNode => {
    if (!modal) return null;

    switch (modal.type) {
      case "createTask":
        return <CreateTaskModal {...modal.props} onClose={closeModal} />;

      case "editTask":
        return <EditTaskModal {...modal.props} onClose={closeModal} />;

      case "createProject":
        return <CreateProjectModal {...modal.props} onClose={closeModal} />;

      case "editProject":
        return <EditProjectModal {...modal.props} onClose={closeModal} />;

      case "createUser":
        return <UserModal {...modal.props} onClose={closeModal} />;

      case "editUser":
        return <UserModal {...modal.props} onClose={closeModal} />;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {renderModal()}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
}
