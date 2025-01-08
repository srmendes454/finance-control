import { ThemeProvider } from "@emotion/react"
import { StyleMaterialUi } from "../../../utils/StyleMaterialUi/StyleMaterialUi"
import { TextField, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import style from './FormEditWallet.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { WalletService } from "../../../services/Wallet.service";
import { toast } from "react-toastify";
import { useMain } from "../../../store/MainProvider";
import { ModalInsert } from "../../../components/Modals/ModalInsert/ModalInsert";
import IWalletResponse from "../../../models/WalletResponseModel";

interface IColor {
    id: number, color: string, selected: boolean
}

const UpdateWalletFormSchema = z.object({
    name: z.string().nonempty('O Nome é obrigatório'),
    color: z.string().nonempty('A Cor é obrigatória')
})

type UpdateWalletFormData = z.infer<typeof UpdateWalletFormSchema>

interface FormUpdateWalletProps {
    wallet: IWalletResponse;
    open: boolean;
    onClose: () => void;
    getAll: () => void;
}

export const FormEditWallet = ({ wallet, open, onClose, getAll }: FormUpdateWalletProps) => {
    const theme = localStorage.getItem("currentTheme");
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<UpdateWalletFormData>({
        resolver: zodResolver(UpdateWalletFormSchema)
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
    const message = "Ao cancelar a edição, você perderá os dados preenchidos! Deseja continuar?";

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

    async function UpdateWallet(data: UpdateWalletFormData) {
        setIsGlobalLoading(true);
        const result = await WalletService.Update(wallet.walletId, data);
        if (result.data.success === true) {
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
                theme: theme === "dark" ? "dark" : "light"
            });
            onClose();
            getAll();
        } else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: theme === "dark" ? "dark" : "light"
            });
        }

        setIsGlobalLoading(false);
    }
    
    useEffect(() => {reset(wallet)}, [wallet])
    return (
        <ModalInsert
            open={open}
            onClosedClick={onClose}
            title={"Editar Carteira"}
            icon="bi bi-wallet"
            isDeletedModal={false}
            titleModal="Cancelar Edição"
            messageModal={message}
            onSave={handleSubmit(UpdateWallet)}
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