import { AttachMoneyOutlined } from "@mui/icons-material";
import style from "./Pill-Loading.module.scss";

function PillLoading() {
    return (
        <div className={style.container}>
            <i className={style.progressIcon}><AttachMoneyOutlined /></i>
            <div className={style.border}>
                <div className={style.progress}></div>
            </div>
        </div>
    )
}

export { PillLoading };