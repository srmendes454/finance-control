import style from './ModalUser.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Zoom } from "@mui/material";
import { TootipModalUser } from '../../../utils/Tootips/TootipModalUser';

interface ModalUser {
    name: string;
    email: string;
}

function ModalUser(Props: ModalUser) {
    const { name, email } = Props;
    return (
        <div className={style.container}>
            <h1>{name}</h1>
            <h4>{email}</h4>
            <div className={style.icons}>
                <TootipModalUser TransitionComponent={Zoom} title="Configurações" placement="bottom">
                    <i className="bi bi-gear-fill"></i>
                </TootipModalUser>
                <TootipModalUser TransitionComponent={Zoom} title="Editar meus dados" placement="bottom">
                    <i className="bi bi-person-fill-gear"></i>
                </TootipModalUser>
                <TootipModalUser TransitionComponent={Zoom} title="Sair" placement="bottom">
                    <i className="bi bi-door-closed-fill"></i>
                </TootipModalUser>
            </div>
        </div>
    )

}

export { ModalUser }