import CardAuth from "../../../components/CardAuth";
import FormRegister from "./form-register/FormRegister";

export const Register = () => {
    return (
        <div>
            <CardAuth isLogin={false} form={<FormRegister />} />
        </div>
    )
}