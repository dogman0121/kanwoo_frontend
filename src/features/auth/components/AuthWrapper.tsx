"use client"

import { Paper } from "@mui/material";

export default function AuthWrapper({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <Paper sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "min(400px, 100vw)",
            padding: "16px 24px 20px",
            border: "none",
            borderRadius: "20px",
            "&:focus": {
            outline: "none"
            }
        }}>
            {children}
        </Paper>
    )
}