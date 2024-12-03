import { ReactNode, useState, useEffect } from "react";
import style from "./Modal.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClosedClick?: () => void;
  backgroundColor?: string;
  open?: boolean;
}

function Modal(props: ModalProps) {
  const { backgroundColor, children, onClosedClick, open } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [fadeClass, setFadeClass] = useState<string>("");

  const root = document.getElementById("root") as HTMLElement;
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setFadeClass(style.fadeIn);
    } else {
      setFadeClass(style.fadeOut);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [open]);

  return ReactDOM.createPortal(
    isVisible && (
      <div className={`${style.container} ${fadeClass}`}>
        <div
          className={style.modal}
          onClick={onClosedClick}
        >
          {children}
        </div>
      </div>
    ),
    root
  );
}

export { Modal };
