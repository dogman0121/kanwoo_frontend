"use client"

import { Paper } from "@mui/material"
import { AuthSection } from "../types/AuthPanel"
import AuthProvider from "./AuthProvider"
import AuthLogin from "./AuthLogin"
import AuthRegister from "./AuthRegister"
import AuthForgot from "./AuthForgot"
import AuthRecovery from "./AuthRecovery"
import Profile from "@/types/profile/profile"

export default function Auth({
    defaultSection,
    onRegister,
    onLogin,
    onForgot,
    onRecovery
}: {
    defaultSection?: AuthSection,
    onRegister?: (profile: Profile) => void,
    onLogin?: (profile: Profile) => void,
    onForgot?: () => void,
    onRecovery?: () => void
}) {

    return (
        <AuthProvider
            defaultSection={defaultSection}
        >
            <Paper
                sx={{
                    width: "min(400px, 100vw)",
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