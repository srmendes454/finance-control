import { useState } from 'react';
import style from './Sidebar3d.module.scss';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { TooltipSidebar } from '../../../utils/Tootips/TootipSidebar';
import { Zoom } from "@mui/material";

function Sidebar3d() {
    const location = useLocation();
    const navigate = useNavigate();
    const [itens, setItens] = useState([
        {
            id: 1,
            background: '#2B6DD1',
            icon: "bi bi-house",
            route: "/welcome",
            iconSize: "",
            titleTootip: "Inicio"
        },
        {
            id: 2,
            background: '#BB832E',
            icon: "bi bi-columns-gap",
            route: "/dasboard",
            iconSize: "",
            titleTootip: "Dasboard"
        },
        {
            id: 3,
            background: '#3E6943',
            icon: "bi bi-wallet",
            route: "/wallet",
            iconSize: "",
            titleTootip: "Carteiras"
        },
        {
            id: 4,
            background: '#BD2323',
            icon: "bi bi-at",
            route: "/marked",
            iconSize: "2rem",
            titleTootip: "Marcações"
        }
    ]);

    const handleNavigate = (item: any) => {
        navigate(item.route);
    }

    return (
        <nav className={style.navigation}>
            <ul className={style.list}>
                {itens.map(i =>
                    <li key={i.id} onClick={() => handleNavigate(i)} className={classNames({
                        [style.active]: location.pathname.match(i.route)
                    })}>
                        <TooltipSidebar TransitionComponent={Zoom} title={i.titleTootip} placement="right">
                            <span className={style.icon} style={{ background: location.pathname.match(i.route) ? i.background : 'none' }}>
                                <i className={i.icon} style={{ fontSize: i.iconSize }}></i>
                            </span>
                        </TooltipSidebar>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export { Sidebar3d }