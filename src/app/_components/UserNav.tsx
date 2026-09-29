"use client"

import { useAppSelector } from "@/lib/state/hooks"
import AnonymusNav from "../(default-layout)/_layouts/desktop/components/AnonymusUserNav";
import AuthorizedUserNav from "../(default-layout)/_layouts/desktop/components/AuthorizedUserNav";
import { Box } from "@mui/material";
import { selectAuthProfile } from "@/features/global/states/auth-profile";

export default function UserNav() {
    const authProfile = useAppSelector(selectAuthProfile)

    return (
        <>
            {authProfile == undefined && (
                <Box
                    sx={{
                        width: "40px",
                        height: "40px",
                        bgcolor: "var(mui-palette-background-paper)"
                    }}
                ></Box>
            )}
            {authProfile == null && (
                <AnonymusNav />
            )}
            {authProfile && (
                <AuthorizedUserNav/>
            )}
        </>
    )
}