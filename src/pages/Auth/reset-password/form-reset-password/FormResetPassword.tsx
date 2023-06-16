import { IconButton, InputAdornment, TextField, ThemeProvider, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import ButtonAuth from "../../../../components/ButtonAuth";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import style from './FormResetPassword.module.scss';
import { useMain } from "../../../../store/MainProvider";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify";
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";


export default function FormResetPassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const outerTheme = useTheme();
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };
    const { setIsGlobalLoading } = useMain();

    async function ResetPassword(email: string, code: string, newPassword: string, confirmNewPassword: string) {
        setIsGlobalLoading(true);
        const result = await AuthService.ResetPassword(email, code, newPassword, confirmNewPassword);
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
        <form className={style.formAuth}>
            <ThemeProvider theme={StyleMaterialUi(outerTheme)}>
                <TextField className={style.inputAuth}
                    type="text"
                    value={email}
                    onChange={evento => setEmail(evento.target.value)}
                    id="email"
                    label="Confirme seu email cadastrado"
                    variant='standard'
                />
                <TextField className={style.inputAuth}
                    type="text"
                    value={code}
                    onChange={evento => setCode(evento.target.value)}
                    id="code"
                    label="Código recebido"
                    variant='standard'
                />
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
                    onClick={() => ResetPassword(email, code, newPassword, confirmNewPassword)}
                    type="button"
                    name="Salvar"
                    route="/login"
                    title="Cancelar"
                />
            </div>
        </form>
    )
}