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
import { ModalInsertWallet } from "../../components/Modals/ModalInsertWallet/ModalInsertWallet";

function Wallet() {
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

    //useEffect(() => { GetAll() }, [])
    return (
        <>
            {openAdd && <ModalInsertWallet onClosedClick={() => { setOpenAdd(false) }} />}
            <Layout
                header={<Header />}
                sidebar={<Sidebar />}
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
