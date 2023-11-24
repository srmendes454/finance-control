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
    const { onClosedClick} = props;
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

    //useEffect(() => { GetAll() }, [])
    return (
        <>
            {openAdd && <ModalInsert onClosedClick={() => { setOpenAdd(false) }} title={"Cadastrar Carteira"} icon="bi bi-wallet" form={<FormInsertWallet />} data={InsertWallet} />}
            <Layout
                card={<LayoutCardInfo
                    onAddClick={() => { setOpenAdd(true) }}
                    breadcrumb={["Minhas carteiras"]}
                    title="Carteiras"
                    informations={
                        wallets?.map((wallet, key) => {
                            return <Card key={key} title={wallet?.name} borderColor={wallet?.color} price={wallet?.income} />
                        })
                    }
                />
                }
            />
        </>
    )
}

export { Wallet }
