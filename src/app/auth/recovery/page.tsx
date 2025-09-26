"use client"

import AuthPanelProvider from "@/features/auth/components/AuthPanelProvider";
import { AuthPanel } from "@/features/auth/types/AuthPanel";
import AuthWrapper from "@/features/auth/components/AuthWrapper";
import AuthRecovery from "@/features/auth/components/AuthRecovery";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

export default function Page() {
    return (
        <AuthPanelProvider panel={AuthPanel.RECOVERY} setPanel={() => {}}>
            <AuthWrapper>
                <Suspense fallback={<CircularProgress />}>
                    <AuthRecovery />
                </Suspense>
            </AuthWrapper>
        </AuthPanelProvider>
    )
}