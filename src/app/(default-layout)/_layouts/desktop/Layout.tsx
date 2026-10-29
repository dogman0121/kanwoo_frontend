"use client"

import { AppBar, Avatar, Box, SvgIcon, Toolbar, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import UserNav from "./components/UserNav"
import SiteLogo from "@/components/SiteLogo"
import { useAppDispatch } from "@/lib/state/hooks"
import { setSearchModalOpen } from "@/features/global/states/app/slice"

function Header() {
    const dispatch = useAppDispatch()

    const theme = useTheme()

    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <AppBar
                component="nav"
                color="header"
                enableColorOnDark
                sx={{
                    zIndex: theme.zIndex.drawer + 1
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "40px",
                            alignItems: "center"
                        }}
                    >
                        <Link href={"/"}>
                            <SiteLogo />
                        </Link>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "25px"
                            }}
                        >
                            <Link href={"/catalog"}>каталог</Link>
                            <Typography
                                onClick={() => dispatch(setSearchModalOpen(true))}
                                sx={{
                                    cursor: "pointer"
                                }}
                            >
                                поиск
                            </Typography>
                        </Box>
                    </Box>
                    <UserNav />
                </Toolbar>
            </AppBar>
        </>
    )
}


export default function DesktopLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <Header />
            <Toolbar />
            <Box
                component={"main"}
            >
                {children}
            </Box>
        </>
    )
}