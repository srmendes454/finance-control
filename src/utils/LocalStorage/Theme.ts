export const Theme = (): string | null => {
    const theme = localStorage.getItem('currentTheme');
    if (theme === null) {
        return "dark";
    }
    else {
        return theme;
    }
}