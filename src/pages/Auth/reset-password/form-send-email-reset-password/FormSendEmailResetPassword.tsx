import { TextField, ThemeProvider, useTheme } from "@mui/material";
import style from "./FormSendEmailResetPassword.module.scss";
import ButtonAuth from "../../../../components/ButtonAuth";
import { useMain } from "../../../../store/MainProvider";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify";
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IFormSendEmail from "../../../../models/SendEmailModel";

const SendEmailFormSchema = z.object({
    email: z.string().nonempty('O email é obrigatório').email('Formato inválido')
})

type SendEmailFormData = z.infer<typeof SendEmailFormSchema>

function FormSendEmailResetPassword() {
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors } } = useForm<SendEmailFormData>({
        resolver: zodResolver(SendEmailFormSchema)
    })

    async function SendCodeEmail(data: IFormSendEmail) {
        setIsGlobalLoading(true);
        const result = await AuthService.SendCodeEmail(data);
        if (result.data.success === true) {
            localStorage.setItem("email", data.email);
            localStorage.setItem("code", result.data.data || '');
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
                theme: "dark",
                onClose: () => window.location.href = "/validate-code"
            });
        }
        else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
    }

    return (
        <form className={style.formAuth} onSubmit={handleSubmit(SendCodeEmail)}>
            <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                <div className={style.input}>
                    <TextField className={style.inputAuth}
                        type="text"
                        label="Email"
                        variant='standard'
                        {...register('email')}
                    />
                    {errors.email && <span className={style.validation}>{errors.email.message}</span>}
                </div>
            </ThemeProvider>
            <div className={style.button}>
                <ButtonAuth
                    type="submit"
                    name="Enviar"
                    route="/login"
                    title="Cancelar"
                />
            </div>
        </form>
    )
}

export { FormSendEmailResetPassword }