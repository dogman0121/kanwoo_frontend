"use client"

import { useAppSelector } from "@/lib/state/hooks"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { Box, IconButton, styled } from "@mui/material"
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    elevation: 0,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${COMMENTS_DRAWER_WIDTH}px)`,
                transition: theme.transitions.create(['margin', 'width'], {
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
                open={drawerOpen}
                position="fixed"

                sx={{
                    opacity: open ? 1 : 0,
                    visibility: open ? "visible" : "hidden",

                    transition: ".3s"
                }}
            >
                <Box
                    sx={{
                        maxWidth: MAX_CHAPTER_WIDTH,
                        width: "100%",

                        mx: "auto",
                        px: 2,
                        py: 1,

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
                            textTransform: "uppercase"
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
            </AppBar>
            <ReadingSettings
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
    )
}