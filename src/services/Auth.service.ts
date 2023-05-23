import IFormLogin from "../models/LoginModel"
import { Axios } from "./Api"

export default class AuthService {
    public static async Login (data: IFormLogin) {
        return Axios.post("/v1/user/login", data)
    }
}