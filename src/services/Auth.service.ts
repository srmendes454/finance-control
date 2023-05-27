import { Response } from "../models/LoginModel";
import IFormRegister from "../models/RegisterModel";
import IFormResetPassword from "../models/ResetPasswordModel";
import { Axios } from "./Api"

export default class AuthService {
    public static async Login(email: string, password: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("https://localhost:5001/v1/user/login", 
            { email, password })
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
            Axios.post("https://localhost:5001/v1/user/register", 
            { data })
            .then(response => {
                resolve(response as unknown as Response<string>);
            })
            .catch((error) => {
                reject(error.message);
            });
        });
    }
    
    public static async SendCodeEmail(email: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("https://localhost:5001/v1/user/send-email", 
            { email })
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
            Axios.put("https://localhost:5001/v1/user/reset-password", 
            { data })
            .then(response => {
                resolve(response as unknown as Response<string>);
            })
            .catch((error) => {
                reject(error.message);
            });
        });
    }
}
