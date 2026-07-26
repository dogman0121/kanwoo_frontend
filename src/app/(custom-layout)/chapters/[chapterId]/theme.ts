"use client"

import theme from "@/theme";
import { createTheme } from "@mui/material";

export const chapterTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#FFD600"
        },
        background: {
            default: "#FFFFFF",
            paper: "#191919"
        }
    },
    components: {
        ...theme.components
    }
})