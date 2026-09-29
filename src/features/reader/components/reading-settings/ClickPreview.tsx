import { Box, useTheme } from "@mui/material";
import PointerIcon from "./PointerIcon";

export default function ClickPreview() {
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: "100%",
                py: 1,
                overflow: "hidden",
            }}
        >
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
                        transform: `translate(-35px, -50%)`,
                        
                        height: "36px",
                        width: "160px",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            "@keyframes clickSwipe": {
                                "from": {
                                    transform: "tranlateX(0)"
                                },
                                "50%": {
                                    transform: "translateX(0)"
                                },
                                "to": {
                                    transform: "translateX(-35px)"
                                }
                            },
                            animation: "clickSwipe 2s ease infinite",

                            height: "100%",
                            

                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                        }}
                        >
                            <Box
                                sx={{
                                    minHeight: "100%",
                                    aspectRatio: "3/4",

                                    bgcolor: "#656565",
                                    borderRadius: "4px",

                                    transform: "scale(0.75)"
                                }}
                            />
                            <Box
                                sx={{
                                    "@keyframes scaleMinus": {
                                        "from": {
                                            transform: "scale(1)"
                                        },
                                        "50%": {
                                            transform: "scale(1)"
                                        },
                                        "to": {
                                            transform: "scale(0.75)"
                                        }
                                    },
                                    animation: "scaleMinus 2s ease infinite",

                                    minHeight: "100%",
                                    aspectRatio: "3/4",
                                    scale: "1",

                                    bgcolor: "#656565",
                                    borderRadius: "4px",
                                }}
                            />
                            <Box
                                sx={{
                                    "@keyframes scalePlus": {
                                        "from": {
                                            transform: "scale(0.75)"
                                        },
                                        "50%": {
                                            transform: "scale(0.75)"
                                        },
                                        "to": {
                                            transform: "scale(1)"
                                        }
                                    },
                                    animation: "scalePlus 2s ease infinite",

                                    minHeight: "100%",
                                    aspectRatio: "3/4",

                                    bgcolor: "#656565",
                                    borderRadius: "4px",
                                }}
                            />
                            <Box
                                sx={{
                                    minHeight: "100%",
                                    aspectRatio: "3/4",

                                    bgcolor: "#656565",
                                    borderRadius: "4px",
                                    transform: "scale(0.75)"
                                }}
                            />
                            <Box
                                sx={{
                                    minHeight: "100%",
                                    aspectRatio: "3/4",

                                    bgcolor: "#656565",
                                    borderRadius: "4px",
                                    transform: "scale(0.75)"
                                }}
                            />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    bottom: "15px",
                    left: "40%",
                    zIndex: "10001"
                }}
            >
                <Box
                    sx={{
                        position: "relative",

                        width: "100%",
                        height: "100%"
                    }}
                >
                    <Box 
                        sx={{
                            "@keyframes pulse": {
                                "from": {
                                    opacity: "0"
                                },
                                "49%": {
                                    opacity: "0"
                                },
                                "50%": {
                                    opacity: "0.3"
                                },
                                "to": {
                                    opacity: "0"
                                }
                            },
                            animation: "pulse 2s ease infinite",

                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            bgcolor: "#C7C7C7",

                            position: "absolute",
                            left: "12px",
                            top: "8px",
                            opacity: 0
                        }}
                    />
                    <PointerIcon 
                        sx={{
                            "@keyframes cursorClick": {
                                "from": {
                                    transform: "scale(1)"
                                },
                                "50%": {
                                    transform: "scale(0.9)"
                                },
                                "to": {
                                    transform: "scale(1)"
                                }
                            },
                            animation: "cursorClick 2s ease infinite",
                            fontSize: "24px",
                            fill: "#C7C7C7",

                            position: "absolute",
                            right: 0,
                            bottom: 0
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}