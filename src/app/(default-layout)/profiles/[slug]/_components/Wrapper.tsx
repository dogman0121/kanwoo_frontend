"use client"

import { Paper, PaperProps, useTheme } from "@mui/material";

export default function Wrapper({
    src,
    sx,
    ...props
}: {src?: string} & PaperProps) {
    const theme = useTheme()

    return (
        <Paper
            elevation={3} 
            sx={{
                aspectRatio: "9/2",
                border: "none",
                borderRadius: 2,
                // borderBottomLeftRadius: `calc(${theme.shape.borderRadius} * 4)`,
                // borderBottomRightRadius: `calc(${theme.shape.borderRadius} * 4)`,

                ...sx
            }}
            {...props}
        >
            {src && (
                <img src={src}/>
            )}
        </Paper>
    )
}