"use client"

import { Box } from "@mui/material";

export default function Wrapper({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "min(480px, 100vw)",
            padding: "16px 24px 20px",
            border: "none",
            borderRadius: "20px",
            "&:focus": {
            outline: "none"
            }
        }}>
            {children}
        </Box>
    )
}