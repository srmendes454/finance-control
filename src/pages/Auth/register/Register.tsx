import CardAuth from "../../../components/CardAuth";
import FormRegister from "./form-register/FormRegister";
import style from "./Register.module.scss"

export const Register = () => {
    return (
        <div className={style.container}>
            <CardAuth isLogin={false} form={<FormRegister />} />
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