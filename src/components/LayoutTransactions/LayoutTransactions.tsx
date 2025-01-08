import { useLocation } from 'react-router-dom';
import IBreadcrumb from '../../models/BreadcrumbModel';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import style from './LayoutTransactions.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

interface LayoutTransactionsProps {
    breadcrumb: IBreadcrumb
    hideBreadcrumb?: boolean
    informations?: any
    functionSearch?: boolean
    functionReload?: boolean
    functionEdit?: boolean
    functionAdd?: boolean
    onAddClick?: () => void
}

interface IMonth {
    Id: number,
    Selected: boolean,
    Name: string
}

function LayoutTransactions(props: LayoutTransactionsProps) {
    const { breadcrumb, hideBreadcrumb, informations, functionSearch, functionReload, functionEdit, functionAdd, onAddClick } = props;
    const location = useLocation();

    var listBread: IBreadcrumb[] = [
        {
            name: "Minhas Carteiras",
            icon: "bi bi-house-fill",
            route: "/my-wallets"
        },
        {
            name: localStorage.getItem('name') ?? "",
            icon: "bi bi-wallet",
            route: "/wallet"
        },
    ]

    listBread.push(breadcrumb)
    
    const year = new Date().getFullYear();
    const years: number[] = [];
    for (let i = year - 5; i <= year + 10; i++){
        years.push(i)
    }

    const [months, setMonths] = useState<IMonth[]>([
        {
            Id: 1,
            Selected: false,
            Name: "JAN"
        },
        {
            Id: 2,
            Selected: false,
            Name: "FEV"
        },
        {
            Id: 3,
            Selected: false,
            Name: "MAR"
        },
        {
            Id: 4,
            Selected: false,
            Name: "ABR"
        },
        {
            Id: 5,
            Selected: false,
            Name: "MAI"
        },
        {
            Id: 6,
            Selected: false,
            Name: "JUN"
        },
        {
            Id: 7,
            Selected: false,
            Name: "JUL"
        },
        {
            Id: 8,
            Selected: false,
            Name: "AGO"
        },
        {
            Id: 9,
            Selected: false,
            Name: "SET"
        },
        {
            Id: 10,
            Selected: false,
            Name: "OUT"
        },
        {
            Id: 11,
            Selected: false,
            Name: "NOV"
        },
        {
            Id: 12,
            Selected: false,
            Name: "DEZ"
        }
    ])

    const isCardCredit = location.pathname.includes("cards");
    const handleSelected = (month: IMonth) => {
        const updatedList = months.map(i => {
            if (i.Id === month.Id) {
                i.Selected = !i.Selected
            }
            else {
                i.Selected = false
            }
            return i;
        })

        setMonths(updatedList);
    }

    const [cardBill, setCardBill] = useState(false);
    const selectedCardBill = (selected: boolean) => {
        setCardBill(selected);
    }

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
                <div className={style.tab}>
                    <span className={cardBill ? style.transaction : style.active} onClick={() => selectedCardBill(false)}>
                        <h1>Transações</h1>
                    </span>
                    {isCardCredit && <span className={cardBill ? style.active : style.cardBill} onClick={() => selectedCardBill(true)}>
                        <h1>Faturas</h1>
                    </span>}
                </div>
                <span />
            </div>
            <div className={style.subTitle}>
                <div className={style.select}>
                    <select defaultValue="default">
                        <option value="default" disabled>{year}</option>
                        {
                            years?.map((year, key) => {
                                return <option key={key} value={year}>{year}</option>
                            })
                        }
                    </select>
                </div>
                <div className={style.month}>
                    {
                        months.map((month, key) => {
                            return <p key={key}
                                onClick={() => { handleSelected(month) }}
                                className={
                                    classNames({
                                        [style.active]: month.Selected
                                    })}>
                                {month.Name}
                            </p>
                        })}
                </div>
                <div className={style.options}>
                    {functionSearch ? <i className="bi bi-search"></i> : ""}
                    {functionReload ? <i onClick={() => window.location.reload()} className="bi bi-arrow-clockwise"></i> : ""}
                    {functionEdit ? <i className='bi bi-pencil-square'></i> : ""}
                    {functionAdd ? <i onClick={onAddClick} className="bi bi-plus-circle"></i> : ""}
                </div>
            </div>
            <main>
                <div className={style.info}>
                    {informations}
                </div>
            </main>
        </div>
    )
}

export { LayoutTransactions }