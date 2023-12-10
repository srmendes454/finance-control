import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Header } from "../../components/Header/Header";
import { Layout } from "../../components/Layout/Layout";
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { WalletService } from "../../services/Wallet.service";
import { useMain } from "../../store/MainProvider";
import { toast } from "react-toastify"
import IWalletResponse from "../../models/WalletResponseModel";
import { ModalInsert } from "../../components/Modals/ModalInsert/ModalInsert";
import { FormInsertWallet } from "./form-insert/FormInsertWallet";
import IWalletInsert from '../../models/WalletInsertModel';
import { Sidebar3d } from "../../components/Sidebar/Sidebar3D/Sidebar3d";

interface WalletProps {
    onClosedClick?: () => void;
}

function Wallet(props: WalletProps) {
    const { onClosedClick } = props;
    const { setIsGlobalLoading } = useMain();
    const [wallets, setWallets] = useState([] as IWalletResponse[]);
    const [openAdd, setOpenAdd] = useState<boolean>(false);

    async function GetAll() {
        setIsGlobalLoading(true);
        const result = await WalletService.GetAll();
        if (result.data.success === true) {
            setWallets((result.data.data));
        }
        else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
    }

    async function InsertWallet(data: IWalletInsert) {
        setIsGlobalLoading(true);
        const result = await WalletService.Insert(data);
        if (result.data.success === true) {
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
        onClosedClick && onClosedClick();
    }

    const test = [
        {
            id: 1,
            name: "Teste",
            color: "#",
            PaymentDate: 12,
            price: 1
        },
        {
            id: 2,
            name: "Testando",
            color: "#",
            PaymentDate: 12,
            price: 10
        },
        {
            id: 3,
            name: "Testando 1",
            color: "#",
            PaymentDate: 12,
            price: 100
        },
        {
            id: 4,
            name: "Testando 2",
            color: "#",
            PaymentDate: 12,
            price: 7000
        },
        {
            id: 5,
            name: "Testando 3",
            color: "#",
            PaymentDate: 12,
            price: 15000
        },
        {
            id: 6,
            name: "Meta",
            color: "#",
            PaymentDate: 12,
            price: 120000
        },
        {
            id: 7,
            name: "Teste 10",
            color: "#",
            PaymentDate: 12,
            price: 8000000
        },
        {
            id: 8,
            name: "Teste 2",
            color: "#",
            PaymentDate: 12,
            price: 75000000
        },
        {
            id: 9,
            name: "Teste 1",
            color: "#",
            PaymentDate: 12,
            price: 150000000
        },
        {
            id: 10,
            name: "God is very good!",
            color: "#",
            PaymentDate: 12,
            price: 1000000000
        }
    ]

    //useEffect(() => { GetAll() }, [])
    return (
        <>
            {openAdd && <ModalInsert onClosedClick={() => { setOpenAdd(false) }} title={"Cadastrar Carteira"} icon="bi bi-wallet" form={<FormInsertWallet />} data={InsertWallet} />}
            <Layout
                card={<LayoutCardInfo
                    onAddClick={() => { setOpenAdd(true) }}
                    breadcrumb={["Minhas carteiras"]}
                    title="Carteiras"
                    functionAdd={true}
                    functionReload={true}
                    functionSearch={true}
                    informations={
                        //<Card title={"Teste"} borderColor={"#3E6943"} price={1000} />
                        test?.map((wallet, key) => {
                            return <Card key={key} wallet={true} title={wallet?.name} borderColor={wallet?.color} purchaseDate={wallet.PaymentDate} price={wallet?.price} />
                        })
                    }
                />
                }
            />
        </>
    )
}

export { Wallet }
