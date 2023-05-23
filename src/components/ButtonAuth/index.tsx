import style from './Button.module.scss';

interface Props {
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => any 
    name?: string
    route?: string
    title?: string
}

export default function ButtonAuth({ onClick, type, name, route, title }: Props) {
    return(
        <div className={style.buttonBackground}>       
            <a className={style.resetPassword} href={route}>{title}</a>
            <button 
                onClick={onClick} 
                type={type} 
                className={style.buttonAuth}>
                {name}
            </button>
        </div>
    )
}