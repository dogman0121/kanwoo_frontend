"use client"

import { Paper } from "@mui/material"
import { AuthSection } from "../types/AuthPanel"
import AuthProvider from "./AuthProvider"
import AuthLogin from "./AuthLogin"
import AuthRegister from "./AuthRegister"
import AuthForgot from "./AuthForgot"
import AuthProfileSelector from "./AuthProfileSelector"
import AuthCreateProfile from "./AuthCreateProfile"
import AuthRecovery from "./AuthRecovery"

export default function Auth({
    defaultSection
}: {
    defaultSection?: AuthSection
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
                <AuthLogin />
                <AuthRegister />
                <AuthForgot />
                <AuthProfileSelector />
                <AuthCreateProfile />
                <AuthRecovery />
            </Paper>
        </AuthProvider>
    )
}