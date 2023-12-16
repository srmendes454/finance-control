import { useState } from 'react';
import IFamilyResponse from '../../../models/FamilyMemberResponseModel';
import style from './ModalList.module.scss';
import { CardList } from './card-list/CardList';
import { ModalInsert } from '../ModalInsert/ModalInsert';
import { FormFamilyMember } from '../../../forms/family-member/FormFamilyMember';

interface ModalListProps {
    title: string;
    onClosedClick?: () => void;
}

function ModalList(props: ModalListProps) {
    const { title, onClosedClick } = props;
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [familys, setFamilys] = useState([] as IFamilyResponse[]);
    const message = "Ao cancelar o cadastro, você perderá os dados preenchidos! Deseja continuar?";

    return (
        <>
            {openAdd && <ModalInsert onClosedClick={() => { setOpenAdd(false) }} title='Cadastrar Membro Familiar' icon='bi bi-people-fill' form={<FormFamilyMember />} isDeletedModal={false} titleModal='Cancelar Cadastro' messageModal={message}/>}
            <div className={style.container}>
                <div className={style.modal}>
                    <div className={style.close}><span onClick={onClosedClick}>Fechar</span></div>
                    <div className={style.function}>
                        <div className={style.title}><h3>{title}</h3></div>
                        <span className={style.iconSearch}><i className='bi bi-search'></i></span>
                        <span className={style.iconAdd}><i className="bi bi-plus-lg" onClick={() => { setOpenAdd(true) }}></i></span>
                    </div>
                    <main className={style.list}>
                        <CardList name="Felipe Andrade" kinship="Amigo" />
                        <CardList name="Ester Andrade Freitas Mendes" kinship="Irmã" />
                        <CardList name="Irani Sousa" kinship="Mãe" />
                        <CardList name="Gustavo Batista" kinship="Colega" />
                    </main>
                </div>
            </div>
        </>
    )
}

export { ModalList }