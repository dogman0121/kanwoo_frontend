"use client"

import { useAppSelector } from "@/lib/state/hooks"
import AnonymusNav from "./AnonymusUserNav";
import AuthorizedUserNav from "./AuthorizedUserNav";
import { Box } from "@mui/material";

export default function UserNav() {
    const authProfile = useAppSelector(state => state.authProfile.profile)

    return (
        <>
            {authProfile?.id == undefined && (
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