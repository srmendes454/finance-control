import { IconButton, InputAdornment, TextField, Theme, ThemeProvider, createTheme, useTheme } from "@mui/material";
import { useState } from "react";
import style from './FormRegister.module.scss';
import ButtonAuth from "../../../../components/ButtonAuth";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import React from "react";

export default function FormRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmePassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmePassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };

    return (
        <form className={style.formAuth}>
            <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField className={style.inputAuth}
                    type="text"
                    value={name}
                    onChange={evento => setName(evento.target.value)}
                    id="name"
                    label="Nome"
                    variant='standard'
                />
            </ThemeProvider>
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
                    type={showConfirmPassword ? 'text' : 'password'}
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
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}>
                                    {showConfirmPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </ThemeProvider>
            <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField className={style.inputAuth}
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={evento => setConfirmPassword(evento.target.value)}
                    id="confirmPassword"
                    label="Confirme a senha"
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
                    onClick={() => {}}
                    type="submit"
                    name="Salvar"
                    route="/login"
                    title="Cancelar"
                />
            </div>
        </form>
    )

}