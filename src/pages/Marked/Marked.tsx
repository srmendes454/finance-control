import { useState } from "react";
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo";
import { CardEvaluateAssigned } from "./CardEvaluateAssigned/CardEvaluateAssigned";

function Marked() {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [wallets, setWallets] = useState([] as any[]);

  return (
    <LayoutCardInfo
      onAddClick={() => {
        setOpenAdd(true);
      }}
      breadcrumb={["Marcações"]}
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
