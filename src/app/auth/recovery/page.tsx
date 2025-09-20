"use client"

import Auth from "@/features/auth/components/AuthWrapper";
import AuthPanelProvider from "@/features/auth/components/AuthPanelProvider";
import { AuthPanel } from "@/features/auth/types/AuthPanel";
import AuthWrapper from "@/features/auth/components/AuthWrapper";
import AuthRecovery from "@/features/auth/components/AuthRecovery";

export default function Page() {
    return (
        <AuthPanelProvider panel={AuthPanel.RECOVERY} setPanel={() => {}}>
            <AuthWrapper>
                <AuthRecovery />
            </AuthWrapper>
        </AuthPanelProvider>
    )
}