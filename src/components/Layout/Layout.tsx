import style from './Layout.module.scss';

interface LayoutProps {
    header?: any;
    sidebar?: any;
    card?: any;
}

function Layout(Props: LayoutProps) {
    const {header, sidebar, card} = Props

    return(
        <div className={style.container}>
            <header className={style.header}>{header}</header>
            <aside className={style.sidebar}>{sidebar}</aside>
            <div className={style.card}>{card}</div>
        </div>
    )
}

export {Layout}