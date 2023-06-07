import { CardInfo } from "../../../components/CardInfo/CardInfo";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import style from "./Welcome.module.scss";

interface WelcomeProps {
    name?: string;
}

function Welcome(Props: WelcomeProps) {
    return (
        <div className={style.container}>
            <CardInfo />
            <Sidebar />
        </div>
    )
}

export { Welcome }