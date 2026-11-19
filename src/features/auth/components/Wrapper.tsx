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
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 2,
            paddingRight: 2,
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