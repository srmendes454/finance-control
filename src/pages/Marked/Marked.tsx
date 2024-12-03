import { useState } from "react";
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo";
import { CardEvaluateAssigned } from "./CardEvaluateAssigned/CardEvaluateAssigned";
import IBreadcrumb from "../../models/BreadcrumbModel";

function Marked() {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [wallets, setWallets] = useState([] as any[]);

  const breadcrumb: IBreadcrumb[] = [
      {
          name: localStorage.getItem('name') ?? "",
          icon: "bi bi-wallet",
            route: "/wallet"
      }
  ]
  return (
    <LayoutCardInfo
      onAddClick={() => {
        setOpenAdd(true);
      }}
      breadcrumb={breadcrumb}
      title="Transações em que fui marcado"
      informations={
        <CardEvaluateAssigned
          markedBy="Thalita Radija Pimenta"
          name="Geladeira"
          price="R$ 349,90"
        />
      }
    />
  );
}

export { Marked };
