import { useNavigate } from 'react-router-dom';
import style from './Card.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import { MenuToggle } from '../MenuToggle/MenuToggle';
import { useState } from 'react';

interface CardProps {
    title?: string;
    typeCard?: string;
    price?: number;
    isDebit: boolean;
    purchaseDate?: number;
    borderColor?: string;
    color?: string;
    status?: string;
    route?: string;
}

function Card(Props: CardProps) {
    const { title, typeCard, price, isDebit, purchaseDate, borderColor, color, status, route } = Props;
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const navigate = useNavigate();

    const colorWallet = localStorage.getItem('borderColor')
    const handleNavigate = (route: string) => {
        navigate(route);
    }

    let colorStatus = '';
    function ColorStatusFatura(status: string) {
        if (status === 'Aberta') {
            return colorStatus = '#2158AA';
        } else if (status === 'Fechada') {
            return colorStatus = '#F39200'
        } else if (status === 'Atrasada') {
            return colorStatus = '#BD2323'
        } else if (status === 'Paga') {
            return colorStatus = '#12d725'
        }
    }

    return (
        <>
            <div className={style.card} style={{ borderColor: colorWallet ?? '#2C7333', backgroundColor: color ?? '#3C413C' }} onClick={() => handleNavigate(route ?? '')}>
                <div className={style.title}>
                    <h2 style={{ color: color === '#fff' ? '#000' : '#fff' }}>
                        {title}
                    </h2>
                    <div className={style.options}>
                        <MenuToggle onEditClick={() => { setOpenEdit(!openEdit) }} backgroundColor={color ?? '#3C413C'} />
                    </div>
                </div>
                <div className={style.value}>
                    <p style={{ color: color === '#fff' ? '#000' : '#fff' }}>{isDebit ? 'Valot total gasto no mes atual' : 'Valor total da Fatura Atual'}</p>
                    <h1 style={{ color: color === '#fff' ? '#000' : '#fff' }}>R$ {price?.toFixed(2)}</h1>
                </div>
                <div className={style.date} style={{ color: color === '#fff' ? '#000' : '#fff' }}>
                    <h4>{isDebit ? '' : 'Vence dia ' + purchaseDate}</h4>
                    <span style={{ background: ColorStatusFatura(status ?? '') }}>{isDebit ? '' : status}</span>

                </div>
                <h3 className={style.footer} style={{ color: color === '#fff' ? '#000' : '#fff' }}>{typeCard}</h3>
            </div>
        </>
    )
}

export { Card }