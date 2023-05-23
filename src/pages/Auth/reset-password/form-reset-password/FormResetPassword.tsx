import { IconButton, InputAdornment, TextField, Theme, ThemeProvider, createTheme, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import ButtonAuth from "../../../../components/ButtonAuth";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import style from './FormResetPassword.module.scss';


export default function FormResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
    
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(false);

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };

    return (
        <form className={style.formAuth}>
            <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField className={style.inputAuth}
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={evento => setNewPassword(evento.target.value)}
                    id="newPassword"
                    label="Nova senha"
                    variant='standard'
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
            </ThemeProvider>
            <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField className={style.inputAuth}
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={evento => setConfirmNewPassword(evento.target.value)}
                    label="Confirme a nova senha"
                    variant='standard'
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