import IFormLogin, { Response } from "../models/LoginModel";
import IFormRegister from "../models/RegisterModel";
import IFormResetPassword from "../models/ResetPasswordModel";
import IFormSendEmail from "../models/SendEmailModel";
import { Axios } from "./Api"

export default class AuthService {
    public static async Login(data: IFormLogin): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("v1/user/login",
                data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async Register(data: IFormRegister): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("v1/user/register", data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async SendCodeEmail(data: IFormSendEmail): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("v1/user/send-email", data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async ResetPassword(data: IFormResetPassword): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put("v1/user/reset-password", data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }
}
