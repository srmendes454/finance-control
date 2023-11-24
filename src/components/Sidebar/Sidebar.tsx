import { Zoom } from "@mui/material";
import style from "./Sidebar.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useHref } from "react-router-dom";
import { TooltipSidebar } from "../../utils/Tootips/TootipSidebar";

function Sidebar() {
    const href = useHref("");

    return (
        <>
            <nav className={style.sidebar}>
                <ul className={style.list}>
                    <li className={style.itemList}>
                        <TooltipSidebar TransitionComponent={Zoom} title="Inicio" placement="right">
                            <a className={href.includes("/welcome") ? style.active : ""} href="/welcome">
                                <span className={style.icon}><i className="bi bi-house-fill"></i></span>
                            </a>
                        </TooltipSidebar>
                    </li>
                    <li className={style.itemList}>
                        <TooltipSidebar TransitionComponent={Zoom} title="Dashboard" placement="right">
                            <a className={href.includes("/dashboard") ? style.active : ""} href="/dashboard">
                                <span className={style.icon}><i className="bi bi-bar-chart-fill"></i></span>
                            </a>
                        </TooltipSidebar>
                    </li>
                    <li className={style.itemList}>
                        <TooltipSidebar TransitionComponent={Zoom} title="Otimizar salário" placement="right">
                            <a className={href.includes("/optimize-income") ? style.active : ""} href="/optimize-income">
                                <span className={style.icon}><i className="bi bi-pie-chart-fill"></i></span>
                            </a>
                        </TooltipSidebar>
                    </li>
                    <li className={style.itemList}>
                        <TooltipSidebar TransitionComponent={Zoom} title="Minhas carteiras" placement="right">
                            <a className={href.includes("/wallet") ? style.active : ""} href="/wallet">
                                <span className={style.icon}><i className="bi bi-wallet"></i></span>
                            </a>
                        </TooltipSidebar>
                    </li>
                    <li className={style.itemList}>
                        <TooltipSidebar TransitionComponent={Zoom} title="Marcações" placement="right">
                            <a className={href.includes("/card") ? style.active : ""} href="/marcacoes">
                                <span className={style.iconMarking}><i className="bi bi-at"></i></span>
                            </a>
                        </TooltipSidebar>
                    </li>
                </ul>
            </nav>
        </>

    )
}

export { Sidebar }
