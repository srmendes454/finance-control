import CardAuth from "../../../components/CardAuth";
import FormRegister from "./form-register/FormRegister";
import style from "./Register.module.scss"

export const Register = () => {
    return (
        <CardAuth form={<FormRegister />} />
    )
}