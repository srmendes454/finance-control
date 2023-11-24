import { Sidebar3d } from '../Sidebar/Sidebar3D/Sidebar3d';
import { Header } from '../Header/Header';
import style from './Layout.module.scss';

interface LayoutProps {
    card?: any;
}

function Layout(Props: LayoutProps) {
    const {card} = Props

    return(
        <div className={style.container}>
            <header className={style.header}><Header/></header>
            <aside className={style.sidebar}><Sidebar3d/></aside>
            <div className={style.card}>{card}</div>
        </div>
    )
}

export {Layout}