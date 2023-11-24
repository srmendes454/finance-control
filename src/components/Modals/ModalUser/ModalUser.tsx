import style from './ModalUser.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Zoom } from "@mui/material";
import { TootipModalUser } from '../../../utils/Tootips/TootipModalUser';
import { useState } from 'react';
import { ModalInsert } from '../ModalInsert/ModalInsert';
import { FormUpdateUser } from './form-update-user/FormUpdateUser';
import { ModalList } from '../ModalList/ModalList';
import IFamilyResponse from '../../../models/FamilyMemberResponseModel';

interface ModalUser {
    onClosedClick?: () => void;
    avatar: any;
    name: string;
    email: string;
}

function ModalUser(Props: ModalUser) {
    const { avatar, name, email, onClosedClick } = Props;
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openAddFamily, setOpenAddFamily] = useState<boolean>(false);
    return (
        <>
            {openAdd && <ModalInsert onClosedClick={() => { setOpenAdd(false) }} title='Editar meus dados' icon='bi bi-person-fill-gear' form={<FormUpdateUser/>} />}
            {openAddFamily && <ModalList onClosedClick={() => { setOpenAddFamily(false) }} title='Membros Familiares'/>}
            <div className={style.container}>
                <div className={style.modal}>
                    <div className={style.avatar}>{avatar}</div>
                    <div className={style.info}>
                        <h1>{name}</h1>
                        <h4>{email}</h4>
                    </div>
                    <div className={style.icons}>
                        <TootipModalUser TransitionComponent={Zoom} title="Configurações" placement="bottom">
                            <i className="bi bi-gear-fill"></i>
                        </TootipModalUser>
                        <TootipModalUser TransitionComponent={Zoom} title="Editar meus dados" placement="bottom">
                            <i className="bi bi-person-fill-gear" onClick={() => { setOpenAdd(true) }}></i>
                        </TootipModalUser>
                        <TootipModalUser TransitionComponent={Zoom} title="Gerenciar Membros Familiares" placement="bottom">
                            <i className="bi bi-people-fill" onClick={() => { setOpenAddFamily(true) }}></i>
                        </TootipModalUser>
                        <TootipModalUser TransitionComponent={Zoom} title="Sair" placement="bottom">
                            <i className="bi bi-door-closed-fill"></i>
                        </TootipModalUser>
                    </div>
                </div>
            </div>
        </>
    )

}

export { ModalUser }