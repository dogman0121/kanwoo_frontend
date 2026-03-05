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
            paper: "#1c1c1c"
        }
    },
    components: {
        ...theme.components
    }
})