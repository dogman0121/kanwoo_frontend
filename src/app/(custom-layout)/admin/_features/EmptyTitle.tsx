"use client"

import { Typography, useTheme } from "@mui/material"

export default function EmptyTitle() {
    const theme = useTheme()

    return (
        <Typography 
            fontSize={"24px"}
            sx={{
                py: theme.spacing(5),
                display: 'flex',
                justifyContent: "center"
            }}
        >
            Список пуст
        </Typography>
    )
}