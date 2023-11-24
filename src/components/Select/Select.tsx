import { useEffect, useState } from 'react';
import style from './Select.module.scss';
import { useMain } from '../../store/MainProvider';
import IWalletResponse from '../../models/WalletResponseModel';
import { WalletService } from '../../services/Wallet.service';
import { toast } from 'react-toastify';

function Select() {

    const { setIsGlobalLoading } = useMain();
    const [wallets, setWallets] = useState([] as IWalletResponse[]);

    async function GetAll() {
        setIsGlobalLoading(true);
        const result = await WalletService.GetAll();
        if (result.data.success === true) {
            setWallets((result.data.data));
        }
        else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
    }

    //useEffect(() => { GetAll() }, [])
    return (
        <select defaultValue="default" className={style.select} >
            <option value="default" disabled>Selecione uma de suas carteiras</option>
            {
                wallets?.map((wallet, key) => {
                    return <option key={key} value={wallet.walletId}>{wallet.name}</option>
                })
            }
        </select>
    )
}

export { Select }