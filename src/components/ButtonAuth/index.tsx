import { useNavigate } from 'react-router-dom';
import style from './Button.module.scss';

interface Props {
    route: string
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => any 
    name?: string
    title?: string
    disabled?: boolean
}

export default function ButtonAuth({ onClick, type, name, route, title, disabled }: Props) {
  const navigate = useNavigate();

    return(
        <div className={style.buttonBackground}>       
            <p className={style.resetPassword} onClick={() => navigate(route)}>{title}</p>
            <button 
                disabled={disabled}
                onClick={onClick} 
                type={type} 
                className={style.buttonAuth}>
                {name}
            </button>
        </div>
    )
}