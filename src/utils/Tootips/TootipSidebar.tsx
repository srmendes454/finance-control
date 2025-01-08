import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

const currentTheme = localStorage.getItem("currentTheme");
const TooltipSidebar = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, ...props }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: currentTheme === "light" ? '#CDD4CE' : '#2D332D',
        maxWidth: 300,
        height: "2rem",
        color: props.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 700,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: '7px',
        borderBottomLeftRadius: '7px',
        borderRight: `3px solid ${props.color}`
    },
}));

export {TooltipSidebar}