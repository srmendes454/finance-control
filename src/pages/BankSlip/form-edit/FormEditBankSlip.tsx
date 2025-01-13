import { ThemeProvider } from "@emotion/react"
import { StyleMaterialUi } from "../../../utils/StyleMaterialUi/StyleMaterialUi"
import { TextField, useTheme } from "@mui/material"
import style from './FormEditBankSlip.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMain } from "../../../store/MainProvider";
import { ModalInsert } from "../../../components/Modals/ModalInsert/ModalInsert";
import { Theme } from "../../../utils/LocalStorage/Theme";
import { WalletCurrentId } from "../../../utils/LocalStorage/Wallet";
import { BankSlipService } from "../../../services/BankSlip.service";
import IBankSlipResponse from "../../../models/BankSlipResponse";
import { useEffect } from "react";

const walletId = WalletCurrentId();
const EditBankSlipFormSchema = z.object({
    walletId: z.string().default(walletId),
    name: z.string().nonempty('O Nome é obrigatório'),
    expirationDay: z.number({ message: "O Dia do Vencimento e obrigatório" }).default(0)
})

type EditBankSlipFormData = z.infer<typeof EditBankSlipFormSchema>

interface FormInsertCardProps {
    bankSlip: IBankSlipResponse;
    open: boolean;
    onClose: () => void;
    reloadBankSlips: () => void;
}

export const FormEditBankSlip = ({ bankSlip, open, onClose, reloadBankSlips }: FormInsertCardProps) => {
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<EditBankSlipFormData>({
        resolver: zodResolver(EditBankSlipFormSchema)
    })

    const message = "Ao cancelar o cadastro, você perderá os dados preenchidos! Deseja continuar?";

    async function Update(data: EditBankSlipFormData) {
        setIsGlobalLoading(true);
        const result = await BankSlipService.Update(bankSlip.bankSlipId, data);
        if (result.data.success === true) {
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light"
            });
            onClose();
            reloadBankSlips();
        } else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light",
            });
        }
        setIsGlobalLoading(false);
    }

    useEffect(() => { reset(bankSlip); }, [bankSlip])
    return (
        <ModalInsert
            open={open}
            onClosedClick={onClose}
            title={"Editar Boleto"}
            icon="bi bi-upc-scan"
            isDeletedModal={false}
            titleModal="Cancelar Edição"
            messageModal={message}
            onSave={handleSubmit(Update)}
        >
            <form className={style.form} >
                <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                    <TextField
                        className={style.input}
                        type="text"
                        label="Nome"
                        variant='standard'
                        {...register('name')}
                    />
                    {errors.name && <span className={style.validation}>{errors.name.message}</span>}
                    <TextField
                        className={style.input}
                        type="number"
                        label="Dia do Vencimento"
                        variant='standard'
                        {...register('expirationDay', { valueAsNumber: true })}
                    />
                    {errors.expirationDay && <span className={style.validation}>{errors.expirationDay.message}</span>}
                </ThemeProvider>
            </form>
        </ModalInsert>
    )
}