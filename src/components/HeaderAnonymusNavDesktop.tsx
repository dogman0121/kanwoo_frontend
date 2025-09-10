"use client"

import AuthModal from "@/features/auth/components/AuthModal";
import { Button } from "@mui/material";
import { useState } from "react"

export default function HeaderAnonymusNavDesktop() {
    const [authModalOpened, setAuthModalOpened] = useState(false);

    return (
        <>
            <Button
                onClick={() => {setAuthModalOpened(true)}}
                variant="contained"
                sx={{
                    height: "40px"
                }}
            >
                Войти
            </Button>
            <AuthModal 
                open={authModalOpened}
                onClose={() => {setAuthModalOpened(false)}}
            />
        </>
    )
}