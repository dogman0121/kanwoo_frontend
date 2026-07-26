"use client"

import { Box, CircularProgress, SxProps, useTheme } from "@mui/material"
import { Children } from "react"

export default function LoadingBox({
    loading, 
    children,
    sx
}: {
    loading: boolean, 
    children: React.ReactNode,
    sx?: SxProps
}){
    const theme = useTheme()

    return (
        <Box
            sx={{
                ...sx
            }}
        >
            {loading ?
                <Box
                    sx={{
                        py: theme.spacing(5),
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <CircularProgress/>
                </Box>
                :
                <>
                    {Children.map(children, c => c)}
                </>
            }
        </Box>
    )
}