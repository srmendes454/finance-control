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

export default function FormRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const outerTheme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmePassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmePassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };
    const { setIsGlobalLoading } = useMain();
    
    async function Register(name: string, email: string, password: string, confirmPassword: string) {
        setIsGlobalLoading(true);
        const result = await AuthService.Register(name, email, password, confirmPassword);
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
                    value={name}
                    onChange={evento => setName(evento.target.value)}
                    id="name"
                    label="Nome"
                    variant='standard'
                    required
                />
                <TextField className={style.inputAuth}
                    type="text"
                    value={email}
                    onChange={evento => setEmail(evento.target.value)}
                    id="email"
                    label="Email"
                    variant='standard'
                    required
                />
                <TextField className={style.inputAuth}
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={password}
                    onChange={evento => setPassword(evento.target.value)}
                    id="password"
                    label="Senha"
                    variant='standard'
                    required
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
                <TextField className={style.inputAuth}
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={evento => setConfirmPassword(evento.target.value)}
                    id="confirmPassword"
                    label="Confirme a senha"
                    variant='standard'
                    required
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
                    onClick={() => Register(name, email, password, confirmPassword)}
                    type="button"
                    name="Salvar"
                    route="/login"
                    title="Cancelar"
                />
            </div>
        </form>
    )

}