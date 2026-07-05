"use client"

import { Box, Paper } from "@mui/material"
import { AuthSection } from "../types/AuthPanel"
import AuthProvider from "./AuthProvider"
import AuthLogin from "./AuthLogin"
import AuthRegister from "./AuthRegister"
import AuthForgot from "./AuthForgot"
import AuthRecovery from "./AuthRecovery"
import AuthProfile from "@/types/authProfile"
import YandexOauthScript from "@/lib/yandex-oauth/YandexOauthScript"

export const YANDEX_OAUTH_CONTAINER_ID = "yandex_oauth_container"

export default function Auth({
    defaultSection,
    onRegister,
    onLogin,
    onRecovery
}: {
    defaultSection?: AuthSection,
    onRegister?: (profile: AuthProfile) => void,
    onLogin?: (profile: AuthProfile) => void,
    onForgot?: () => void,
    onRecovery?: () => void
}) {

    return (
        <>
            <AuthProvider
                defaultSection={defaultSection}
            >
                <Paper
                    sx={{
                        padding: "16px 24px 20px",
                        border: "none",
                        borderRadius: "20px",
                    }}
                >
                    <AuthLogin onLogin={onLogin}/>
                    <AuthRegister onRegister={onRegister}/>
                    <AuthRecovery onRecovery={onRecovery}/>
                    <AuthForgot />
                </Paper>
            </AuthProvider>
        </>
    )
}