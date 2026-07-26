"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { Box, BoxProps, IconButton, Typography, useTheme } from "@mui/material"
import WestRoundedIcon from "@mui/icons-material/WestRounded"
import TuneRoundedIcon from "@mui/icons-material/TuneRounded"
import { Children, useContext, useEffect, useState } from "react"
import ReadingSettings from "./ReadingSettings"
import { useRouter } from "next/navigation"
import NavOpenContext from "../_contexts/navOpenContext"
import PageTitle from "./PageTitle"


export function PageHeader() {
    const [settingsOpen, setSettingsOpen] = useState(false)

    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)

    const {open} = useContext(NavOpenContext)

    const router = useRouter()

    if (currentChapter)
        return (
            <>
                <Header
                    sx={{
                        bgcolor: "#121212",
                        opacity: open ? 1 : 0,
                        transition: "0.3s"
                    }}
                >
                    <IconButton
                        disableRipple
                        onClick={() => router.back()}
                    >
                        <WestRoundedIcon />
                    </IconButton>
                    <PageTitle
                        sx={{
                            textAlign: "center",
                            overflow: "hidden",
                            textWrap: "nowrap",
                            textOverflow: "ellipsis"
                        }}
                    >
                        ГЛАВА {currentChapter.chapter}. {currentChapter.name}
                    </PageTitle>
                    <IconButton
                        disableRipple
                        onClick={() => setSettingsOpen(true)}
                    >
                        <TuneRoundedIcon />
                    </IconButton>
                </Header>
                <ReadingSettings 
                    open={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                />
            </>
        )
}

export default function Header({
    sx,
    children,
    ...props
}: BoxProps) {

    return (
        <Box
            component={"header"}
            sx={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 5,
                ...sx
            }}
            {...props}
        >
            <Box
                sx={{
                    maxWidth: "900px",
                    mx: "auto",
                    py: "5px",

                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "5px"
                }}
            >
                {Children.map(children, c => c)}
            </Box>
        </Box>
    )
}