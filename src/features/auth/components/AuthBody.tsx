"use client"

import { Box } from "@mui/material";
import AuthLogin from "./AuthLogin";
import AuthPanelProvider from "./AuthPanelProvider";

export default function AuthBody({
    onLogin,
    onRegister,
    onForgot,
    onRecovery,
    onVerify
}: {
    onLogin?: () => void,
    onRegister?: () => void,
    onForgot?: () => void,
    onRecovery?: () => void,
    onVerify?: () => void
}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "min(400px, 100vw)",
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding: "24px 32px",
        border: "none",
        borderRadius: "20px",
        "&:focus": {
          outline: "none"
        }
    };

    return (
        <AuthPanelProvider>
            <Box sx={{...style}}>
                <AuthLogin onSuccess={onLogin}/>
            </Box>
        </AuthPanelProvider>
    )
}