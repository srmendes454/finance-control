import style from './CardInfo.module.scss';

interface CardInfoProps {
    breadcrumb?: string
}

function CardInfo(props: CardInfoProps){
    const {breadcrumb} = props;
    return(
        <div className={style.card}>
            <span>{breadcrumb}</span>

        </div>
    )
}

export {CardInfo}