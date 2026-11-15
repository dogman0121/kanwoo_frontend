"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Box, Chip, useTheme } from "@mui/material";
import useHorizontalCenter from "../hooks/useHorizontalCenter";
import { selectPageNumber } from "../states/reading-settings/selectors";
import { selectEndOfChapterReached, selectNavOpen } from "../states/reader.slice";
import { selectCurrentChapter, selectCurrentPageNumber } from "../states/reader/selectors";
import { COMMENTS_DRAWER_WIDTH } from "@/constants/chapter-page";

export default function PageNumberChip({
    drawerOpen
}: {
    drawerOpen: boolean
}) {
    const theme = useTheme()

    const enabled = useAppSelector(selectPageNumber)
    
    const navOpen = useAppSelector(selectNavOpen)
    const endReached = useAppSelector(selectEndOfChapterReached)

    const currentChapter = useAppSelector(selectCurrentChapter)
    const currPageNumber = useAppSelector(selectCurrentPageNumber)

    if (!enabled || !currentChapter) return

    return (
        <Box
            className="mui-fixed"
            sx={{
                position: "fixed",
                top: "15%",
                left: drawerOpen ? `calc((100% - ${COMMENTS_DRAWER_WIDTH}px)/2)` : "50%",
                transform: "translate(-50%)",

                zIndex: 5,

                display: (navOpen && !endReached) ? undefined : "none",
                transition: theme.transitions.create(["left"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            }}
        >
            <Chip
                size="small"
                sx={{
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                }}
                label={`${currPageNumber + 1} из ${currentChapter.pages!.length}`} 
            />
        </Box>
    )
}