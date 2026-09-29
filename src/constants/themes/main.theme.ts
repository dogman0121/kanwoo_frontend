"use client";

import { createTheme } from "@mui/material/styles";

const {palette} = createTheme()

const mainTheme = createTheme({
  cssVariables: {
    cssVarPrefix: "knw",
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    body1: {
      fontSize: "14px",
    },
    h1: {
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "1.7",
    },
    h2: {
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "1.5",
    },
    h3: {
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "1.2",
    },
    caption: {
      fontSize: "12px",
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        text: {
          primary: "#E1E1E0",
          secondary: "#BCBCBC"
        },
        primary: {
          main: "#FFD600",
        },
        secondary: {
          main: "#2b2a2a",
        },
        background: {
          default: "#1d1d1d",
          paper: "#1c1c1c",
        },
        header: palette.augmentColor({
          color: {main: "#06090E"}
        }),
        footer: palette.augmentColor({
          color: {main: "#06090E"}
        })
      },
    },
    light: {
      palette: {
        text: {
          primary: "#000000",
          secondary: "#606060"
        },
        primary: {
          main: "#FFD600",
        },
        secondary: {
          main: "#E3E3E3",
        },
        background: {
          default: "#F2F2F3",
          paper: "#FFFFFF",
        },
        header: palette.augmentColor({
          color: {main: "#FFF1AA"}
        }),
        footer: palette.augmentColor({
          color: {main: "#E8E8E8"}
        })
      },
    },
  },
  spacing: 5,
  shape: {
    borderRadius: "6px",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1240,
      xl: 1536,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "contained" },
              style: () => ({
                "&:hover": {
                  boxShadow: "none",
                },
              }),
            },
            {
              props: { variant: "outlined" },
              style: ({ theme }) => ({
                color: theme.vars.palette.text.primary
              }),
            },
          ],
          padding: "5px 15px",
          fontWeight: "400",
          borderRadius: "40px",
          textTransform: "none",
          boxShadow: "none",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 3,
          },
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            width: "400px",
            boxShadow: 24,
            margin: theme.spacing(4),
            backgroundColor: "background.paper",
          },
          "& .MuiDialogTitle-root": {
            padding: "16px 24px 8px",
          },
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "8px 24px 20px !important",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
      styleOverrides: {
        root: {
          minHeight: "54px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiPopover-paper": {
            borderRadius: "12px",
            marginTop: "5px",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          textDecoration: "none",
          
          "&:hover": {
            textDecoration: "underline",
          },
        }),
      },
    },
    MuiDrawer: {
      defaultProps: {
        elevation: 1,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        root: {
          boxShadow: "none"
        }
      }
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({theme}) => ({
          padding: theme.spacing(1),
          borderRadius: `calc(${theme.shape.borderRadius} * 2)`,
        })
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({theme}) => ({
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          paddingTop: 0,
          paddingBottom: 0,

          border: "none",
          borderRadius: `calc(${theme.shape.borderRadius} * 1)`,
          borderTopLeftRadius: `calc(${theme.shape.borderRadius} * 1) !important`,
          borderBottomLeftRadius: `calc(${theme.shape.borderRadius} * 1) !important`,
          borderTopRightRadius: `calc(${theme.shape.borderRadius} * 1) !important`,
          borderBottomRightRadius: `calc(${theme.shape.borderRadius} * 1) !important`,

          textTransform: "none",
          fontWeight: 400
        })
      }
    }
  },
});

export default mainTheme;
