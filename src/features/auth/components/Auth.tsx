"use client"

import { Paper } from "@mui/material"
import { AuthSection } from "../types/AuthPanel"
import AuthProvider from "./AuthProvider"
import AuthLogin from "./AuthLogin"
import AuthRegister from "./AuthRegister"
import AuthForgot from "./AuthForgot"
import AuthRecovery from "./AuthRecovery"
import Profile from "@/types/profile/profile"
import AuthProfile from "@/types/authProfile"

export default function Auth({
    defaultSection,
    onRegister,
    onLogin,
    onForgot,
    onRecovery
}: {
    defaultSection?: AuthSection,
    onRegister?: (profile: AuthProfile) => void,
    onLogin?: (profile: AuthProfile) => void,
    onForgot?: () => void,
    onRecovery?: () => void
}) {

    return (
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
                <AuthForgot />
                <AuthRecovery onRecovery={onRecovery}/>
            </Paper>
        </AuthProvider>
    )
}