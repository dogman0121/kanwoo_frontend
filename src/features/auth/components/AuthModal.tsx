"use client"

import { Modal } from "@mui/material"
import Auth from "./AuthWrapper"
import AuthPanelProvider from "./AuthPanelProvider"
import { useState } from "react"
import { AuthPanel } from "../types/AuthPanel"
import { useAppDispatch } from "@/lib/state/hooks"
import { userClientApi } from "@/lib/api/features/user/client"
import { setAuthUser } from "@/lib/state/features/auth_user/authUserSlice"
import AuthWrapper from "./AuthWrapper"
import AuthLogin from "./AuthLogin"
import AuthRegister from "./AuthRegister"
import AuthForgot from "./AuthForgot"


export default function AuthModal({open, onClose}: {open: boolean, onClose: () => void}) {
    const [currentPanel, setCurrentPanel] = useState(AuthPanel.LOGIN);

    const dispatch = useAppDispatch()

    const onLogin = async () => {
        const {data: user} = await userClientApi.getCurrentUser();

        if (user) {
            dispatch(setAuthUser(user))
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <AuthPanelProvider panel={currentPanel} setPanel={setCurrentPanel}>
                <AuthWrapper>
                    <AuthLogin onSuccess={onLogin}/>
                    <AuthRegister />
                    <AuthForgot />
                </AuthWrapper>
            </AuthPanelProvider>
        </Modal>
    )
}