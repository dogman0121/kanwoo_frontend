import { Box, SxProps, useTheme } from "@mui/material";
import { range } from "lodash";
import { useEffect, useRef, useState } from "react";
import PointerIcon from "./PointerIcon";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';


const swipeAnimation = {
    "@keyframes cursorVerticalSwipe": {
        "from": {
            transform: "translateY(0)"
        },
        "50%": {
            transform: "translateY(-15px)"
        },
        "to": {
            transform: "translateY(0)"
        }
    },
    animation: "cursorVerticalSwipe 2s ease infinite",
}

function Pointer({sx}: {sx?: SxProps}) {
    return (
        <Box
            id="swipe-preview-cursor"
            sx={{
                ...swipeAnimation,

                width: "40px",
                height: "40px",

                position: "absolute",
                bottom: "5px",
                left: "40%",

                zIndex: "10001",

                ...sx
            }}
        >
            <Box
                sx={{
                    position: "relative",

                    width: "100%",
                    height: "100%"
                }}
            >
                <NorthRoundedIcon
                    sx={{
                        position: "absolute",
                        left: "6px",
                        top: "6px",
                        fontSize: "14px",
                        color: "#C7C7C7"
                    }}
                />
                <PointerIcon 
                    sx={{
                        fontSize: "24px",
                        fill: "#C7C7C7",

                        position: "absolute",
                        right: 0,
                        bottom: 0
                    }}
                />
            </Box>
        </Box>
    )
}

const slidesSwipeAnimation = {
    "@keyframes verticalSlidesSwipe": {
        "from": {
            transform: "translateY(0)",
        },
        "50%": {
            transform: "translateY(-34.5px)",
        },
        "to": {
            transform: "translateY(-34.5px)",
        }
    },
    animation: "verticalSlidesSwipe 2s ease infinite",
}

function Slides() {
    return (
        <Box
            sx={{
            position: "relative",
            height: "54px",
            width: "36px",
            mx: "auto",

            "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "6px",
                border: "3px solid #AEAEAE",
                pointerEvents: "none",
                zIndex: 1,  
            },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "4px",
                    top: "50%",
                    transform: `translate(0, -50%)`,
                    
                    height: "54px",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        ...slidesSwipeAnimation,

                        height: "100%",
                        

                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                    >
                    {range(0, 3).map((index) => (
                        <Box
                            key={`swipe_preview_page_${index}`}
                            sx={{
                                width: "27px",
                                aspectRatio: "3/4",

                                bgcolor: "#656565",
                                borderRadius: "4px",
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default function VerticalPreview() {
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
                pt: 1,
                pb: 1,
                overflow: "hidden",
            }}
        >
            <Slides />   
            <Pointer/>
        </Box>
    );
}