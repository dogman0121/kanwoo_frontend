"use client"

import { AuthSection } from "@/features/auth/types/AuthPanel";
import { Box, Button, Dialog, Modal } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react"

const Auth = dynamic(() => import("@/features/auth/components/Auth"))

export default function AnonymusUserNav() {
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
                />
            </Dialog>
        </>
    )
}