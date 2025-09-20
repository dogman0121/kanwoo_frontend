"use client"

import AuthPanelProvider from "@/features/auth/components/AuthPanelProvider"
import { AuthPanel } from "@/features/auth/types/AuthPanel"
import AuthWrapper from "@/features/auth/components/AuthWrapper"
import AuthVerify from "@/features/auth/components/AuthVerify"
import { Suspense } from "react"
import { CircularProgress } from "@mui/material"

export default function Page() {
    return (
        <AuthPanelProvider panel={AuthPanel.VERIFY} setPanel={() => {}}>
            <AuthWrapper>
                <Suspense fallback={<CircularProgress />}>
                    <AuthVerify />
                </Suspense>
            </AuthWrapper>
        </AuthPanelProvider>
    )
}