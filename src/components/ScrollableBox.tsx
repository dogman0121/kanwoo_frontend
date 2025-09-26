"use client"

import { Box, styled } from "@mui/material";

const ScrollableBox = styled(Box)(({theme}) => ({
    "&::-webkit-scrollbar": {
        width: "8px"
    },

    "&::-webkit-scrollbar-button": {
        display: "none"
    },

    "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.vars?.palette.secondary.light,
        borderRadius: "8px",
        border: `0px`
    }
}))

export default ScrollableBox;