import { useEffect, useState } from 'react';
import { LayoutCardInfo } from '../../components/LayoutCardInfo/LayoutCardInfo';
import { useMain } from '../../store/MainProvider';
import { Card } from '../../components/Card/Card';
import IBreadcrumb from '../../models/BreadcrumbModel';
import IBankSlipResponse from '../../models/BankSlipResponse';
import { BankSlipService } from '../../services/BankSlip.service';
import { toast } from 'react-toastify';
import { Theme } from '../../utils/LocalStorage/Theme';
import { FormInsertBankSlip } from './form-insert/FormInsertBankSlip';
import { FormEditBankSlip } from './form-edit/FormEditBankSlip';

function BankSlip() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [bankSlipResponse, setBankSlipResponse] = useState<IBankSlipResponse>();
    const { setIsGlobalLoading } = useMain();

    const breadcrumb: IBreadcrumb[] = [
        {
            name: localStorage.getItem('name') ?? "",
            icon: "bi bi-wallet",
            route: "/wallet"
        }
    ]

    const [bankSlips, setBankSlips] = useState([] as IBankSlipResponse[]);
    async function GetAll() {
        setIsGlobalLoading(true);
        const result = await BankSlipService.GetAll();
        if (result.data.success === true) {
            setBankSlips(result.data.data.records);
        } else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light"
            });
        }
        setIsGlobalLoading(false);
    }

    useEffect(() => { GetAll() }, [])

    async function Delete(bankSlipId: string) {
        setIsGlobalLoading(true);
        const result = await BankSlipService.Delete(bankSlipId);
        if (result.data.success === true) {
            GetAll()
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                theme: Theme() === "dark" ? "dark" : "light"
            });
        }
        else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light"
            });
        }
        setIsGlobalLoading(false);
    }

    return (
        <>
            <FormInsertBankSlip reloadBankSlips={GetAll} open={openAdd} onClose={(() => setOpenAdd(false))} />
            <LayoutCardInfo
                onAddClick={() => {
                    setOpenAdd(!openAdd);
                }}
                title="Meus Boletos"
                breadcrumb={breadcrumb}
                functionAdd={true}
                functionReload={true}
                functionSearch={true}
                informations={bankSlips.map((bankSlip, key) => {
                    return (
                        <Card
                            key={key}
                            onEditClick={() => { setOpenEdit(!openEdit); setBankSlipResponse(bankSlip) }}
                            onExclude={() => Delete(bankSlip.bankSlipId)}
                            isDebit={false}
                            title={bankSlip.name}
                            typeCard={"Boleto"}
                            purchaseDate={bankSlip.expirationDay}
                            price={bankSlip.value}
                            color='#fff'
                            route='/bank-slip/transactions'
                        />
                    )
                })}
            />
            <FormEditBankSlip bankSlip={bankSlipResponse!} open={openEdit} onClose={(() => setOpenEdit(!openEdit))} reloadBankSlips={GetAll} />
        </>
    )
}

export { BankSlip }