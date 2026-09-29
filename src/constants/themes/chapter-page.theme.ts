"use client"

import { createTheme } from "@mui/material";

const {palette} = createTheme()

export const chapterPageTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
        body1: {
            fontSize: "14px"
        },
        h1: {
            fontSize: "16px",
            fontWeight: "600",
            //textTransform: "uppercase"
        },
        h2: {
            fontWeight: 600,
            fontSize: "28px"
        },
    },
    palette: {
        mode: "dark",
        text: {
            secondary: "#909090"
        },
        primary: {
            main: "#FFD600"
        },
        secondary: {
            main: "#353535"
        },
        background: {
            default: "#FFFFFF",
            paper: "#141414"
        },
        header: palette.augmentColor({
            color: { main: "#121212" }
        }),
        footer: palette.augmentColor({
            color: { main: "#121212" }
        })
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                position: "fixed",
                elevation: 0,
                color: "header"
            },
            styleOverrides: {
                root: {
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: {variant: "contained"},
                            style: (theme) => ({
                                borderRadius: "40px",
                                "&:hover": {
                                    boxShadow: "none",
                                },
                                
                            }),
                        }
                    ],
                    fontWeight: 400,
                    textTransform: "none",
                    boxShadow: "none"
                }
            }
        },
        MuiPaper: {
            defaultProps: {elevation: 0},
            styleOverrides: {
                root: {
                    boxShadow: "none"
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    padding: "5px",
                    borderRadius: "12px",
                    backgroundColor: "#2d2d2d",
                    //width: "fit-content",
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    width: "100%",
                    border: "none",
                    borderTopLeftRadius: "8px !important",
                    borderBottomLeftRadius: "8px !important",
                    borderTopRightRadius: "8px !important",
                    borderBottomRightRadius: "8px !important",

                    padding: "2px 20px",

                    textTransform: "none",
                    fontWeight: 400,
                },
                
            }
        }
    },
    shape: {
        borderRadius: "6px"
    },
    spacing: "5px",
    transitions: {
        duration: {
            shortest: 100,
            standard: 300
        }
    }
})