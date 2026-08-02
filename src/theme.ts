'use client';

import { createTheme } from '@mui/material/styles';


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
      fontSize: "24px",
      lineHeight: "2"
    },
    h2: {
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "1.7"
    },
    h3: {
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "1.7"
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
          main: "#2b2a2a"
        },
        background: {
          default: "#1d1d1d",
          paper: "#1c1c1c"
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
      } 
    }
  },
  spacing: 5,
  shape: {
    borderRadius: "6px"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1240,
      xl: 1536,
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'contained' },
                style: () => ({
                  "&:hover": {
                    boxShadow: "none"
                  }
                }),    
            },
            {
              props: {variant: "outlined"},
                style: () => ({
                  color: theme.typography.body1.color
                })
            }
          ],
          padding: "5px 15px",
          fontWeight: "400",
          borderRadius: "40px",
          textTransform: 'none',
          boxShadow: "none"
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 3
          }
        }
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            width: "400px",
            boxShadow: 24,
            margin: theme.spacing(4),
            backgroundColor: "background.paper"
          },
          "& .MuiDialogTitle-root": {
            padding: "16px 24px 8px"
          },
        })
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "8px 24px 20px !important",
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
              borderRadius: "12px",
          },
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "12px"
        }
      }
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense"
      },
      styleOverrides: {
        root: {
          minHeight: "54px"
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiPopover-paper": {
            borderRadius: "12px",
            marginTop: "5px"
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.typography.caption.color,
          textDecoration: "none",
          
          "&:hover": {
            textDecoration: "underline"
          }
        })
      }
    },
    MuiDrawer: {
      defaultProps: {
        elevation: 1
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3
      }
    }
  }
});

export default theme;