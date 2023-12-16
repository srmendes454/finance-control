import { useNavigate } from 'react-router-dom';
import style from './CardOption.module.scss';

interface CardOptionProps {
    title: string;
    description: string;
    icon: string;
    route: string;
}

function CardOption(props: CardOptionProps) {
    const { title, description, icon, route } = props
    const navigate = useNavigate();
    
    const cardColor = localStorage.getItem('borderColor')
    
    return (
        <>
            <div className={style.container}>
                <div className={style.card} onClick={() => navigate(route)}>
                    <div className={style.front} style={{ borderColor: cardColor ?? "#2C7333" }}>
                        <i className={icon}></i>
                        <h1>{title}</h1>
                    </div>
                    <div className={style.back} style={{ backgroundColor: cardColor ?? "#2C7333", borderColor: cardColor ?? "#2C7333" }}>
                        <i className={icon}></i>
                        <p style={{ color: cardColor === '#FFF' ? '#000' : '#FFF'}}>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export { CardOption }