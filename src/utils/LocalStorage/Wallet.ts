export const WalletCurrentId = (): string => {
    return localStorage.getItem('currentWalletId')!;
}