"use client"

import { useAppSelector } from "@/lib/state/hooks"
import HeaderAnonymusNavDesktop from "./HeaderAnonymusUserNavDesktop";
import HeaderAuthorizedUserNavDesktop from "./HeaderAuthorizedUserNavDesktop";
import { Box } from "@mui/material";

export default function HeaderUserNavDesktop() {
    const authUser = useAppSelector(state => state.authUser.user)

    return (
        <>
            {authUser?.id == undefined && (
                <Box
                    sx={{
                        width: "40px",
                        height: "40px",
                        bgcolor: "var(mui-palette-background-paper)"
                    }}
                ></Box>
            )}
            {authUser == null && (
                <HeaderAnonymusNavDesktop />
            )}
            {authUser && (
                <HeaderAuthorizedUserNavDesktop/>
            )}
        </>
    )
}