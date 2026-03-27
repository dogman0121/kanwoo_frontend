"use client"

import { Dialog, DialogProps, ModalProps } from "@mui/material";
import { AuthSection } from "../types/AuthPanel";
import Profile from "@/types/profile/profile";
import Auth from "./Auth";
import { useAppDispatch } from "@/lib/state/hooks";
import AuthProfile from "@/types/authProfile";
import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice";

export default function AuthModal({onClose, ...props}: DialogProps) {
    const dispatch = useAppDispatch()

    return (
        <Dialog
            onClose={onClose}
            {...props}
        >
            <Auth 
                defaultSection={AuthSection.LOGIN}
                onRegister={(profile: AuthProfile) => {
                    dispatch(setAuthProfile(profile))

                    onClose?.({}, "escapeKeyDown")
                }}
                onLogin={(profile: Profile) => {
                    dispatch(setAuthProfile(profile))

                    onClose?.({}, "escapeKeyDown")
                }}
            />
        </Dialog>
    )
}