import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Layout } from "../../components/Layout/Layout";
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo";
import { WalletService } from "../../services/Wallet.service";
import { useMain } from "../../store/MainProvider";
import { toast } from "react-toastify"
import IWalletResponse from "../../models/WalletResponseModel";
import { ModalInsert } from "../../components/Modals/ModalInsert/ModalInsert";
import { FormInsertWallet } from "./form-insert/FormInsertWallet";
import IWalletInsert from '../../models/WalletInsertModel';
import { OptionsWallet } from "./OptionsWallet/OptionsWallet";

interface WalletProps {
    onClosedClick?: () => void;
}

function Wallet(props: WalletProps) {
    const { onClosedClick } = props;
    const { setIsGlobalLoading } = useMain();
    const [wallets, setWallets] = useState([] as IWalletResponse[]);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const message = "Ao cancelar o cadastro, você perderá os dados preenchidos! Deseja continuar?";

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
            color: "#F39200",
            PaymentDate: 12,
            price: 1
        },
        {
            id: 2,
            name: "Testando",
            color: "#1875FF",
            PaymentDate: 12,
            price: 10
        },
        {
            id: 3,
            name: "Testando 1",
            color: "#BD2323",
            PaymentDate: 12,
            price: 100
        },
        {
            id: 4,
            name: "Testando 2",
            color: "#6F766F",
            PaymentDate: 12,
            price: 7000
        },
        {
            id: 5,
            name: "Testando 3",
            color: "#5212A5",
            PaymentDate: 12,
            price: 15000
        },
        {
            id: 6,
            name: "Meta",
            color: "#FFF",
            PaymentDate: 12,
            price: 120000
        },
        {
            id: 7,
            name: "Teste 10",
            color: "#000",
            PaymentDate: 12,
            price: 8000000
        },
        {
            id: 8,
            name: "Teste 2",
            color: "#E31DDB",
            PaymentDate: 12,
            price: 75000000
        },
        {
            id: 9,
            name: "Teste 1",
            color: "#E74C3C",
            PaymentDate: 12,
            price: 150000000
        },
        {
            id: 10,
            name: "God is very good!",
            color: "#333F50",
            PaymentDate: 12,
            price: 1000000000
        }
    ]

    //useEffect(() => { GetAll() }, [])
    return (
        <>
            {openAdd && <ModalInsert onClosedClick={() => { setOpenAdd(false) }} title={"Cadastrar Carteira"} icon="bi bi-wallet" form={<FormInsertWallet />} data={InsertWallet} isDeletedModal={false} titleModal='Cancelar Cadastro' messageModal={message}/>}
            <Layout
                card={<LayoutCardInfo
                    onAddClick={() => { setOpenAdd(true) }}
                    breadcrumb={["Minhas carteiras"]}
                    title="Carteiras"
                    functionAdd={true}
                    functionReload={true}
                    functionSearch={true}
                    informations={
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
