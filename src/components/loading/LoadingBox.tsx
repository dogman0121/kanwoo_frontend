"use client"

import { Box, Button, CircularProgress, SxProps, Typography, useTheme } from "@mui/material"
import { Children } from "react"
import AppButton from "../app/AppButton"

export interface LoadingBoxProps {
    loading?: boolean,
    error?: boolean,
    errorMessage?: string,
    onRetry?: () => void,
    children?: React.ReactNode,
    sx?: SxProps
}

export interface LoadingErrorProps {
    errorMessage?: string,
    onRetry?: () => void,
}

export function LoadingError({
    errorMessage,
    onRetry
}: LoadingErrorProps) {
    const defaultErrorMessage = "При загрузке произошла ошибка. Попробуйте позже."

    return (
        <Box
            sx={{
                mt: 10,

                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Typography color="textSecondary" >{errorMessage || defaultErrorMessage}</Typography>
            <AppButton
                loadingEnabled 
                variant="contained"
                color="primary"
                onClick={() => onRetry?.() }
                sx={{
                    mt: 2
                }}    
            >
                Обновить
            </AppButton>
        </Box>
    )
}

export default function LoadingBox({
    loading, 
    error,
    errorMessage,
    onRetry,
    children,
    sx
}: LoadingBoxProps){
    const theme = useTheme()

    
    if (error) {
        return (
            <LoadingError 
                errorMessage={errorMessage}
                onRetry={onRetry}
            />
        )
    }

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