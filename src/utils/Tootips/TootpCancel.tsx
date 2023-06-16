import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

const TootipCancel = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#232623',
        maxWidth: 300,
        height: "12px",
        color: '#732c2c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(12),
        fontWeight: 700,
        borderRadius: '3px',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottom: '1px solid #732c2c'
    },
}));

export {TootipCancel}