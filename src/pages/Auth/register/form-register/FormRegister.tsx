import { IconButton, InputAdornment, TextField, ThemeProvider, useTheme } from "@mui/material";
import { useState } from "react";
import style from './FormRegister.module.scss';
import ButtonAuth from "../../../../components/ButtonAuth";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import React from "react";
import { useMain } from "../../../../store/MainProvider";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify";
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IFormRegister from "../../../../models/RegisterModel";

const RegisterFormSchema = z.object({
    name: z.string().nonempty('O nome é obrigatório').transform(name => {
        return name.trim().split(' ').map(word => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ')
    }),
    email: z.string().nonempty('O e-mail é obrigatório').email('Formato inválido'),
    password: z.string().nonempty('A senha e obrigatória').min(6, 'A senha precisa de ter no minimo 6 caracteres'),
    confirmPassword: z.string().nonempty('Confirme a senha')
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas precisam ser iguais",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof RegisterFormSchema>

export default function FormRegister() {
    const outerTheme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmePassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmePassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };
    const { setIsGlobalLoading } = useMain();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterFormSchema)
    })

    async function Register(data: IFormRegister) {
        setIsGlobalLoading(true);
        const result = await AuthService.Register(data);
        if (result.data.success === true) {
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
        <form className={style.formAuth} onSubmit={handleSubmit(Register)}>
            <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                <div className={style.input}>
                    <TextField className={style.inputAuth}
                        type="text"
                        label="Nome"
                        variant='standard'
                        {...register('name')}
                    />
                    {errors.name && <span className={style.validation}>{errors.name.message}</span>}
                </div>
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
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Senha"
                        variant='standard'
                        {...register('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end" >
                                    <IconButton
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {showConfirmPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {errors.password && <span className={style.validation}>{errors.password.message}</span>}
                </div>
                <div className={style.input}>
                    <TextField className={style.inputAuth}
                        type={showPassword ? 'text' : 'password'}
                        label="Confirme a senha"
                        variant='standard'
                        {...register('confirmPassword')}
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
                    {errors.confirmPassword && <span className={style.validation}>{errors.confirmPassword.message}</span>}
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