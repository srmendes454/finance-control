import { IconButton } from "@mui/material";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import style from "./Welcome.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DoubleArrowOutlined } from "@mui/icons-material";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";

function Welcome() {
    return (
        <Layout
            header={<Header />}
            sidebar={<Sidebar />}
            card={
                <div className={style.cardWelcome}>
                    <h1 className={style.title}>
                        Bem-vindo
                        <h4 className={style.subtitle}>
                            INICIAR MINHA GESTÃO FINANCEIRA
                            <IconButton className={style.iconButton} href="/wallet">
                                <i><DoubleArrowOutlined /></i>
                            </IconButton>
                        </h4>
                    </h1>
                </div>
            }
        />
    )
}

export { Welcome }