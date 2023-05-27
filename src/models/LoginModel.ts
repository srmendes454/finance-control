export default interface IFormLogin {
    email: string,
    password: string,
}
export interface Response<Data> {
    data: {
        data: Data,
        success: boolean,
        message: string,
        time: Date,
        environment: string,
        router: string,
        tokenValidTotalMinutesTo: number,
        errorMessage: [string]
    }
}

export interface User {
    userId: string,
    name: string;
    occupation: string;
    email: string;
    cellPhone: string;
    thumbnail: string;
}

export interface UserToken {
    accessToken: string;
    expiresIn: boolean;
    usuarioToken: User;
}

export interface LoginResponse {
    accessToken: string;
    expiresIn: boolean;
    usuarioToken: User;
}

export interface Message {
    message: string
}