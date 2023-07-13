import { IconButton, InputAdornment, TextField, ThemeProvider, useTheme } from "@mui/material";
import React from "react";
import ButtonAuth from "../../../../components/ButtonAuth";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import style from './FormResetPassword.module.scss';
import { useMain } from "../../../../store/MainProvider";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify";
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IFormResetPassword from "../../../../models/ResetPasswordModel";

const ResetPasswordFormSchema = z.object({
    newPassword: z.string().nonempty('A senha e obrigatória').min(6, 'A senha precisa de ter no minimo 6 caracteres'),
    confirmNewPassword: z.string().nonempty('Confirme a senha')
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmNewPassword"]
});

type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>

export default function FormResetPassword() {
    const outerTheme = useTheme();
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(ResetPasswordFormSchema)
    })

    async function ResetPassword(data: IFormResetPassword) {
        setIsGlobalLoading(true);
        data.email = localStorage.getItem('email')!;
        const result = await AuthService.ResetPassword(data);
        if (result.data.success === true) {
            localStorage.removeItem('email');
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark",
                onClose: () => window.location.href = "/login"
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
        <form className={style.formAuth} onSubmit={handleSubmit(ResetPassword)}>
            <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                <div className={style.input}>
                    <TextField className={style.inputAuth}
                        type={showNewPassword ? 'text' : 'password'}
                        label="Nova senha"
                        variant='standard'
                        {...register('newPassword')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end" >
                                    <IconButton
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {showNewPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {errors.newPassword && <span className={style.validation}>{errors.newPassword.message}</span>}
                </div>
                <div className={style.input}>
                    <TextField className={style.inputAuth}
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        label="Confirme a nova senha"
                        variant='standard'
                        {...register('confirmNewPassword')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end" >
                                    <IconButton
                                        onClick={handleClickShowConfirmNewPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {showConfirmNewPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {errors.confirmNewPassword && <span className={style.validation}>{errors.confirmNewPassword.message}</span>}
                </div>
            </ThemeProvider>
            <div className={style.button}>
                <ButtonAuth
                    type="submit"
                    name="Salvar"
                    route="/login"
                    title="Cancelar"
                />
            </div>
        </form>
    )
}