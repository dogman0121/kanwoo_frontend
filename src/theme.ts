'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypeBackground {
        defaultChannel?: string;
    }

    interface Palette {
        background: TypeBackground
        customBackgrounds: {
            header: string,
            footer: string,
        }
    }

    interface PaletteOptions {
        background?: Partial<TypeBackground>
        customBackgrounds: {
            header: string,
            footer: string,
        }
    }
}


const theme = createTheme({
  cssVariables: {
    cssVarPrefix: "knw",
    colorSchemeSelector: "class"
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    body1: {
      fontSize: "14px",
      color: 'var(--knw-typography-body1-color)'
    },
    h1: {
      fontWeight: "600",
      fontSize: "24px"
    },
    caption: {
      fontSize: "12px",
      color: 'var(--knw-typography-caption-color)'
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#FFD600"
        },
        secondary: {
          main: "#282828"
        },
        background: {
          default: "#121212",
          paper: "#1c1c1c"
        },
        customBackgrounds: {
          header: "#06090E",
          footer: "#06090E",
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: "#FFD600"
        },
        secondary: {
          main: "#E3E3E3"
        },
        background: {
          default: "#F2F2F3",
          paper: "#FFFFFF"
        },
        customBackgrounds: {
          header: "#FFF1AA",
          footer: "#FFC200",
        },
      } 
    }
  },
  spacing: 5,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [{
             props: { variant: 'contained' },
              style: ({ theme }) => ({
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  boxShadow: "none"
                }
              }),
          }],
          padding: "5px 15px",
          fontWeight: "400",
          borderRadius: "40px",
          textTransform: 'none',
          boxShadow: "none"
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars?.palette.secondary.main,
        }),
      }
    },
    MuiDialog: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 1
          }
        }
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            width: "min(400px, 100vw)",
            boxShadow: 24,
            backgroundColor: theme.vars?.palette.background.paper
          },
          "& .MuiDialogTitle-root": {
            padding: "16px 24px 8px"
          },
          '& .MuiDialogContent-root': {
            padding: "8px 24px 20px",
          },
        })
      }
    }
  }
});

export default theme;