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
import YandexMetrica from "@/yandex-metrica/YandexMetrica"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
})

const YANDEX_METRICA_COUNTER = 110001347

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    let meta
    try {
        meta = (await serverFetch.get<Meta>("/meta")).data
    } catch (e) {
        if (e instanceof ApiError) meta = null
    }

    let profile
    try {
        profile = (await serverFetch.get<AuthProfile>(`/profiles/current`)).data
    } catch (e) {
        if (e instanceof ApiError) {
            profile = null
        }
    }

    return (
        <html lang="en" className={roboto.variable} suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/svg+xml" href="/logo.svg" />
                <YandexMetrica 
                    id={YANDEX_METRICA_COUNTER}
                    initParameters={{
                        ssr:true, 
                        webvisor:true, 
                        clickmap:true, 
                        ecommerce:"dataLayer", 
                        referrer: document.referrer, 
                        url: location.href, 
                        accurateTrackBounce:true, 
                        trackLinks:true
                    }}
                />
            </head>
            <body style={{ overflow: "auto" }}>
                <AppRouterCacheProvider>
                    <InitColorSchemeScript attribute="class" />
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <StoreProvider>
                            <MetaProvider meta={meta}>
                                <ProfileProvider profile={profile}>{children}</ProfileProvider>
                            </MetaProvider>
                        </StoreProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
