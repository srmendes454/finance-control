import style from './FormFamilyMember.module.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { StyleMaterialUi } from "../../utils/StyleMaterialUi/StyleMaterialUi";
import { TextField, useTheme } from "@mui/material";

const FamilyMemberFormSchema = z.object({
    name: z.string().nonempty('O nome é obrigatório'),
    kinship: z.string().nonempty('O grau de parentesco e obrigatório'),
    email: z.string().email('Formato inválido'),
})

type FamilyMemberFormData = z.infer<typeof FamilyMemberFormSchema>

export const FormFamilyMember = () => {
    const outerTheme = useTheme();

    const { register, handleSubmit, formState: { errors } } = useForm<FamilyMemberFormData>({
        resolver: zodResolver(FamilyMemberFormSchema)
    })

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
                    type="text"
                    label="Email"
                    variant='standard'
                    {...register('email')}
                />
                {errors.email && <span className={style.validation}>{errors.email.message}</span>}
                <TextField
                    className={style.input}
                    type="text"
                    label="Parentesco"
                    variant='standard'
                    {...register('kinship')}
                />
                {errors.kinship && <span className={style.validation}>{errors.kinship.message}</span>}
            </ThemeProvider>
        </form>
    )
}