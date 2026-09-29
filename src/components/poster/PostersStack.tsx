"use client"

import { Box, BoxProps, CSSProperties } from "@mui/material"
import Poster, { PosterProps } from "./Poster"
import theme from "@/constants/themes/main.theme"

export interface PostersStackProps {
    width?: string,
    middleSrc?: string,
    leftSrc?: string,
    rightSrc?: string,
    slotProps?: {
        left: PosterProps,
        middle: PosterProps,
        right?: PosterProps,
        container?: BoxProps
    }
}


export default function PostersStack({middleSrc, leftSrc, rightSrc, width} : PostersStackProps) {
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Poster 
                src={middleSrc}
                width={width}
                style={{
                    zIndex: theme.zIndex.modal + 2
                }}
            />
            <Poster 
                src={leftSrc}
                width={`calc(${width} * 0.8)`}
                style={{ 
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
                    position: "absolute",
                    bottom: "50%",
                    right: "50%",
                    transform: "rotate(-16deg) translate(-10%, 50%)",
                    zIndex: theme.zIndex.modal + 1
                }}
            />
        </Box>
    )
}