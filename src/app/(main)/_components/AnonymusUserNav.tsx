"use client"

import { AuthSection } from "@/features/auth/types/AuthPanel";
import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice";
import { useAppDispatch } from "@/lib/state/hooks";
import AuthProfile from "@/types/authProfile";
import Profile from "@/types/profile/profile";
import { Button, Dialog } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react"

const Auth = dynamic(() => import("@/features/auth/components/Auth"))

export default function AnonymusUserNav() {
    const dispatch = useAppDispatch()

    const [authModalOpened, setAuthModalOpened] = useState(false);

    return (
        <>
            <Button
                onClick={() => {setAuthModalOpened(true)}}
                variant="contained"
                sx={{
                    width: "100px",
                    mx: "10px"
                }}
            >
                Войти
            </Button>
            <Dialog
                open={authModalOpened}
                onClose={() => setAuthModalOpened(false)}
            >
                <Auth 
                    defaultSection={AuthSection.LOGIN}
                    onRegister={(profile: Profile) => {
                        dispatch(setAuthProfile(profile))

                        setAuthModalOpened(false)
                    }}
                    onLogin={(profile: Profile) => {
                        dispatch(setAuthProfile(profile))

                        setAuthModalOpened(false)
                    }}
                />
            </Dialog>
        </>
    )
}