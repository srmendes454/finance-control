import CardAuth from "../../../components/CardAuth";
import { FormLogin } from "./form-login/FormLogin";
import style from "./Login.module.scss"

export const Login = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={true} form={<FormLogin />} />
        </div>
    )
}