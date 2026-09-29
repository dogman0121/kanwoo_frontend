import '@mui/material/styles';

declare module '@mui/material/styles' {
  // 1. Для использования в коде (например: theme.palette.header.main)
  interface Palette {
    header: Palette['primary'];
    footer: Palette['primary'];
  }

  // 2. Для использования внутри функции createTheme()
  interface PaletteOptions {
    header?: SimplePaletteColorOptions;
    footer?: SimplePaletteColorOptions;
  }
}

// 3. Расширяем компоненты (добавляем сразу и header, и footer)
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    header: true; 
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    header: true;
  }
}
