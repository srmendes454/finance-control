import { TextField, ThemeProvider, Zoom, useTheme } from '@mui/material';
import style from './ModalInsertWallet.module.scss';
import { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import { StyleMaterialUi } from '../../../utils/StyleMaterialUi/StyleMaterialUi';
import { TootipCancel } from '../../../utils/Tootips/TootpCancel';
import { TootipSave } from '../../../utils/Tootips/TootipSave';

function ModalInsertWallet() {
    const [name, setName] = useState("");
    const [revenue, setRevenue] = useState("");
    const [color, setColor] = useState("#335237");
    const outerTheme = useTheme();

    function InsertWallet(name: string, revenue: string, color: string){
        console.log(name, revenue, color)
    }

    return (
        <div className={style.container}>
            <div className={style.icon}>
                <span><i className="bi bi-wallet"></i></span>
                <h4>Cadastrar Carteira</h4>
            </div>
            <form className={style.form}>
                <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                    <TextField
                        className={style.input}
                        type="text"
                        value={name}
                        onChange={evento => setName(evento.target.value)}
                        id="name"
                        label="Nome"
                        variant='standard'
                    />
                    <TextField
                        className={style.revenue}
                        type="number"
                        value={revenue}
                        onChange={evento => setRevenue(evento.target.value)}
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
                    <i className="bi-x-circle"></i>
                </TootipCancel>
                </span>
                <span className={style.save}>
                <TootipSave TransitionComponent={Zoom} title="Salvar" placement="right">
                    <i className="bi bi-check-circle" onClick={() => InsertWallet(name, revenue, color)}></i>
                </TootipSave>
                </span>
            </div>
        </div>
    )
}

export { ModalInsertWallet }