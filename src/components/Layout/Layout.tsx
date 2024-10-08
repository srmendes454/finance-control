import { Sidebar3d } from '../Sidebar/Sidebar3D/Sidebar3d';
import { Header } from '../Header/Header';
import style from './Layout.module.scss';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

function Layout(props: LayoutProps) {
    const { children } = props

    return (
        <div className={style.container}>
            <header className={style.header}><Header /></header>
            <aside className={style.sidebar}><Sidebar3d /></aside>
            <div className={style.card}>{children}</div>
        </div>
    )
}

export { Layout }