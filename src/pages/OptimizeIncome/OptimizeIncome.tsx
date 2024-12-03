import { useState } from "react"
import { ChartIncome } from "../../components/ChartIncome/ChartIncome"
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo"
import IOptimizeIncomeResponse from "../../models/OptimizeIncomeResponse"
import { OptimizeIncomeService } from "../../services/OptimizeIncome.service"
import { useMain } from "../../store/MainProvider"
import { toast } from "react-toastify"
import IBreadcrumb from "../../models/BreadcrumbModel"


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

  const breadcrumb: IBreadcrumb[] = [
    {
      name: localStorage.getItem('name') ?? "",
      icon: "bi bi-wallet",
      route: "/wallet"
    }
  ]

  return (
    <LayoutCardInfo
      functionEdit={true}
      functionReload={true}
      breadcrumb={breadcrumb}
      title="Otimize seus rendimentos"
      informations={<ChartIncome data={optimizeIncomes} />}
    />
  )
}

export { OptimizeIncome }