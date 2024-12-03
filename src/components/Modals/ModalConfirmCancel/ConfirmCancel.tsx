import { Modal } from '../Modal/Modal';
import style from './ConfirmCancel.module.scss';

interface ModalConfirmCancelProps {
    onClosedClick?: () => void;
    onConfirm: () => void;
    isDelete: boolean;
    title: string;
    message: string;
}

function ConfirmCancel(props: ModalConfirmCancelProps) {
    const { onClosedClick, title, isDelete, message, onConfirm } = props;
    return (
        <Modal open={true}>
            <div className={style.modal}>
                <div className={style.title} style={{ backgroundColor: isDelete ? '#dc3535' : '#3E6943' }}>
                    {isDelete ? <i className='bi bi-trash'></i> : <i className='bi bi-megaphone'></i>}
                    <h5>{title}</h5>
                </div>
                <div className={style.paragraph}>
                    <p>{message}</p>
                </div>
                <div className={style.button}>
                    <button className={style.cancel} type='button' onClick={onClosedClick}><i className="bi-x-circle"></i> Não</button>
                    <button className={style.save} type='button' onClick={onConfirm}><i className="bi bi-check-circle"></i> Sim</button>
                </div>
            </div>
        </Modal>
    )
}

export { ConfirmCancel }