import { Response } from "../models/LoginModel";
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
}
