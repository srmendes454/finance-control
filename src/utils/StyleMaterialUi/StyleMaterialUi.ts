import { Theme, createTheme } from "@mui/material";


const StyleMaterialUi = (outerTheme: Theme) =>
createTheme({
    palette: {
        mode: outerTheme.palette.mode
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "--TextField-brandBorderColor": "#3C413C",
                    "--TextField-brandBorderHoverColor": "#3E6943",
                    "--TextField-brandBorderFocusedColor": "#3E6943",
                    "& label.Mui-focused": {
                        color: "var(--TextField-brandBorderFocusedColor)"
                    }
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    "&:before": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)"
                    },
                    "&:hover:not(.Mui-disabled, .Mui-error):before": {
                        borderBottom: "2px solid var(--TextField-brandBorderHoverColor)"
                    },
                    "&.Mui-focused:after": {
                        borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)"
                    }
                }
            }
        }
    }
});

export {StyleMaterialUi}