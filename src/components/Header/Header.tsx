import { IconButton } from "@mui/material";
import { NotificationsActive } from '@mui/icons-material';
import img from '../../assets/img/Imagem do WhatsApp de 2023-05-05 à(s) 19.54.54.webp';
import logo from '../../assets/img/Logo.svg';
import style from "./Header.module.scss";

function Header() {
    return (
        <>
            <header className={style.header}>
                <div className={style.logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={style.notification}>
                    <IconButton className={style.icon}>
                        <NotificationsActive />
                    </IconButton>
                </div>
                <div className={style.avatar}>
                    <img src={img} alt="User" />
                </div>
            </header>
        </>
    )
}

export { Header }