import { Box, Drawer, SxProps, Typography, TypographyProps, useTheme } from "@mui/material";
import { Children } from "react";

export function BottomPanelHeader({
    sx,
    ...props
}: TypographyProps) {
    return (
        <Typography 
            sx={{
                fontWeight: "600",
                fontSize: "18px",
                pt: 2,
                px: 3,

                position: "sticky",
                top: 0,

                ...sx
            }}
            {...props}
        />
    )
}

export function BottomPanelBody({
    children,
    sx
}: {
    children?: React.ReactNode,
    sx?: SxProps
}) {
    return (
        <Box
            sx={{
                pt: 2,
                pb: 2,
                px: 3,
                ...sx
            }}
        >
            {children}
        </Box>
    )
}

export interface BottomPanelProps {
    open: boolean, 
    onClose?: () => void,
    sx?: SxProps,
    children?: React.ReactNode
}

export default function BottomPanel({
    open,
    onClose,
    children,
    sx
}: BottomPanelProps) {
    const theme = useTheme()

    return (
        <Drawer
            elevation={1}
            open={open}
            onClose={onClose}
            anchor="bottom"
            slotProps={{
                paper: {
                    sx: {
                        borderTopLeftRadius: `calc(${theme.shape.borderRadius} * 2)`,
                        borderTopRightRadius: `calc(${theme.shape.borderRadius} * 2)`,
                        ...sx
                    }
                }
            }}      
        >
            {Children.map(children, c => c)}
        </Drawer>
    )
}