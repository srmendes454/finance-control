import { TextField, ThemeProvider, useTheme } from "@mui/material";
import ButtonAuth from "../../../../components/ButtonAuth";
import style from './FormValidateCode.module.scss';
import { useMain } from "../../../../store/MainProvider";
import { toast } from "react-toastify";
import { StyleInputOutlined } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IFormValidateCode from "../../../../models/ValidateCodeModel";
import { MaskEmail } from "../../../../utils/Masks/MaskEmail";
import { useEffect } from "react";

const ValidateCodeFormSchema = z.object({
    code: z.array(z.string().nonempty('O código é obrigatório').toUpperCase())
})

type ValidateCodeFormData = z.infer<typeof ValidateCodeFormSchema>

function FormValidateCode() {
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();
    const emailLogado = localStorage.getItem('email');
    const maskEmail = MaskEmail(emailLogado!);

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<ValidateCodeFormData>({
        resolver: zodResolver(ValidateCodeFormSchema)
    })

    async function ValidateCode(data: IFormValidateCode) {
        setIsGlobalLoading(true);
        const result = localStorage.getItem('code');
        const newData = data.code.join('');
        if (result === newData) {
            localStorage.removeItem('code');
            toast.success('Código validado com sucesso', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
                theme: "dark",
                onClose: () => window.location.href = "/reset-password"
            });
        }
        else {
            toast.warning('Código inválido', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
    }

    const { fields } = useFieldArray({
        control,
        name: "code" as never,
    });

    useEffect(() => { setValue('code', Array.from({ length: 8 })) }, [])
    return (
        <form className={style.formAuth} onSubmit={handleSubmit(ValidateCode)}>
            <ThemeProvider theme={StyleInputOutlined(outerTheme)}>
                <h3>Confirme o código enviado para
                    <span> {maskEmail}</span>
                </h3>
                <div className={style.input}>
                    {fields.map((field, index) => (
                        <TextField className={style.inputAuth}
                            key={index}
                            type="text"
                            variant='outlined'
                            inputProps={{ maxLength: 1 }}
                            {...register(`code.${index}`)}
                        />
                    ))}
                </div>
                {errors.code && <span className={style.validation}>{errors.code.message}</span>}
            </ThemeProvider>
            <div className={style.button}>
                <ButtonAuth
                    type="submit"
                    name="Validar"
                    route="/login"
                    title="Cancelar"
                />
            </div>
        </form>
    )
}

export { FormValidateCode };