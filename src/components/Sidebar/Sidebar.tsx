import { Fade, IconButton, Tooltip } from "@mui/material";
import style from "./Sidebar.module.scss";
import { Menu, House, AccountBalanceWallet, CreditCard, AttachMoney, Pix, Dashboard, DocumentScanner, NotificationsActive } from '@mui/icons-material';
import img from '../../assets/img/Imagem do WhatsApp de 2023-05-05 à(s) 19.54.54.webp';
import logo from '../../assets/img/Logo.svg';

function Sidebar() {
    return (
        <>
            <header className={style.header}>
                 <div className={style.logo}>
                     <img src={logo} alt="Logo"/>
                 </div>
                 <div className={style.avatar}>
                     <img src={img} alt="User"/>
                 </div>
                 <IconButton className={style.icon}>
                     <NotificationsActive />
                 </IconButton>
            </header>
            <nav className={style.sidebar}>
                <ul className={style.list}>
                    <li className={style.itemList}>
                        <a className={style.menu}>
                            <span className={style.icon}><Tooltip className={style.tooltip} title="Clique para expandir" placement="right"
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}><i><Menu /></i></Tooltip></span>
                            <span className={style.title}>Menu</span>
                        </a>
                    </li>
                    <li className={style.itemList}>
                        <a href="">
                            <span className={style.icon}><i><House /></i></span>
                            <span className={style.title}>Home</span>
                        </a>
                    </li>
                    <li className={style.itemList}>
                        <a href="">
                            <span className={style.icon}><i><Dashboard /></i></span>
                            <span className={style.title}>Dashboard</span>
                        </a>
                    </li>
                    <li className={style.itemList}>
                        <a href="">
                            <span className={style.icon}><i><AccountBalanceWallet /></i></span>
                            <span className={style.title}>Carteiras</span>
                        </a>
                    </li>
                    <li className={style.itemList}>
                        <a href="">
                            <span className={style.icon}><i><CreditCard /></i></span>
                            <span className={style.title}>Cartões</span>
                        </a>
                    </li>
                    <li className={style.itemList}>
                        <a href="">
                            <span className={style.icon}><i><DocumentScanner /></i></span>
                            <span className={style.title}>Boletos</span>
                        </a>
                    </li>
                    <li className={style.itemList}>
                        <a href="">
                            <span className={style.icon}><i ><AttachMoney /></i></span>
                            <span className={style.title}>Dinheiro</span>
                        </a>
                    </li>
                    <li className={style.itemList}>
                        <a href="">
                            <span className={style.icon}><i><Pix /></i></span>
                            <span className={style.title}>Pix</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>

    )
}

export { Sidebar }
