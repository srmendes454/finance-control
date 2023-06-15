import IFormLogin, { Response } from "../models/LoginModel";
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

    public static async Register(name: string, email: string, password: string, confirmPassword: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("https://localhost:5001/v1/user/register", 
            { name, email, password, confirmPassword })
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
    
    public static async ResetPassword(email: string, code: string, newPassword: string, confirmNewPassword: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put("https://localhost:5001/v1/user/reset-password", 
            { email, code, newPassword, confirmNewPassword })
            .then(response => {
                resolve(response as unknown as Response<string>);
            })
            .catch((error) => {
                reject(error.message);
            });
        });
    }
}
