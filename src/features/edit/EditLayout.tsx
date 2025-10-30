import { Box } from "@mui/material";
import React from "react";

export default function EditLayout({children}: {children: React.ReactNode}) {
    return (
        <Box sx={{display: "flex"}}>
            {children}
        </Box>
    )
}