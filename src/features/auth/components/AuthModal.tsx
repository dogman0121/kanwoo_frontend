"use client"

import { Modal } from "@mui/material"
import AuthPanelProvider from "./AuthPanelProvider"
import { useEffect, useState } from "react"
import { AuthPanel } from "../types/AuthPanel"
import { useAppDispatch } from "@/lib/state/hooks"
import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice"
import AuthWrapper from "./AuthWrapper"
import AuthLogin from "./AuthLogin"
import AuthRegister from "./AuthRegister"
import AuthForgot from "./AuthForgot"
import AuthProfileSelector from "./AuthProfileSelector"
import Profile from "@/types/profile/profile"
import { profileClientApi } from "@/lib/fetch/features/profile/client"
import AppSnackbar from "@/components/AppSnackbar"
import { clientFetch } from "@/lib/fetch/clientFetch"


export default function AuthModal({open, onClose}: {open: boolean, onClose: () => void}) {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    
    const [currentPanel, setCurrentPanel] = useState(AuthPanel.LOGIN);

    const [errorOpen, setErrorOpen] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setCurrentPanel(AuthPanel.LOGIN)
    }, [open])

    const onLogin = async () => {
        const {data: profiles} = await clientFetch.get<Profile[]>("/auth/getProfiles")

        setProfiles(profiles)
    }

    const onSelectProfile = async (profile: Profile) => {
        try{
            profileClientApi.selectProfile(profile.id)

            dispatch(setAuthProfile(profile))

            onClose()
        }
        catch (e) {
            setErrorOpen(true)
        }
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <AuthPanelProvider panel={currentPanel} setPanel={setCurrentPanel}>
                    <AuthWrapper>
                        <AuthLogin onSuccess={onLogin}/>
                        <AuthRegister />
                        <AuthForgot />
                        <AuthProfileSelector profiles={profiles} onSuccess={onSelectProfile}/>
                    </AuthWrapper>
                </AuthPanelProvider>
            </Modal>
            <AppSnackbar
                open={errorOpen} 
                onClose={() => setErrorOpen(false)} 
                variant="error" 
                message="Произошла ошибка"
            />
        </>
    )
}