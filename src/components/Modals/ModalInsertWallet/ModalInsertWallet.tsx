import { TextField, ThemeProvider, Zoom, useTheme } from '@mui/material';
import style from './ModalInsertWallet.module.scss';
import { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import { StyleMaterialUi } from '../../../utils/StyleMaterialUi/StyleMaterialUi';
import { TootipCancel } from '../../../utils/Tootips/TootpCancel';
import { TootipSave } from '../../../utils/Tootips/TootipSave';
import { useMain } from '../../../store/MainProvider';
import { WalletService } from '../../../services/Wallet.service';
import IWalletInsert from '../../../models/WalletInsertModel';
import { toast } from 'react-toastify';

interface ModalInsertWalletProps {
    onClosedClick?: () => void;
}

function ModalInsertWallet(props: ModalInsertWalletProps) {
    const { onClosedClick } = props;
    const [name, setName] = useState("");
    const [income, setIncome] = useState<number>(0);
    const [color, setColor] = useState("#335237");
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    async function InsertWallet(data: IWalletInsert) {
        setIsGlobalLoading(true);
        const result = await WalletService.Insert(data);
        if (result.data.success === true) {     
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
        onClosedClick && onClosedClick();   
    }

    return (
        <div className={style.container}>
            <div className={style.modal}>
                <div className={style.icon}>
                    <span><i className="bi bi-wallet"></i></span>
                    <h4>Cadastrar Carteira</h4>
                </div>
                <form className={style.form}>
                    <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                        <TextField
                            error={name.length === 0}
                            className={style.input}
                            type="text"
                            value={name}
                            onChange={evento => setName(evento.target.value)}
                            id="name"
                            label="Nome"
                            variant='standard'
                        />
                        <TextField
                            error={income?.toString.length === 0}
                            className={style.setIncome}
                            type="number"
                            value={income}
                            onChange={evento => setIncome(Number(evento.target.value))}
                            id="revenue"
                            label="Receita mensal"
                            variant='standard'
                        />
                    </ThemeProvider>
                    <input
                        type="color"
                        value={color}
                        name='Cor'
                        onChange={evento => setColor(evento.target.value)}
                        id="color"
                        required
                    />
                </form>
                <div className={style.button}>
                    <span className={style.cancel}>
                        <TootipCancel TransitionComponent={Zoom} title="Cancelar" placement="left">
                            <i className="bi-x-circle" onClick={onClosedClick}></i>
                        </TootipCancel>
                    </span>
                    <span className={style.save}>
                        <TootipSave TransitionComponent={Zoom} title="Salvar" placement="right">
                            <i className="bi bi-check-circle" onClick={() => InsertWallet({name, color, income})}></i>
                        </TootipSave>
                    </span>
                </div>
            </div>
        </div>
    )
}

export { ModalInsertWallet }