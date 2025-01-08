import { useNavigate } from 'react-router-dom';
import style from './CardOption.module.scss';
import { MaskReal } from '../../../utils/Masks/MaskReal';

interface CardOptionProps {
    title: string;
    description: string;
    value: number;
    color: string;
}

function CardOption(props: CardOptionProps) {
    const { title, description, value, color } = props
    const navigate = useNavigate();
    
    return (
        <>
            <div className={style.container}>
                <div className={style.card}>
                    <div className={style.front} style={{ borderColor: color ?? "#2C7333" }}>
                        <h3>{title}</h3>
                        <h1 style={{ color: color }}><span>R$ </span>{MaskReal(value, 2)}</h1>

                    </div>
                    <div className={style.back} style={{ backgroundColor: color ?? "#2C7333", borderColor: color ?? "#2C7333" }}>
                        <p style={{ color: color === '#FFF' ? '#000' : '#FFF'}}>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export { CardOption }