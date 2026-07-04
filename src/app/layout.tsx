import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Roboto } from "next/font/google"
import "./global.css"
import theme from "@/theme"
import { CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material"
import MetaProvider from "./_components/MetaProvider"
import StoreProvider from "./_components/StoreProvider"
import { ApiError } from "@/lib/fetch/apiResponse"
import { serverFetch } from "@/lib/fetch/serverFetch"
import Meta from "@/types/meta"
import AuthProfile from "@/types/authProfile"
import ProfileProvider from "./_components/ProfileProvider"
import YandexMetrikaContainer from "@/lib/yandex-metrica/YandexMetricaContainer"
import Script from "next/script"


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
    let meta = null

    try {
        meta = (await serverFetch.get<Meta>("/meta")).data
    } catch (e) {
    }

    let profile =  null
    try {
        profile = (await serverFetch.get<AuthProfile>(`/profiles/current`)).data
    } catch (e) {
    }

    return (
        <html lang="en" className={roboto.variable} suppressHydrationWarning>
            <head>
                <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
                <link rel="icon" type="image/svg+xml" href="/logo.svg" />
                {/* Яндекс метрика */}
                <YandexMetrikaContainer enabled={analyticsEnabled} />
                {/* Яндекс авторизация */}
                <Script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js" />
            </head>
            <body style={{ overflow: "auto" }}>
                <AppRouterCacheProvider>
                    <InitColorSchemeScript attribute="class" />
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <StoreProvider>
                            <MetaProvider meta={meta}>
                                <ProfileProvider profile={profile}>
                                    {children}
                                </ProfileProvider>
                            </MetaProvider>
                        </StoreProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
