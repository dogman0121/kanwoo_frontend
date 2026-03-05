"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import WestRoundedIcon from "@mui/icons-material/WestRounded"
import TuneRoundedIcon from "@mui/icons-material/TuneRounded"
import { useContext, useEffect, useState } from "react"
import ReadingSettings from "./ReadingSettings"
import { useRouter } from "next/navigation"
import NavOpenContext from "../_contexts/navOpenContext"

export default function Header() {
    const [settingsOpen, setSettingsOpen] = useState(false)

    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)

    const {open} = useContext(NavOpenContext)

    const router = useRouter()

    const theme = useTheme()
    
    if (!currentChapter) return null;

    return (
        <>
            <Box
                component={"header"}
                sx={{
                    bgcolor: "#121212",
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    opacity: open ? 1 : 0,
                    transition: "0.3s",
                    zIndex: 5
                }}
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
                    <IconButton
                        disableRipple
                        onClick={() => router.back()}
                    >
                        <WestRoundedIcon />
                    </IconButton>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            textAlign: "center",
                            overflow: "hidden",
                            textWrap: "nowrap",
                            textOverflow: "ellipsis"
                        }}
                    >
                        ГЛАВА {currentChapter.chapter}. {currentChapter.name}
                    </Typography>
                    <IconButton
                        disableRipple
                        onClick={() => setSettingsOpen(true)}
                    >
                        <TuneRoundedIcon />
                    </IconButton>
                </Box>
            </Box>
            <ReadingSettings 
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
    )
}