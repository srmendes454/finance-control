import { Card } from "../../components/Card/Card";
import { Header } from "../../components/Header/Header";
import { Layout } from "../../components/Layout/Layout";
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo";
import { Sidebar } from "../../components/Sidebar/Sidebar";

function Wallet() {
    return (
        <Layout
            header={<Header />}
            sidebar={<Sidebar />}
            card={<LayoutCardInfo
                breadcrumb={["Minhas carteiras"]}
                title="Carteiras"
                informations={
                    [
                        <Card title="Iphone 13 mini" price={479.90} typeCard="Credito" installments="6/10" purchaseDate="25/12/2023"/>
                    ]}
            />
            }
        />
    )
}

export { Wallet }