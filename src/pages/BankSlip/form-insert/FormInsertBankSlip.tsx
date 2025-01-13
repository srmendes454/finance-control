import { ThemeProvider } from "@emotion/react"
import { StyleMaterialUi } from "../../../utils/StyleMaterialUi/StyleMaterialUi"
import { TextField, useTheme } from "@mui/material"
import style from './FormInsertBankSlip.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMain } from "../../../store/MainProvider";
import { ModalInsert } from "../../../components/Modals/ModalInsert/ModalInsert";
import { Theme } from "../../../utils/LocalStorage/Theme";
import { WalletCurrentId } from "../../../utils/LocalStorage/Wallet";
import { BankSlipService } from "../../../services/BankSlip.service";
import { useEffect } from "react";

const walletId = WalletCurrentId();
const InsertBankSlipFormSchema = z.object({
    walletId: z.string().default(walletId),
    name: z.string().nonempty('O Nome é obrigatório'),
    expirationDay: z.number({ message: "O Dia do Vencimento e obrigatório" }).default(0)
})

type InsertBankSlipFormData = z.infer<typeof InsertBankSlipFormSchema>

interface FormInsertCardProps {
    open: boolean;
    onClose: () => void;
    reloadBankSlips: () => void;
}

export const FormInsertBankSlip = ({ open, onClose, reloadBankSlips }: FormInsertCardProps) => {
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<InsertBankSlipFormData>({
        resolver: zodResolver(InsertBankSlipFormSchema)
    })

    const message = "Ao cancelar o cadastro, você perderá os dados preenchidos! Deseja continuar?";

    async function Insert(data: InsertBankSlipFormData) {
        setIsGlobalLoading(true);
        const result = await BankSlipService.Insert(data);
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
        reset();
        setIsGlobalLoading(false);
    }

    return (
        <ModalInsert
            open={open}
            onClosedClick={onClose}
            title={"Cadastrar Boleto"}
            icon="bi bi-upc-scan"
            isDeletedModal={false}
            titleModal="Cancelar Cadastro"
            messageModal={message}
            onSave={handleSubmit(Insert)}
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