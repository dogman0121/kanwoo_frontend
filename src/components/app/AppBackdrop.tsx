"use client"

import { Backdrop, Box, BoxProps, Paper, useTheme } from "@mui/material"
import React, { Children } from "react"

export interface AppBackdropProps {
    open: boolean,
    onClose: () => void,
    children?: React.ReactNode
}

export function AppBackdropContent({
    sx, ...props
}: BoxProps){
    return (
        <Box
            sx={{
                p: 3,

                ...sx
            }}
            {...props}
        />
    )
}

export default function AppBackdrop({open, onClose, children}: AppBackdropProps) {
    const theme = useTheme()

    return (
        <Backdrop
            open={open}
            onClick={onClose}
            sx={{
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: theme.spacing(2),
                    px: theme.spacing(2),
                    width: "100%"
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 2,

                        maxWidth: "600px",
                        mx: "auto"
                    }}
                >
                    {Children.map(children, c => c)}
                </Paper>
            </Box>
        </Backdrop>
    )
}