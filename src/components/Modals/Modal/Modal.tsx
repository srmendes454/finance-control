import { ReactNode, useState } from "react";
import style from "./Modal.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClosedClick?: () => void;
  backgroundColor?: string;
}

function Modal(props: ModalProps) {
  const { backgroundColor, children } = props;
  const [openConfirmCancel, setOpenConfirmCancel] = useState<boolean>(false);

  const root = document.getElementById("root") as HTMLElement;

  return ReactDOM.createPortal(
    <div className={style.container}>
      <div
        className={style.modal}
        style={{ backgroundColor: backgroundColor || "#2D332D" }}
      >
        {children}
      </div>
    </div>,
    root
  );
}

export { Modal };
