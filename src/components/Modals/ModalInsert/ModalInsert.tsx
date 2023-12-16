import { useState } from 'react';
import style from './ModalInsert.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ConfirmCancel } from '../ModalConfirmCancel/ConfirmCancel';

interface ModalInsertProps {
    onClosedClick?: () => void;
    title?: string;
    icon?: string;
    form?: any;
    data?: any;
    backgroundColor?: string;
    messageModal?: string;
    titleModal?: string;
    isDeletedModal?: boolean;
}

function ModalInsert(props: ModalInsertProps) {
    const { onClosedClick, title, icon, form, data, backgroundColor, messageModal, titleModal, isDeletedModal } = props;
    const [openConfirmCancel, setOpenConfirmCancel] = useState<boolean>(false);

    return (
        <>
            <div className={style.container}>
                <div className={style.modal} style={{ backgroundColor: backgroundColor || '#2D332D' }}>
                    <div className={style.icon}>
                        <span><i className={icon}></i></span>
                        <h4>{title}</h4>
                    </div>
                    <div className={style.form}>
                        {form}
                    </div>
                    <div className={style.button}>
                        <button className={style.cancel} type='button' onClick={() => { setOpenConfirmCancel(true) }}><i className="bi-x-circle"></i> Cancelar</button>
                        <button className={style.save} type='submit' onClick={() => data}><i className="bi bi-check-circle"></i> Salvar</button>
                    </div>
                </div>
            </div>
            {openConfirmCancel && <ConfirmCancel onClosedClick={() => { setOpenConfirmCancel(false) }} isDelete={ isDeletedModal ?? false} title={titleModal ?? ""} message={messageModal ?? ""} />}
        </>
    )
}

export { ModalInsert }