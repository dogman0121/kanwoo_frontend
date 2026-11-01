"use client"

import { useAppSelector } from "@/lib/state/hooks"
import MuiToolbar, { ToolbarProps as MuiToolbarProps } from "@mui/material/Toolbar"
import { AppBar, Box, IconButton, styled } from "@mui/material"
import WestRoundedIcon from "@mui/icons-material/WestRounded"
import TuneRoundedIcon from "@mui/icons-material/TuneRounded"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MAX_CHAPTER_WIDTH } from "@/constants/reader"
import { COMMENTS_DRAWER_WIDTH } from "@/constants/chapter-page"
import WrappedText from "@/components/WrapperTypography"
import ReadingSettings from "./reading-settings/ReadingSettings"
import { selectEndOfChapterReached, selectNavOpen } from "../states/reader.slice"
import { selectCurrentChapter } from "../states/reader/selectors"

interface ToolBarProps extends MuiToolbarProps {
  offsetEnabled?: boolean;
}


const Toolbar = styled(MuiToolbar, {
  shouldForwardProp: (prop) => prop !== 'offsetEnabled',
})<ToolBarProps>(({ theme }) => ({
    elevation: 0,
    transition: theme.transitions.create('margin-right', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ offsetEnabled }) => offsetEnabled,
            style: {
                transition: theme.transitions.create('margin-right', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: COMMENTS_DRAWER_WIDTH,
            },
        },
    ],
}));

export function ReaderHeader({
    drawerOpen
}: {
    drawerOpen?: boolean
}) {
    const [settingsOpen, setSettingsOpen] = useState(false)

    const navOpen = useAppSelector(selectNavOpen)
    const endReached = useAppSelector(selectEndOfChapterReached)

    const currentChapter = useAppSelector(selectCurrentChapter)

    const router = useRouter()

    if (!currentChapter) return 

    const open = navOpen || endReached

    return (
        <>
            <AppBar
                position="fixed"

                sx={{
                    opacity: open ? 1 : 0,
                    visibility: open ? "visible" : "hidden",

                    transition: (theme) => theme.transitions.create(['opacity', 'visibility'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.short, // или жестко '0.3s'
                    }),
                }}
            >
                <Toolbar
                    offsetEnabled={drawerOpen}
                    variant="dense"
                    sx={{
                        height: "50px"
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: MAX_CHAPTER_WIDTH,
                            width: "100%",

                            mx: "auto",

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
                        <WrappedText 
                            variant="h1"
                            lines={1}
                            sx={{
                                textTransform: "uppercase",
                                lineHeight: "1.5"
                            }}
                        >
                            Глава {currentChapter.chapter}. {currentChapter.name}
                        </WrappedText>
                        <IconButton
                            disableRipple
                            onClick={() => {setSettingsOpen(true)}}
                        >
                            <TuneRoundedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <ReadingSettings
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
    )
}