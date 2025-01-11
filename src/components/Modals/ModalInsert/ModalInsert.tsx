import { useState } from "react";
import style from "./ModalInsert.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ConfirmCancel } from "../ModalConfirmCancel/ConfirmCancel";
import { Modal } from "../Modal/Modal";

interface ModalInsertProps {
  onClosedClick?: () => void;
  open?: boolean;
  title?: string;
  icon?: string;
  messageModal?: string;
  titleModal?: string;
  isDeletedModal?: boolean;
  onSave?: () => void;
  children?: React.ReactNode;
}

function ModalInsert(props: ModalInsertProps) {
  const {
    open,
    onClosedClick,
    title,
    icon,
    messageModal,
    titleModal,
    isDeletedModal,
    children,
    onSave,
  } = props;
  const [openConfirmCancel, setOpenConfirmCancel] = useState<boolean>(false);

  return (
    <>
      <Modal open={open}>
        <div className={style.modal_container}>
          <div className={style.modal_header}>
            <i className={icon}></i>
            <h4>{title}</h4>
          </div>
          <div className={style.form}>
            {children}
          </div>
          <div className={style.button}>
            <button
              className={style.cancel}
              type="button"
              onClick={() => {
                setOpenConfirmCancel(true);
              }}
            >
              <i className="bi-x-circle"></i> Cancelar
            </button>
            <button className={style.save} type="button" onClick={onSave}>
              <i className="bi bi-check-circle"></i> Salvar
            </button>
          </div>
        </div>
      </Modal>
      {openConfirmCancel && (
        <ConfirmCancel
          onConfirm={() => {
            setOpenConfirmCancel(false);
            onClosedClick && onClosedClick();
          }}
          onClosedClick={() => {
            setOpenConfirmCancel(false);
          }}
          isDelete={isDeletedModal ?? false}
          title={titleModal ?? ""}
          message={messageModal ?? ""}
        />
      )}
    </>
  );
}

export { ModalInsert };
