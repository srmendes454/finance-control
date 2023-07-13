import style from './Button.module.scss';

interface Props {
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => any 
    name?: string
    route?: string
    title?: string
    disabled?: boolean
}

export default function ButtonAuth({ onClick, type, name, route, title, disabled }: Props) {
    return(
        <div className={style.buttonBackground}>       
            <a className={style.resetPassword} href={route}>{title}</a>
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