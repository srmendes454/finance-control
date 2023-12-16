import { useState } from 'react';
import { Layout } from '../../../components/Layout/Layout';
import { LayoutCardInfo } from '../../../components/LayoutCardInfo/LayoutCardInfo';
import style from './OptionsWallet.module.scss';
import { CardOption } from './CardOption/CardOption';
import { useNavigate } from 'react-router-dom';

interface OptionsWalletProps {
    onClosedClick?: () => void;
    breadcrumb?: string
}

function OptionsWallet(props: OptionsWalletProps) {
    const { onClosedClick, breadcrumb } = props;
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const navigate = useNavigate();

    const options = [
        {
            id: 1,
            name: "Cartões",
            description: "Gerencie seus cartões!",
            icon: "bi bi-credit-card-2-front",
            route: "/wallet/options/card"
        },
        {
            id: 2,
            name: "Boletos",
            description: "Gerencie seus boletos!",
            icon: "bi bi-upc-scan",
            route: "/wallet/options/bank-slip"
        },
        {
            id: 3,
            name: "Dinheiro",
            description: "Gerencie seu dinheiro",
            icon: "bi bi-coin",
            route: "/wallet/options/money"
        },
        {
            id: 4,
            name: "Pix",
            description: "Gerencie seu pix!",
            icon: "bi bi-x-diamond-fill",
            route: "/wallet/options/pix"
        },
        {
            id: 5,
            name: "Otimizar Renda",
            description: "Gerencie a divisão de sua renda",
            icon: "bi bi-pie-chart-fill",
            route: "/wallet/options/optimize-income"
        }
    ]

    const handleNavigate = (item: any) => {
        navigate(item.route);
    }
    
    return (
        <>
            <Layout
                card={<LayoutCardInfo
                    onAddClick={() => { setOpenAdd(true) }}
                    breadcrumb={["Minhas carteiras | ", breadcrumb ?? "" ]}
                    title="Selecione o lugar que deseja ir."
                    informations={
                        options?.map((option, key) => {
                            return <CardOption key={key} title={option.name} description={option.description} icon={option.icon} route={option.route}/>
                        })
                    }
                />
                }
            />
        </>
    )
}

export { OptionsWallet }