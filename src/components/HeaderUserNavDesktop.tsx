"use client"

import { useAppSelector } from "@/lib/state/hooks"
import HeaderAnonymusNavDesktop from "./HeaderAnonymusUserNavDesktop";
import HeaderAuthorizedUserNavDesktop from "./HeaderAuthorizedUserNavDesktop";
import { Box } from "@mui/material";

export default function HeaderUserNavDesktop() {
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
                <HeaderAnonymusNavDesktop />
            )}
            {authProfile && (
                <HeaderAuthorizedUserNavDesktop/>
            )}
        </>
    )
}