import { ThemeProvider } from "@emotion/react"
import { StyleMaterialUi } from "../../../utils/StyleMaterialUi/StyleMaterialUi"
import { TextField, useTheme } from "@mui/material"
import { useState } from "react";
import style from './FormInsertWallet.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const InsertWalletFormSchema = z.object({
    name: z.string().nonempty('O nome é obrigatório'),
    revenue: z.number().min(0.00).default(0.00)
})

type InsertWalletFormData = z.infer<typeof InsertWalletFormSchema>


export const FormInsertWallet = () => {
    const outerTheme = useTheme();

    const { register, handleSubmit, formState: { errors } } = useForm<InsertWalletFormData>({
        resolver: zodResolver(InsertWalletFormSchema)
    })

    const [colors, setColors] = useState([
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

    const handleSelected = (id: number) => {
        const updatedList = colors.map(i => {
            if (i.id === id) {
                i.selected = !i.selected
            }
            else {
                i.selected = false
            }
            return i;
        })
        setColors(updatedList);
    }

    return (
        <form className={style.form}>
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
                    {...register('revenue')}
                />
                {errors.revenue && <span className={style.validation}>{errors.revenue.message}</span>}
            </ThemeProvider>
            <div className={style.colors}>
                <div className={style.colorLabel}>
                    <label>Cor</label>
                </div>
                {colors.map(i =>
                    <span onClick={() => handleSelected(i.id)} className={classNames({
                        [style.active]: i.selected
                    })}>
                        <div
                            className={style.colorItens}
                            style={{ backgroundColor: i.color }}
                            key={i.id}
                        />
                    </span>
                )}
                <input type="color"/>
            </div>
        </form>
    )
}