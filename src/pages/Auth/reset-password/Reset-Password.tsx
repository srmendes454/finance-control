import CardAuth from "../../../components/CardAuth";
import FormResetPassword from "./form-reset-password/FormResetPassword";
import { FormSendEmailResetPassword } from "./form-send-email-reset-password/FormSendEmailResetPassword";
import { FormValidateCode } from "./form-validate-code/FormValidateCode";
import style from "./Reset-Password.module.scss"

export const ResetPassword = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={false} form={<FormResetPassword />} />
            <ul className={style.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}

export const SendEmailResetPassword = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={false} form={<FormSendEmailResetPassword />} />
            <ul className={style.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}

export const ValidateCode = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={false} form={<FormValidateCode />} />
            <ul className={style.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}
