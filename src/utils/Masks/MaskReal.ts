const MaskReal = (value: number, decimalPlaces: number = 2): string => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }).format(value);
};

export { MaskReal };