"use client"

import { Box, CSSProperties } from "@mui/material"
import Poster from "./Poster"
import theme from "@/theme"

export interface PostersStackProps {
    middleSrc?: string,
    leftSrc?: string,
    rightSrc?: string,
    width?: string
}

const baseStyle: CSSProperties = {
}

export default function PostersStack({middleSrc, leftSrc, rightSrc, width} : PostersStackProps) {
    return (
        <Box
            sx={{
                position: "relative"
            }}
        >
            <Poster 
                src={middleSrc}
                width={width}
                style={{
                    ...baseStyle,
                    position: "relative",
                    zIndex: theme.zIndex.modal + 2
                }}
            />
            <Poster 
                src={leftSrc}
                width={`calc(${width} * 0.8)`}
                style={{
                    ...baseStyle, 
                    position: "absolute",
                    bottom: "50%",
                    right: "50%",
                    transform: "rotate(18deg) translate(100%, 30%)",
                    zIndex: theme.zIndex.modal + 1
                }}
            />
            <Poster 
                src={rightSrc}
                width={`calc(${width} * 0.85)`}
                style={{
                    ...baseStyle,
                    position: "absolute",
                    bottom: "50%",
                    right: "50%",
                    transform: "rotate(-16deg) translate(0, 50%)",
                    zIndex: theme.zIndex.modal + 1
                }}
            />
        </Box>
    )
}