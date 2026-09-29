"use client"

import { Box } from "@mui/material";
import { Children } from "react";

export default function MangaCarousel({
    children
}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px"
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}