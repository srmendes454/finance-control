import React, { useState } from 'react';
import style from './Sidebar3d.module.scss';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { TooltipSidebar } from '../../utils/Tootips/TootipSidebar';
import { Zoom } from "@mui/material";
import { useMain } from '../../store/MainProvider';
import { toast } from 'react-toastify';

function Sidebar3d() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsGlobalLoading } = useMain();
    const [itens, setItens] = useState([
        {
            id: 1,
            background: '#3E6943',
            icon: "bi bi-wallet",
            route: "/wallet",
            iconSize: "",
            iconColor: "#FEFEFE",
            titleTootip: "Carteiras"
        },
        {
            id: 2,
            background: '#BB832E',
            icon: "bi bi-columns-gap",
            route: "/dasboard",
            iconSize: "",
            iconColor: "#FEFEFE",
            titleTootip: "Dasboard"
        },
        {
            id: 4,
            background: '#702BD1',
            icon: "bi bi-credit-card",
            route: "/cards",
            iconSize: "",
            iconColor: "#FEFEFE",
            titleTootip: "Cartões"
        },
        {
            id: 5,
            background: '#E9E9E9',
            icon: "bi bi-upc-scan",
            route: "/bank-slip",
            iconSize: "",
            iconColor: "#1E1E1E",
            titleTootip: "Boletos"
        },
        {
            id: 6,
            background: '#BD2323',
            icon: "bi bi-at",
            route: "/marked",
            iconSize: "2rem",
            iconColor: "#FEFEFE",
            titleTootip: "Marcações"
        },
        {
            id: 7,
            background: '#2B6DD1',
            icon: "bi bi-sliders",
            route: "/limits",
            iconSize: "1.5rem",
            iconColor: "#FEFEFE",
            titleTootip: "Limites"
        }
    ]);

    const handleNavigate = (item: any) => {
        navigate(item.route);
    }

    async function Logoff() {
        setIsGlobalLoading(true);
        const result = localStorage.getItem('token');
        if (result !== null) {
            localStorage.removeItem('token');
            toast.success('Até breve!', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                theme: "dark",
                onClose: () => window.location.href = "/login"
            });
        }
        else {
            toast.warning('Erro interno, contate o administrador ou tente novamente em alguns minutos.', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
    }

    return (
        <>
            <nav className={style.navigation}>
                <ul className={style.list}>
                    {itens.map((i, key) =>
                        <li key={key}
                            onClick={() => handleNavigate(i)} className={classNames({
                                [style.active]: location.pathname.match(i.route)
                            })}>
                            <TooltipSidebar TransitionComponent={Zoom} title={i.titleTootip} placement="right" color={i.background}>
                                <span className={style.icon} style={{ background: location.pathname.match(i.route) ? i.background : 'none', color: location.pathname.match(i.route) ? i.iconColor : '',  '--icon-color': i.background} as React.CSSProperties }>
                                    <i className={i.icon} style={{ fontSize: i.iconSize }}></i>
                                </span>
                            </TooltipSidebar>
                        </li>
                    )}
                </ul>
            </nav>
            <div className={style.logout}>
                <TooltipSidebar TransitionComponent={Zoom} title="Sair" placement="right">
                    <i className="bi bi-box-arrow-right" onClick={() => Logoff()}></i>
                </TooltipSidebar>
            </div>
        </>
    )
}

export { Sidebar3d }