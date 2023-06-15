import { Tooltip, TooltipProps, Zoom, styled, tooltipClasses } from "@mui/material";
import style from "./Sidebar.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useHref } from "react-router-dom";

function Sidebar() {
    const href = useHref("");
    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#2D332D',
            maxWidth: 300,
            height: "40px",
            color: '#2C7333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: theme.typography.pxToRem(15),
            fontWeight: 700,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            borderRight: '3px solid #2C7333'
        },
    }));

    return (
        <>
            <nav className={style.sidebar}>
                <ul className={style.list}>
                    <li className={style.itemList}>
                        <HtmlTooltip TransitionComponent={Zoom} title="Inicio" placement="right">
                            <a className={href.includes("/welcome") ? style.active : ""} href="/welcome">
                                <span className={style.icon}><i className="bi bi-house-fill"></i></span>
                            </a>
                        </HtmlTooltip>
                    </li>
                    <li className={style.itemList}>
                        <HtmlTooltip TransitionComponent={Zoom} title="Dashboard" placement="right">
                            <a className={href.includes("/dashboard") ? style.active : ""} href="/dashboard">
                                <span className={style.icon}><i className="bi bi-graph-up-arrow"></i></span>
                            </a>
                        </HtmlTooltip>
                    </li>
                    <li className={style.itemList}>
                        <HtmlTooltip TransitionComponent={Zoom} title="Minhas carteiras" placement="right">
                            <a className={href.includes("/wallet") ? style.active : ""} href="/wallet">
                                <span className={style.icon}><i className="bi bi-wallet"></i></span>
                            </a>
                        </HtmlTooltip>
                    </li>
                    <li className={style.itemList}>
                        <HtmlTooltip TransitionComponent={Zoom} title="Meus cartões" placement="right">
                            <a className={href.includes("/card") ? style.active : ""} href="/card">
                                <span className={style.icon}><i className="bi bi-credit-card-fill"></i></span>
                            </a>
                        </HtmlTooltip>
                    </li>
                    <li className={style.itemList}>
                        <HtmlTooltip TransitionComponent={Zoom} title="Meus boletos" placement="right">
                            <a className={href.includes("/bank-slip") ? style.active : ""} href="/bank-slip">
                                <span className={style.icon}><i className="bi bi-upc-scan"></i></span>
                            </a>
                        </HtmlTooltip>
                    </li>
                    <li className={style.itemList}>
                        <HtmlTooltip TransitionComponent={Zoom} title="Dinheiro em espécie" placement="right">
                            <a className={href.includes("/money") ? style.active : ""} href="/money">
                                <span className={style.icon}><i className="bi bi-coin"></i></span>
                            </a>
                        </HtmlTooltip>
                    </li>
                    <li className={style.itemList}>
                        <HtmlTooltip TransitionComponent={Zoom} title="Movimentações por Pix" placement="right">
                            <a className={href.includes("/pix") ? style.active : ""} href="/pix">
                                <span className={style.icon}><i className="bi bi-x-diamond-fill"></i></span>
                            </a>
                        </HtmlTooltip>
                    </li>
                </ul>
            </nav>
        </>

    )
}

export { Sidebar }
