import { IconButton, InputAdornment, TextField, Theme, ThemeProvider, createTheme, useTheme } from "@mui/material";
import style from './FormLogin.module.scss';
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useState } from "react";
import ButtonAuth from "../../../../components/ButtonAuth";
import React from "react";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify"
import { useMain } from "../../../../store/MainProvider";

export const FormLogin = () => {

    const customTheme = (outerTheme: Theme) =>
        createTheme({
            palette: {
                mode: outerTheme.palette.mode
            },
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            "--TextField-brandBorderColor": "#3C413C",
                            "--TextField-brandBorderHoverColor": "#3E6943",
                            "--TextField-brandBorderFocusedColor": "#3E6943",
                            "& label.Mui-focused": {
                                color: "var(--TextField-brandBorderFocusedColor)"
                            }
                        }
                    }
                },
                MuiInput: {
                    styleOverrides: {
                        root: {
                            "&:before": {
                                borderBottom: "2px solid var(--TextField-brandBorderColor)"
                            },
                            "&:hover:not(.Mui-disabled, .Mui-error):before": {
                                borderBottom: "2px solid var(--TextField-brandBorderHoverColor)"
                            },
                            "&.Mui-focused:after": {
                                borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)"
                            }
                        }
                    }
                }
            }
        });
    const outerTheme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };

    const { setIsGlobalLoading } = useMain();

    async function Login(email: string, password: string) {
        setIsGlobalLoading(true);
        const result = await AuthService.Login(email, password);
        if (result.data.success === true) {
            toast.success("Login efetuado com sucesso. Aguarde, você será redirecionado para a tela Inicial", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
                theme: "dark",
                onClose: () => window.location.href = "/home-welcome"
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
                <ThemeProvider theme={customTheme(outerTheme)}>
                    <TextField className={style.inputAuth}
                        type="text"
                        value={email}
                        onChange={evento => setEmail(evento.target.value)}
                        id="email"
                        label="Email"
                        variant='standard'
                    />
                </ThemeProvider>
                <ThemeProvider theme={customTheme(outerTheme)}>
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
                        onClick={() => Login(email, password)}
                        type="button"
                        name="Entrar"
                        route="/reset-password"
                        title="Esqueci minha senha"
                    />
                </div>
            </form>
        </>
    )
}