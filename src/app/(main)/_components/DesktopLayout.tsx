"use client"

import HeaderUserNavDesktop from "@/components/HeaderUserNavDesktop"
import SearchModalDesktop from "@/features/search/components/SearchModalDesktop"
import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice"
import { useAppStore } from "@/lib/state/hooks"
import theme from "@/theme"
import AuthProfile from "@/types/authProfile"
import { AppBar, Avatar, Box, Container, SvgIcon, Toolbar, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { Suspense, useRef, useState } from "react"

function Header() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    bgcolor: theme.vars?.palette.customBackgrounds.header,
                    zIndex: theme.zIndex.drawer + 10

                }}
            >
                <Box
                    sx={{
                        py: "7px",
                        px: theme.spacing(3),
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
                            <SvgIcon 
                                viewBox="0 0 96 96"
                                sx={{
                                    width: "32px",
                                    height: "32px",
                                    color: theme.typography.body1.color
                                }}
                            >
                                <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                                    fill={theme.typography.body1.color} stroke="none">
                                    <path d="M135 888 c-3 -7 -4 -195 -3 -418 l3 -405 85 0 85 0 3 131 3 130 43
                                    43 44 43 127 -176 127 -176 84 0 c69 0 84 3 84 16 0 8 -72 115 -160 236 l-161
                                    221 29 31 c133 143 282 318 277 326 -3 6 -46 10 -94 10 l-87 0 -155 -171 -154
                                    -171 -5 169 -5 168 -83 3 c-60 2 -84 -1 -87 -10z"/>
                                </g>
                            </SvgIcon>
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
                                onClick={() => setSearchOpen(true)}
                                sx={{
                                    cursor: "pointer"
                                }}
                            >
                                поиск
                            </Typography>
                        </Box>
                    </Box>
                    <Suspense fallback={<Avatar/>}>
                        <HeaderUserNavDesktop />
                    </Suspense>
                </Box>
            </Box>
            <SearchModalDesktop open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    )
}

function Footer() {
    return (
        <></>
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
            <Footer />
        </>
    )
}