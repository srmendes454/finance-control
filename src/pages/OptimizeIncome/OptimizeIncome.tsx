import { useState } from "react"
import { ChartIncome } from "../../components/ChartIncome/ChartIncome"
import { Layout } from "../../components/Layout/Layout"
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo"
import IOptimizeIncomeResponse from "../../models/OptimizeIncomeResponse"
import { OptimizeIncomeService } from "../../services/OptimizeIncome.service"
import { useMain } from "../../store/MainProvider"
import { toast } from "react-toastify"


function OptimizeIncome() {
  const { setIsGlobalLoading } = useMain();
  const [optimizeIncomes, setOptimizeIncomes] = useState([] as IOptimizeIncomeResponse[]);

  async function GetAll(walletId: string) {
    setIsGlobalLoading(true);
    const result = await OptimizeIncomeService.GetAll(walletId);
    if (result.data.success === true) {
      setOptimizeIncomes((result.data.data));
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

  return (
    <Layout
      card={<LayoutCardInfo
        functionEdit={true}
        functionReload={true}
        breadcrumb={["Carteira ", " | Opções ", "| Otimizar renda "]}
        title="Otimize seus rendimentos"
        informations={<ChartIncome data={optimizeIncomes} />}
      />
      }
    />
  )

}

export { OptimizeIncome }