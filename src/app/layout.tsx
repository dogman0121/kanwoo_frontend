import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google';
import "./global.css"
import theme from '@/theme';
import { CssBaseline, InitColorSchemeScript, ThemeProvider } from '@mui/material';


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <InitColorSchemeScript attribute="class" />
          <ThemeProvider theme={theme}>
            <CssBaseline />
              {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}