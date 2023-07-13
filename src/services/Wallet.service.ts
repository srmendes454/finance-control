import { Response } from "../models/LoginModel";
import IWalletInsert from "../models/WalletInsertModel";
import IWalletResponse from "../models/WalletResponseModel";
import { Axios } from "./Api"

class WalletService {
    public static async Insert(data: IWalletInsert): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.post("v1/wallet", data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async GetAll(): Promise<Response<IWalletResponse[]>> {
        return new Promise((resolve, reject) => {
            Axios.get("v1/wallet")
                .then(response => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async GetById(walletId: string): Promise<Response<IWalletResponse>> {
        return new Promise((resolve, reject) => {
            Axios.get("v1/wallet/" + walletId)
                .then(response => {
                    resolve(response as unknown as Response<IWalletResponse>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async Update(walletId: string, data: IWalletInsert): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put("v1/wallet/" + walletId, data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async Delete(walletId: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.delete("v1/wallet/" + walletId)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async Active(walletId: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put("v1/wallet/" + walletId + "/active")
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async Inactive(walletId: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put("v1/wallet/" + walletId + "/inactive")
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }
}

export { WalletService };