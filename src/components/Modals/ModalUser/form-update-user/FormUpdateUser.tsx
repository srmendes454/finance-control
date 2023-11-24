import style from './FormUpdateUser.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react"
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi"
import { TextField, useTheme } from "@mui/material"

const UpdateUserFormSchema = z.object({
    name: z.string().nonempty('O nome é obrigatório'),
    cellPhone: z.string(),
    occupation: z.string(),
})

type UpdateUserFormData = z.infer<typeof UpdateUserFormSchema>

export const FormUpdateUser = () => {
    const outerTheme = useTheme();

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserFormData>({
        resolver: zodResolver(UpdateUserFormSchema)
    })

    return(
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
                    type="text"
                    label="Celular"
                    variant='standard'
                    {...register('cellPhone')}
                />
                {errors.cellPhone && <span className={style.validation}>{errors.cellPhone.message}</span>}
                <TextField
                    className={style.input}
                    type="text"
                    label="Profissão"
                    variant='standard'
                    {...register('occupation')}
                />
                {errors.occupation && <span className={style.validation}>{errors.occupation.message}</span>}
            </ThemeProvider>
        </form>
    )
}