"use client"

import { Backdrop, Box, Paper, useTheme } from "@mui/material"
import { Children } from "react"

export interface AppBackdropProps {
    open: boolean,
    onClose: () => void,
    children?: React.ReactNode
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
                    bottom: theme.spacing(3),
                    px: theme.spacing(3),
                    width: "100%"
                }}
            >
                <Paper
                    sx={{
                        borderRadius: "12px",
                        padding: theme.spacing(3)
                    }}
                >
                    {Children.map(children, c => c)}
                </Paper>
            </Box>
        </Backdrop>
    )
}