import { IconButton, InputAdornment, TextField, ThemeProvider, useTheme } from "@mui/material";
import style from './FormLogin.module.scss';
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import ButtonAuth from "../../../../components/ButtonAuth";
import React from "react";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify"
import { useMain } from "../../../../store/MainProvider";
import IFormLogin from "../../../../models/LoginModel";
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginFormSchema = z.object({
    email: z.string().nonempty('O e-mail é obrigatório').email('Formato inválido'),
    password: z.string().nonempty('A senha e obrigatória').min(6, 'A senha precisa de ter no minimo 6 caracteres')
})

type LoginFormData = z.infer<typeof LoginFormSchema>

export const FormLogin = () => {
    const outerTheme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema)
    })

    const { setIsGlobalLoading } = useMain();

    async function Login(data: IFormLogin) {
        setIsGlobalLoading(true);
        const result = await AuthService.Login(data);
        if (result.data.success === true) {
            localStorage.setItem("token", result.data.data || '')
            toast.success("Login efetuado com sucesso. Aguarde, você será redirecionado para a tela Inicial", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark",
                onClose: () => window.location.href = "/welcome"
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
        <form className={style.formAuth} onSubmit={handleSubmit(Login)}>
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
                <div className={style.input}>
                    <TextField className={style.inputAuth}
                        type={showPassword ? 'text' : 'password'}
                        label="Senha"
                        variant='standard'
                        {...register('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end" >
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {errors.password && <span className={style.validation}>{errors.password.message}</span>}
                </div>
            </ThemeProvider>
            <div className={style.button}>
                <ButtonAuth
                    type="submit"
                    name="Entrar"
                    route="/send-code-email"
                    title="Esqueci minha senha"
                />
            </div>
        </form>
    )
}