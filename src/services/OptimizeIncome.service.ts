import { Axios } from "./Api"
import { Response } from "../models/LoginModel";
import IOptimizeIncomeResponse from "../models/OptimizeIncomeResponse";
import IOptimizeIncomeRequest from "../models/OptimizeIncomeRequest";

class OptimizeIncomeService {

    public static async GetAll(walletId: string): Promise<Response<IOptimizeIncomeResponse[]>> {
        return new Promise((resolve, reject) => {
            Axios.get("/v1/wallet/"+ walletId + "/optimize-income")
                .then(response => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async GetById(walletId: string, optimizeIncomeId: string): Promise<Response<IOptimizeIncomeResponse>> {
        return new Promise((resolve, reject) => {
            Axios.get("/v1/wallet/"+ walletId +"/optimize-income/" + optimizeIncomeId)
                .then(response => {
                    resolve(response as unknown as Response<IOptimizeIncomeResponse>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async Update(walletId: string, optimizeIncomeId: string, data: IOptimizeIncomeRequest): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.put("/v1/wallet/"+ walletId +"/optimize-income/" + optimizeIncomeId, data)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }

    public static async Delete(walletId: string, optimizeIncomeId: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            Axios.delete("/v1/wallet/"+ walletId +"/optimize-income/" + optimizeIncomeId)
                .then(response => {
                    resolve(response as unknown as Response<string>);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }
}

export {OptimizeIncomeService}