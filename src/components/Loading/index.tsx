import { SavingsOutlined, AccountBalanceOutlined, AttachMoneyOutlined } from '@mui/icons-material';
import style from './Loading.module.scss';

function Loading() {
    return (
        <div className={style.container}>
            <div className={style.loader}>
                <div className={style.icons}>
                    <i><AttachMoneyOutlined /></i>
                    <i><AccountBalanceOutlined /></i>
                    <i><SavingsOutlined /></i>
                </div>
            </div>
        </div>
    )
}

export { Loading };