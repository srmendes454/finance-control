import CardAuth from "../../../components/CardAuth";
import FormResetPassword from "./form-reset-password/FormResetPassword";
import style from "./Reset-Password.module.scss"

export const ResetPassword = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={false} form={<FormResetPassword />} />
        </div>
    )
}