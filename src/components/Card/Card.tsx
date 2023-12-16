import { useNavigate } from 'react-router-dom';
import style from './Card.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";

interface CardProps {
    title?: string;
    typeCard?: string;
    price?: number;
    wallet: boolean;
    purchaseDate?: number;
    borderColor?: string;
    color?: string;
    textColor?: string;
}

function Card(Props: CardProps) {
    const { title, typeCard, price, wallet, purchaseDate, borderColor, color, textColor } = Props;
    const navigate = useNavigate();

    const handleNavigate = (route: string) => {
        localStorage.setItem('borderColor', borderColor ?? '#2C7333')
        navigate(route);
    }
    
    return (
        <>
            <div className={style.card} style={{ borderColor: borderColor ?? '#2C7333', backgroundColor: color ?? '#3C413C' }} onClick={() => handleNavigate('/wallet/options')}>
                <div className={style.title}>
                    <h2 style={{ color: textColor ?? '#FFF' }}>
                        {title}
                    </h2>
                    <div className={style.options}>
                        <span className={style.trash}><i className="bi bi-trash"></i></span>
                        <span className={style.edit}><i className="bi bi-pencil-square"></i></span>
                    </div>
                </div>
                <h4 className={style.date} style={{ color: textColor ?? '#FFF' }}>{wallet ? 'Recebo dia ' + purchaseDate : 'Vence dia ' + purchaseDate}</h4>
                <h3 className={style.footer} style={{ color: textColor ?? '#FFF' }}>{wallet ? 'R$ ' + price?.toFixed(2) : typeCard}</h3>
            </div>
        </>
    )
}

export { Card }