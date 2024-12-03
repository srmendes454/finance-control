import { useState } from 'react';
import { LayoutCardInfo } from '../../components/LayoutCardInfo/LayoutCardInfo';
import { useMain } from '../../store/MainProvider';
import { Card } from '../../components/Card/Card';
import IBreadcrumb from '../../models/BreadcrumbModel';

function Cards() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const { setIsGlobalLoading } = useMain();
    const test = [
        {
            id: 1,
            name: "Santander Elite",
            color: "#1E1E1E",
            PaymentDate: 12,
            type: 'Crédito/Débito',
            value: 600,
            IsDebit: false,
            statusFatura: 'Aberta'
        },
        {
            id: 2,
            name: "Brasil Card",
            color: "#0B4397",
            PaymentDate: 16,
            type: 'Crédito',
            value: 700,
            IsDebit: false,
            statusFatura: 'Fechada'
        },
        {
            id: 3,
            name: "Nubank",
            color: "#5212A5",
            PaymentDate: 12,
            type: 'Crédito/Débito',
            value: 120,
            IsDebit: false,
            statusFatura: 'Atrasada'
        },
        {
            id: 4,
            name: "Porto Bank",
            color: "#fff",
            PaymentDate: 14,
            type: 'Crédito',
            value: 230,
            IsDebit: false,
            statusFatura: 'Paga'
        },
        {
            id: 5,
            name: "Inter",
            color: "#DB771A",
            type: 'Débito',
            value: 1200,
            IsDebit: true
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
                breadcrumb={breadcrumb}
                title="Meus Cartões"
                functionAdd={true}
                functionReload={true}
                functionSearch={true}
                informations={test.map((card, key) => {
                    return (
                        <Card
                            key={key}
                            isDebit={card.IsDebit}
                            color={card.color}
                            title={card.name}
                            typeCard={card.type}
                            purchaseDate={card.PaymentDate}
                            price={card.value}
                            status={card.statusFatura}
                        />
                    )
                })}
            />
        </>
    )
}

export { Cards }