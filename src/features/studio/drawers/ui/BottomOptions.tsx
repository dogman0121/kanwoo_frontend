"use client"

import { Box } from "@mui/material";

export function BottomOptionsContainer({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",

                borderTop: "1px solid",
                borderColor: "divider",

                px: 2
            }}
        >
            {children}
        </Box>
    )
}