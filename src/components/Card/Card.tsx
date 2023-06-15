import style from './Card.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";

interface CardProps {
    title?: string;
    typeCard?: string;
    price?: number;
    installments?: string;
    purchaseDate?: string
}

function Card(Props: CardProps) {
    const { title, typeCard, price, installments, purchaseDate } = Props;
    return (
        <div className={style.card}>
            <div className={style.title}>
                <h2>
                    {title}
                </h2>
                <div className={style.options}><i className="bi bi-three-dots-vertical"></i></div>
            </div>
            <h4 className={style.date}>{purchaseDate} | {installments}</h4>
            <h1 className={style.price}>R$ {price?.toFixed(2)}</h1>
            <h3 className={style.typeCard}>{typeCard}</h3>
        </div>
    )
}

export { Card }