import style from './LayoutCardInfo.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";

interface CardInfoProps {
    breadcrumb?: string[]
    title?: string
    informations?: any[]
    onAddClick?: () => void
}

function LayoutCardInfo(props: CardInfoProps) {
    const { breadcrumb, title, informations, onAddClick } = props;
    return (
        <div className={style.card}>
            <header className={style.breadcrumb}>
                <p>{breadcrumb}</p>
            </header>
            <div className={style.title}>
                <h1>{title}</h1>
                <div className={style.search}>
                    <i className="bi bi-search"></i>
                </div>
                <div className={style.add}>
                    <i onClick={onAddClick} className="bi bi-plus-lg"></i>
                </div>
                <span />
            </div>
            <main>
                <div className={style.info}>
                    {informations}
                </div>
                <footer>
                    <div className={style.paginated}>
                    </div>
                    <div className={style.help}>
                        <i className='bi bi-headset'></i>
                    </div>
                </footer>
            </main>
        </div>
    )
}

export { LayoutCardInfo }