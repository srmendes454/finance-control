import { useState } from 'react';
import { LayoutCardInfo } from '../../components/LayoutCardInfo/LayoutCardInfo';
import { useMain } from '../../store/MainProvider';
import { Card } from '../../components/Card/Card';
import IBreadcrumb from '../../models/BreadcrumbModel';

function BankSlip() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const { setIsGlobalLoading } = useMain();
    const test = [
        {
            id: 1,
            name: "Carro",
            PaymentDate: 21,
            type: 'Boleto',
            value: 1102,
            IsDebit: false
        },
        {
            id: 2,
            name: "JustWeb",
            PaymentDate: 12,
            type: 'Boleto',
            value: 129.90,
            IsDebit: false
        },
        {
            id: 3,
            name: "Plano Saude Ester",
            PaymentDate: 12,
            type: 'Boleto',
            value: 220,
            IsDebit: false,
        },
        {
            id: 4,
            name: "Meu Plano Saude",
            PaymentDate: 12,
            type: 'Boleto',
            value: 329.90,
            IsDebit: false,
        }
    ];

    const breadcrumb: IBreadcrumb[] = [
        {
            name: localStorage.getItem('name') ?? "",
            icon: "bi bi-wallet",
            route: "/wallet"
        }
    ]
    return (
        <>
            <LayoutCardInfo
                onAddClick={() => {
                    setOpenAdd(!openAdd);
                }}
                title="Meus Boletos"
                breadcrumb={breadcrumb}
                functionAdd={true}
                functionReload={true}
                functionSearch={true}
                informations={test.map((card, key) => {
                    return (
                        <Card
                            key={key}
                            isDebit={card.IsDebit}
                            title={card.name}
                            typeCard={card.type}
                            purchaseDate={card.PaymentDate}
                            price={card.value}
                            color='#fff'
                            route='/bank-slip/transactions'
                        />
                    )
                })}
            />
        </>
    )
}

export { BankSlip }