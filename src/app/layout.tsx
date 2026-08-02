import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Roboto } from "next/font/google"
import "./global.css"
import theme from "@/theme"
import { CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material"
import MetaProvider from "./_components/MetaProvider"
import StoreProvider from "./_components/StoreProvider"
import { serverFetch } from "@/lib/fetch/serverFetch"
import Meta from "@/types/meta"
import AuthProfile from "@/types/authProfile"
import AuthProfileProvider from "./_components/AuthProfileProvider"
import YandexMetrikaContainer from "@/lib/yandex-metrica/YandexMetricaContainer"
import Script from "next/script"
import AppProvider from "./_components/AppProvider"
import { headers } from "next/headers"
import Collection from "@/types/collection/collection"


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
    let meta; try { meta = (await serverFetch.get<Meta>("/meta")).data } catch (_) { meta = null }
    let currentProfile: AuthProfile | null;
    let collections: Collection[]; 
    try {
        const response = await serverFetch.get<{profile: AuthProfile, collections: Collection[]}>(`/profiles/current`) 

        currentProfile = response.data.profile
        collections = response.data.collections
    } catch (e) { currentProfile = null; collections = []}

    console.log(collections, currentProfile)

    const deviceType = await (await headers()).get("X-Device-Type")

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
                            <AppProvider
                                value={{
                                    deviceType: deviceType == "desktop" ? "desktop" : "mobile"
                                }}
                            >
                                <MetaProvider meta={meta}>
                                    <AuthProfileProvider 
                                        profile={currentProfile}
                                        collections={collections}
                                    >
                                        {children}
                                    </AuthProfileProvider>
                                </MetaProvider>
                            </AppProvider>
                        </StoreProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
