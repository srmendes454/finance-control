import CardAuth from "../../../components/CardAuth";
import FormResetPassword from "./form-reset-password/FormResetPassword";

export const ResetPassword = () => {
    return (
        <div>
            <CardAuth isLogin={false} form={<FormResetPassword />} />
        </div>
    )
}