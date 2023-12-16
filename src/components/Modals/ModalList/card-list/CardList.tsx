import { useState } from 'react';
import style from './CardList.module.scss';
import { ModalInsert } from '../../ModalInsert/ModalInsert';
import { FormFamilyMember } from '../../../../forms/family-member/FormFamilyMember';

interface CardListProps {
    name: string;
    kinship: string;
    modalEdit?: any;
}

function CardList(props: CardListProps) {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const { name, kinship } = props;
    const message = "Ao cancelar a edição, você perderá os dados preenchidos! Deseja continuar?";
    
    return (
        <>
            {openAdd && <ModalInsert onClosedClick={() => { setOpenAdd(false) }} title='Editar Membro Familiar' icon='bi bi-people-fill' form={<FormFamilyMember />} isDeletedModal={false} titleModal='Cancelar Edição' messageModal={message}/>}
            <div className={style.card}>
                <div className={style.function}>
                    <span className={style.iconEdit}><i className="bi bi-pencil-square" onClick={() => { setOpenAdd(true) }}></i></span>
                    <span className={style.iconTrash}><i className="bi bi-trash"></i></span>
                </div>
                <div className={style.info}>
                    <h3>{name}</h3>
                    <h5>{kinship}</h5>
                </div>
            </div>
        </>
    )
}

export { CardList }