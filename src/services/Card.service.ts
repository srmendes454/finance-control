import { toast } from "react-toastify";
import { Response, ResponsePaginated } from "../models/LoginModel";
import { Axios } from "./Api"
import ICardInsert from "../models/CardInsertModel";
import ICardResponse from "../models/CardResponseModel";
import { Theme } from "../utils/LocalStorage/Theme";
import { WalletCurrentId } from "../utils/LocalStorage/Wallet";
import ICardUpdate from "../models/CardUpdateModel";

class CardService {
    public static async Insert(data: ICardInsert): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("v1/card", data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        theme: Theme() === "dark" ? "dark" : "light"
                    });
                });
        });
    }

    public static async GetAll(): Promise<ResponsePaginated<ICardResponse[]>> {
        const walletId = WalletCurrentId();
        return new Promise((resolve, reject) => {
            Axios.get(`/v1/card/wallet/${walletId}`)
                .then(response => {
                    resolve(response);
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        theme: Theme() === "dark" ? "dark" : "light"
                    });
                });
        });
    }

    public static async GetById(cardId: string): Promise<Response<ICardResponse>> {
        const walletId = WalletCurrentId();
        return new Promise((resolve, reject) => {
            Axios.get(`/v1/card/${cardId}/wallet/${walletId}`)
                .then(response => {
                    resolve(response as unknown as Response<ICardResponse>);
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        theme: Theme() === "dark" ? "dark" : "light"
                    });
                });
        });
    }

    public static async Update(cardId: string, data: ICardUpdate): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put(`/v1/card/${cardId}`, data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        theme: Theme() === "dark" ? "dark" : "light"
                    });
                });
        });
    }

    public static async Delete(cardId: string): Promise<Response<string>> {
        const walletId = WalletCurrentId();
        return new Promise((resolve, reject) => {
            Axios.delete(`/v1/card/${cardId}/wallet/${walletId}`)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        theme: Theme() === "dark" ? "dark" : "light"
                    });
                });
        });
    }
}

export { CardService };