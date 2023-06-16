import { IconButton, InputAdornment, TextField, ThemeProvider, useTheme } from "@mui/material";
import style from './FormLogin.module.scss';
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useState } from "react";
import ButtonAuth from "../../../../components/ButtonAuth";
import React from "react";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify"
import { useMain } from "../../../../store/MainProvider";
import IFormLogin from "../../../../models/LoginModel";
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";

export const FormLogin = () => {
    const outerTheme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };

    const { setIsGlobalLoading } = useMain();

    async function Login(data: IFormLogin) {
        setIsGlobalLoading(true);
        const result = await AuthService.Login(data);
        if (result.data.success === true) {
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
        <>
            <form className={style.formAuth}>
                <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                    <TextField className={style.inputAuth}
                        type="text"
                        value={email}
                        onChange={evento => setEmail(evento.target.value)}
                        id="email"
                        label="Email"
                        variant='standard'
                    />
                    <TextField className={style.inputAuth}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={evento => setPassword(evento.target.value)}
                        id="password"
                        label="Senha"
                        variant='standard'
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
                </ThemeProvider>
                <div className={style.button}>
                    <ButtonAuth
                        onClick={() => Login({email, password})}
                        type="button"
                        name="Entrar"
                        route="/send-code-email"
                        title="Esqueci minha senha"
                    />
                </div>
            </form>
        </>
    )
}