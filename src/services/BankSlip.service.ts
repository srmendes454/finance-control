import { toast } from "react-toastify";
import { Response, ResponsePaginated } from "../models/LoginModel";
import { Axios } from "./Api"
import { Theme } from "../utils/LocalStorage/Theme";
import { WalletCurrentId } from "../utils/LocalStorage/Wallet";
import IBankSlipInsert from "../models/BankSlipInsert";
import IBankSlipResponse from "../models/BankSlipResponse";

class BankSlipService {
    public static async Insert(data: IBankSlipInsert): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("v1/bank-slip", data)
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

    public static async GetAll(): Promise<ResponsePaginated<IBankSlipResponse[]>> {
        const walletId = WalletCurrentId();
        return new Promise((resolve, reject) => {
            Axios.get(`/v1/bank-slip/wallet/${walletId}`)
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

    public static async GetById(bankSlipId: string): Promise<Response<IBankSlipResponse>> {
        const walletId = WalletCurrentId();
        return new Promise((resolve, reject) => {
            Axios.get(`/v1/bank-slip/${bankSlipId}/wallet/${walletId}`)
                .then(response => {
                    resolve(response as unknown as Response<IBankSlipResponse>);
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

    public static async Update(bankSlipId: string, data: IBankSlipInsert): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put(`/v1/bank-slip/${bankSlipId}`, data)
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

    public static async Delete(bankSlipId: string): Promise<Response<string>> {
        const walletId = WalletCurrentId();
        return new Promise((resolve, reject) => {
            Axios.delete(`/v1/bank-slip/${bankSlipId}/wallet/${walletId}`)
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

export { BankSlipService };