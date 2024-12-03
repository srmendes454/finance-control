import { ThemeProvider } from "@emotion/react"
import { StyleMaterialUi } from "../../../utils/StyleMaterialUi/StyleMaterialUi"
import { TextField, useTheme } from "@mui/material"
import { useState } from "react";
import style from './FormInsertWallet.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { WalletService } from "../../../services/Wallet.service";
import { toast } from "react-toastify";
import { useMain } from "../../../store/MainProvider";
import { ModalInsert } from "../../../components/Modals/ModalInsert/ModalInsert";

interface IColor {
    id: number, color: string, selected: boolean
}

const InsertWalletFormSchema = z.object({
    name: z.string().nonempty('O nome é obrigatório'),
    income: z.string().nonempty('O campo renda é obrigatório'),
    color: z.string().nonempty('O campo cor é obrigatório')
})

type InsertWalletFormData = z.infer<typeof InsertWalletFormSchema>

interface FormInsertWalletProps {
    open: boolean;
    onClose: () => void
}

export const FormInsertWallet = ({ open, onClose }: FormInsertWalletProps) => {
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<InsertWalletFormData>({
        resolver: zodResolver(InsertWalletFormSchema)
    })

    const [colors, setColors] = useState<IColor[]>([
        {
            id: 1,
            color: "#232623",
            selected: false
        },
        {
            id: 2,
            color: "#0B4397",
            selected: false
        },
        {
            id: 3,
            color: "#5212A5",
            selected: false
        },
        {
            id: 4,
            color: "#905D10",
            selected: false
        },
        {
            id: 5,
            color: "#722121",
            selected: false
        },
        {
            id: 6,
            color: "#6F766F",
            selected: false
        },
        {
            id: 7,
            color: "#FFFFFF",
            selected: false
        }
    ])
    const message =
        "Ao cancelar o cadastro, você perderá os dados preenchidos! Deseja continuar?";

    const handleSelected = (colorSelected: IColor) => {
        const updatedList = colors.map(i => {
            if (i.id === colorSelected.id) {
                i.selected = !i.selected
                const value = i.selected ? i.color : ""
                setValue("color", value)
            }
            else {
                i.selected = false
            }
            return i;
        })

        setColors(updatedList);
    }

    async function InsertWallet(data: InsertWalletFormData) {
        setIsGlobalLoading(true);
        const values = {
            ...data,
            income: Number(data?.income)
        }
        const result = await WalletService.Insert(values);
        if (result.data.success === true) {
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark",
            });
        } else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark",
            });
        }
        setIsGlobalLoading(false);
    }

    return (
        <ModalInsert
            open={open}
            onClosedClick={onClose}
            title={"Cadastrar Carteira"}
            icon="bi bi-wallet"
            isDeletedModal={false}
            titleModal="Cancelar Cadastro"
            messageModal={message}
            onSave={handleSubmit(InsertWallet)}
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
                        label="Renda Mensal"
                        variant='standard'
                        {...register('income')}
                    />
                    {errors.income && <span className={style.validation}>{errors.income.message}</span>}
                </ThemeProvider>
                <div className={style.colors}>
                    <div className={style.colorLabel}>
                        <label>Cor</label>
                    </div>
                    {colors.map((i, key) =>
                        <span key={key} onClick={() => {
                            handleSelected(i)
                        }} className={classNames({
                            [style.active]: i.selected
                        })}>
                            <div
                                className={style.colorItens}
                                style={{ backgroundColor: i.color }}
                                key={key}
                            />
                        </span>
                    )}
                    <input type="color"
                        onChange={(e) =>
                            setValue("color", e.target.value)}
                    />
                    {errors.color && <span className={style.validation}>{errors.color.message}</span>}
                </div>
            </form>
        </ModalInsert>
    )
}