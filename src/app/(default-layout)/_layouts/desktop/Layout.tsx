"use client"

import { AppBar, Avatar, Box, Button, SvgIcon, Toolbar, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import UserNav from "./components/UserNav"
import SiteLogo from "@/components/SiteLogo"
import { useAppDispatch } from "@/lib/state/hooks"
import { setSearchModalOpen } from "@/features/global/states/app/slice"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import WindowRoundedIcon from '@mui/icons-material/WindowRounded';

function Header() {
    const dispatch = useAppDispatch()

    const theme = useTheme()

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
                            columnGap: 6,
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
                                columnGap: 2
                            }}
                        >
                            <Button
                                LinkComponent={Link}
                                href="/catalog"
                                variant="text"
                                color="inherit"
                                startIcon={<WindowRoundedIcon />}
                            >
                                каталог
                            </Button>
                            <Button
                                onClick={() => dispatch(setSearchModalOpen(true))}
                                variant="text"
                                color="inherit"
                                startIcon={<SearchRoundedIcon />}
                            >
                                поиск
                            </Button>
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