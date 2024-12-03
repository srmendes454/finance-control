import { useState } from 'react';
import { ConfirmCancel } from '../Modals/ModalConfirmCancel/ConfirmCancel';
import style from './MenuToggle.module.scss';

interface ModalMenuToggleProps {
    onEditClick?: () => void;
    onSave?: () => void;
    backgroundColor: string;
}

function MenuToggle(props: ModalMenuToggleProps) {
    const { onEditClick, onSave, backgroundColor } = props;
    const [openConfirmCancel, setOpenConfirmCancel] = useState<boolean>(false);

    return (
        <>
            {openConfirmCancel && (
                <ConfirmCancel
                    onConfirm={() => {
                        setOpenConfirmCancel(false);
                        onSave && onSave()
                    }}
                    onClosedClick={() => {
                        setOpenConfirmCancel(false);
                    }}
                    isDelete={true}
                    title={"Excluir Registro!"}
                    message={"Ao Excluir o registro, você perderá os dados preenchidos! Deseja continuar?"}
                />
            )}
            <div className={style.container}>
                <nav className={style.wrapper}>
                    <div className={style.btn_pluss} style={{ color: backgroundColor == '#fff' ? '#1E1E1E' : '#FEFEFE' }}>
                        <ul>
                            <li>
                                <i className='bi bi-pencil-square' style={{ color: '#1875FF' }} onClick={onEditClick}></i>
                            </li>
                            <li>
                                <i className='bi bi-trash' style={{ color: '#BD2323' }} onClick={() => { setOpenConfirmCancel(true); }}></i>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export { MenuToggle }