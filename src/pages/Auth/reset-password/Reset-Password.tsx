import CardAuth from "../../../components/CardAuth";
import FormResetPassword from "./form-reset-password/FormResetPassword";
import { FormSendEmailResetPassword } from "./form-send-email-reset-password/FormSendEmailResetPassword";
import { FormValidateCode } from "./form-validate-code/FormValidateCode";
import style from "./Reset-Password.module.scss";

export const ResetPassword = () => {
  return <CardAuth isLogin={false} form={<FormResetPassword />} />;
};

export const SendEmailResetPassword = () => {
  return <CardAuth isLogin={false} form={<FormSendEmailResetPassword />} />;
};

export const ValidateCode = () => {
  return <CardAuth isLogin={false} form={<FormValidateCode />} />;
};
