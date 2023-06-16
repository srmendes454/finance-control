import { TextField, ThemeProvider, useTheme } from "@mui/material";
import { useState } from "react";
import style from "./FormSendEmailResetPassword.module.scss";
import ButtonAuth from "../../../../components/ButtonAuth";
import { useMain } from "../../../../store/MainProvider";
import AuthService from "../../../../services/Auth.service";
import { toast } from "react-toastify";
import { StyleMaterialUi } from "../../../../utils/StyleMaterialUi/StyleMaterialUi";


function FormSendEmailResetPassword() {
    const [email, setEmail] = useState("");
    const outerTheme = useTheme();
    const { setIsGlobalLoading } = useMain();

    async function SendCodeEmail(email: string) {
        setIsGlobalLoading(true);
        const result = await AuthService.SendCodeEmail(email);
        if (result.data.success === true) {
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
                theme: "dark",
                onClose: () => window.location.href = "/reset-password"
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
                    label="Email cadastrado"
                    variant='standard'
                />
            </ThemeProvider>
            <div className={style.button}>
                <ButtonAuth 
                    onClick={() => SendCodeEmail(email)}
                    type="button"
                    name="Enviar"
                    route="/login"
                    title="Cancelar"
                />
            </div>
        </form>
    )
}

export {FormSendEmailResetPassword}