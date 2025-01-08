import { useEffect, useState } from 'react';
import IBreadcrumb from '../../models/BreadcrumbModel';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import style from './LayoutCardInfo.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";

interface CardInfoProps {
    breadcrumb?: IBreadcrumb[]
    hideBreadcrumb?: boolean
    isSelect?: boolean
    title?: string
    select?: any
    informations?: any
    functionSearch?: boolean
    functionReload?: boolean
    functionEdit?: boolean
    functionAdd?: boolean
    onAddClick?: () => void
}

function LayoutCardInfo(props: CardInfoProps) {
    const { breadcrumb, hideBreadcrumb, isSelect, title, select, informations, functionSearch, functionReload, functionEdit, functionAdd, onAddClick } = props;

    var listBread: IBreadcrumb[] = [
        {
            name: "Minhas Carteiras",
            icon: "bi bi-house-fill",
            route: "/my-wallets"
        }
    ]

    listBread = listBread.concat(breadcrumb ?? [])

    return (
        <div className={style.card}>
            <header className={style.breadcrumb}>
                {hideBreadcrumb ?? listBread?.map((bread, key) => {
                    return (
                        <Breadcrumb key={key} icon={bread.icon} name={bread.name} route={bread.route} />
                    )
                })}
            </header>
            <div className={style.title}>
                <h1>{isSelect ? select : title}</h1>
                <div className={style.options}>
                    {functionSearch ? <i className="bi bi-search"></i> : ""}
                    {functionReload ? <i onClick={() => window.location.reload()} className="bi bi-arrow-clockwise"></i> : ""}
                    {functionEdit ? <i className='bi bi-pencil-square'></i> : ""}
                    {functionAdd ? <i onClick={onAddClick} className="bi bi-plus-circle"></i> : ""}
                </div>
                <span />
            </div>
            <main>
                <div className={style.info}>
                    {informations}
                </div>
            </main>
        </div>
    )
}

export { LayoutCardInfo }