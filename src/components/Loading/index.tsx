import { SavingsOutlined, AccountBalanceOutlined, AttachMoneyOutlined } from '@mui/icons-material';
import style from './Loading.module.scss';

export default function Loading() {
    return(
        <div className={style.loader}>
            <div className={style.icons}>
                <i><AttachMoneyOutlined/></i>
                <i><AccountBalanceOutlined/></i>
                <i><SavingsOutlined/></i>
            </div>
        </div>
    )
}