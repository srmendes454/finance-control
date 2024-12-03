import { Header } from '../Header/Header';
import style from './LayoutMyWallets.module.scss';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

function LayoutMyWallets(props: LayoutProps) {
    const { children } = props

    return (
        <div className={style.container}>
            <header className={style.header}><Header /></header>
            <div className={style.card}>{children}</div>
        </div>
    )
}

export { LayoutMyWallets }