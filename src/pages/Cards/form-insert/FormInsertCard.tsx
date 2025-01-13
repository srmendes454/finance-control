import { ThemeProvider } from "@emotion/react"
import { StyleMaterialUi } from "../../../utils/StyleMaterialUi/StyleMaterialUi"
import { TextField, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import style from './FormInsertCard.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useMain } from "../../../store/MainProvider";
import { ModalInsert } from "../../../components/Modals/ModalInsert/ModalInsert";
import { CardService } from "../../../services/Card.service";
import { Theme } from "../../../utils/LocalStorage/Theme";
import { WalletCurrentId } from "../../../utils/LocalStorage/Wallet";

interface IColor {
    id: number, color: string, selected: boolean
}

const walletId = WalletCurrentId();
const InsertCardFormSchema = z.object({
    walletId: z.string().default(walletId),
    name: z.string().nonempty('O Nome é obrigatório'),
    color: z.string({ message: 'A Cor é obrigatória' }).nonempty('A Cor é obrigatória'),
    expirationDay: z.number({ message: "O Dia do Vencimento e obrigatório" }).default(0),
    type: z.string().default("DEBIT")
})

type InsertCardFormData = z.infer<typeof InsertCardFormSchema>

interface FormInsertCardProps {
    open: boolean;
    onClose: () => void;
    reloadCards: () => void;
}

export const FormInsertCard = ({ open, onClose, reloadCards }: FormInsertCardProps) => {
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm<InsertCardFormData>({
        resolver: zodResolver(InsertCardFormSchema)
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
            color: "#3E6943",
            selected: false
        }
    ])

    const message = "Ao cancelar o cadastro, você perderá os dados preenchidos! Deseja continuar?";

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

    const cardTypes = [
        {
            id: 1,
            name: "DEBIT",
            description: "Débito"
        },
        {
            id: 2,
            name: "CREDIT",
            description: "Crédito"
        },
        {
            id: 3,
            name: "DEBIT_CREDIT",
            description: "Débito/Crédito"
        }
    ];

    const [hiddenExpirationDay, setHiddenExpirationDay] = useState(false);
    const toggleTextFieldVisibility = () => {
        setHiddenExpirationDay(getValues('type') === "DEBIT" ? false : true);
    };

    const resetForm = () => {
        setColors(colors.map(color => {
            color.selected = false;
            return color
        }));
        setHiddenExpirationDay(false);
        reset();
    };

    async function Insert(data: InsertCardFormData) {
        setIsGlobalLoading(true);
        const result = await CardService.Insert(data);
        if (result.data.success === true) {
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light"
            });
            onClose();
            reloadCards();
        } else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light",
            });
        }
        resetForm();
        setIsGlobalLoading(false);
    }

    return (
        <ModalInsert
            open={open}
            onClosedClick={onClose}
            title={"Cadastrar Cartão"}
            icon="bi bi-credit-card"
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
                    <div className={style.select}>
                        <div className={style.colorLabel}>
                            <label>Tipo do Cartão</label>
                        </div>
                        <select defaultValue="DEBIT" {...register('type')} onChange={(e) => setValue("type", e.target.value)} onClick={toggleTextFieldVisibility}>
                            {
                                cardTypes.map((type, key) => {
                                    return <option key={key} value={type.name}>{type.description}</option>
                                })
                            }
                        </select>
                        {errors.type && <span className={style.validation}>{errors.type.message}</span>}
                    </div>
                    {hiddenExpirationDay && <TextField
                        className={style.input}
                        type="number"
                        label="Dia do Vencimento"
                        variant='standard'
                        {...register('expirationDay', { valueAsNumber: true })}
                    />}
                    {hiddenExpirationDay && errors.expirationDay && <span className={style.validation}>{errors.expirationDay.message}</span>}
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
                            setValue("color", e.target.value)
                        }
                    />
                    {errors.color && <span className={style.validation}>{errors.color.message}</span>}
                </div>
            </form>
        </ModalInsert>
    )
}