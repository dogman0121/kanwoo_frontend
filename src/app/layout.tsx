import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Roboto } from "next/font/google"
import "./global.css"
import theme from "@/constants/themes/main.theme"
import { CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material"
import MetaProvider from "./_components/MetaProvider"
import StoreProvider from "./_components/StoreProvider"
import AuthProfileProvider from "./_components/AuthProfileProvider"
import YandexMetrikaContainer from "@/lib/yandex-metrica/YandexMetricaContainer"
import Script from "next/script"
import AppProvider from "./_components/AppProvider"
import { headers } from "next/headers"
import UI from "./_components/UI"
import { AuthProfile } from "@/types/profile"
import { profileServerApi } from "@/lib/fetch/features/profile/server.api"
import { metaServerApi } from "@/lib/fetch/features/meta/server.api"


const analyticsEnabled = !!(process.env.NODE_ENV === "production");

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
})

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    let authProfile: AuthProfile | null;
    let meta; try { meta = (await metaServerApi.getMeta()).data } catch (_) { meta = null }
    try {
        authProfile = (await profileServerApi.getAuthProfile()).data 
    } catch (e) {
        authProfile = null
    }
    
    const deviceType = (await headers()).get("X-Device-Type")

    return (
        <html lang="en" className={roboto.variable} suppressHydrationWarning>
            <head>
                <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
                <link rel="icon" type="image/svg+xml" href="/logo.svg" />
                {/* Яндекс авторизация */}
                <Script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js" />
            </head>
            <body style={{ overflow: "auto" }}>
                {/* Яндекс метрика */}
                <YandexMetrikaContainer enabled={analyticsEnabled} />
                <AppRouterCacheProvider>
                    <InitColorSchemeScript attribute="class" />
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <StoreProvider>
                            <MetaProvider meta={meta}>
                                <AuthProfileProvider 
                                    profile={authProfile}
                                >
                                    <AppProvider
                                        deviceType={deviceType == "desktop" ? "desktop" : "mobile"}
                                    >
                                
                                        {children}
                                        <UI />
                                    </AppProvider>
                                </AuthProfileProvider>
                            </MetaProvider>
                        </StoreProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
