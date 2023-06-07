import CardAuth from "../../../components/CardAuth";
import FormResetPassword from "./form-reset-password/FormResetPassword";
import { FormSendEmailResetPassword } from "./form-send-email-reset-password/FormSendEmailResetPassword";
import style from "./Reset-Password.module.scss"

export const ResetPassword = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={false} form={<FormResetPassword />} />
        </div>
    )
}

export const SendEmailResetPassword = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={false} form={<FormSendEmailResetPassword />} />
        </div>
    )
}
