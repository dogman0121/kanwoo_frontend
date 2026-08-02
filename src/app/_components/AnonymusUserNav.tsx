"use client"

import AuthModal from "@/features/auth/components/AuthModal";
import { AuthSection } from "@/features/auth/types/AuthPanel";
import { setAuthProfile } from "@/lib/state/features/authProfile/authProfileSlice";
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
            <AuthModal
                open={authModalOpened}
                onClose={() => setAuthModalOpened(false)}
            />
        </>
    )
}