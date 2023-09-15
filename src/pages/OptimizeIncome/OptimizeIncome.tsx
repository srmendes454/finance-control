import { useEffect, useState } from "react"
import { ChartIncome } from "../../components/ChartIncome/ChartIncome"
import { Header } from "../../components/Header/Header"
import { Layout } from "../../components/Layout/Layout"
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import IOptimizeIncomeResponse from "../../models/OptimizeIncomeResponse"
import { OptimizeIncomeService } from "../../services/OptimizeIncome.service"
import { useMain } from "../../store/MainProvider"
import { toast } from "react-toastify"
import { Select } from "../../components/Select/Select"


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

  //useEffect(() => { GetAll('') }, [])

  return (
    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
      card={<LayoutCardInfo
        isSelect={true}
        breadcrumb={["Otimizar renda"]}
        select={<Select />}
        informations={<ChartIncome data={optimizeIncomes} />}
      />
      }
    />
  )

}

export { OptimizeIncome }