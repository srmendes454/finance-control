import CardAuth from "../../../components/CardAuth";
import { FormLogin } from "./form-login/FormLogin";

export const Login = () => {
    return (
        <div>
            <CardAuth isLogin={true} form={<FormLogin />} />
        </div>
    )
}