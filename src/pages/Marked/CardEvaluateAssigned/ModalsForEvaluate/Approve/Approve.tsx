import { useState } from 'react';
import { Select } from '../../../../../components/Select/Select';
import IWalletResponse from '../../../../../models/WalletResponseModel';
import style from './Approve.module.scss';

interface ModalApproveProps {
    onClosedClick?: () => void;
    data?: any;
}

function Approve(props: ModalApproveProps) {
    const { onClosedClick, data } = props;
    const [wallets, setWallets] = useState([] as IWalletResponse[]);
    const [cards, setCards] = useState([] as any[]);

    return (
        <>
            <div className={style.container}>
                <div className={style.modal}>
                    <div className={style.title}>
                        <h5>Selecione aonde deseja adicionar a transação</h5>
                    </div>
                    <div className={style.form}>
                        <select defaultValue="default" className={style.select} >
                            <option value="default" disabled>Selecione uma de suas carteiras</option>
                            {
                                wallets?.map((wallet, key) => {
                                    return <option key={key} value={wallet.walletId}>{wallet.name}</option>
                                })
                            }
                        </select>
                        <select defaultValue="default" className={style.select} >
                            <option value="default" disabled>Selecione um de seus cartões</option>
                            {
                                cards?.map((card, key) => {
                                    return <option key={key} value={card.walletId}>{card.name}</option>
                                })
                            }
                        </select>
                        <div className={style.check}>
                            <input type="checkbox" id='check-1' />
                            <label htmlFor="check-1">Adicionar como boleto bancário</label>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button className={style.cancel} type='button' onClick={onClosedClick}><i className="bi-x-circle"></i> Cancelar</button>
                        <button className={style.save} type='submit' onClick={() => data}><i className="bi bi-check-circle"></i> Salvar</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export { Approve }