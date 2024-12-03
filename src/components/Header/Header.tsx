import { IconButton } from "@mui/material";
import { NotificationsActive } from '@mui/icons-material';
import logo from '../../assets/img/LogoMinimalistaPrincipal.svg';
import style from "./Header.module.scss";
import { useState } from "react";
import { ModalUser } from "../Modals/ModalUser/ModalUser";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function Header() {
    const [avatar, setAvatar] = useState("");
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSelected = (open: boolean) => {
        setOpenAdd(!open);
    }

    function SaudacaoPorHorario(name: string): string {
        const horaAtual = new Date().getHours();

        if (horaAtual >= 6 && horaAtual < 12) {
            return `Bom dia, ${name}!`;
        } else if (horaAtual >= 12 && horaAtual < 18) {
            return `Boa Tarde, ${name}!`;
        } else {
            return `Boa Noite, ${name}!`;
        }
    }

    return (
        <>
            {openAdd && <ModalUser avatar={avatar === "" ? <span>RM</span> : <img src={avatar} alt="User" />} name="Rafael Mendes" email="faelmendesab12@gmail.com" onClosedClick={() => { setOpenAdd(false) }} />}
            <header className={style.header}>
                <div className={style.logo}>
                    <img src={logo} alt="Logo" onClick={() => navigate('/my-wallets')} />
                </div>
                <div className={style.notification}>
                    <IconButton className={style.icon}>
                        <NotificationsActive />
                    </IconButton>
                </div>
                <span className={style.saudacao}><p>{SaudacaoPorHorario("Rafael Mendes")}</p></span>
                <span onClick={() => handleSelected(openAdd)} className={classNames({
                    [style.active]: openAdd
                })}>
                    <div className={style.avatar}>
                        {avatar === "" ? <span>RM</span> : <img src={avatar} alt="User" />}
                    </div>
                </span>
            </header>
        </>
    )
}

export { Header }