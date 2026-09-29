"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Chip, useTheme } from "@mui/material";
import useHorizontalCenter from "../hooks/useHorizontalCenter";
import { selectPageNumber } from "../states/reading-settings/selectors";
import { selectEndOfChapterReached, selectNavOpen } from "../states/reader.slice";
import { selectCurrentChapter, selectCurrentPageNumber } from "../states/reader/selectors";

export default function PageNumberChip({
    drawerOpen
}: {
    drawerOpen: boolean
}) {
    const leftStyle = useHorizontalCenter()
    const theme = useTheme()

    const enabled = useAppSelector(selectPageNumber)
    
    const navOpen = useAppSelector(selectNavOpen)
    const endReached = useAppSelector(selectEndOfChapterReached)

    const currentChapter = useAppSelector(selectCurrentChapter)
    const currPageNumber = useAppSelector(selectCurrentPageNumber)

    if (!enabled || !currentChapter) return

    return (
        <Chip
            sx={{
                position: "fixed",
                top: "15%",
                left: leftStyle,
                transform: "translateX(-50%)",

                display: (navOpen && !endReached) ? undefined : "none",
                transition: theme.transitions.create(["left"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                bgcolor: "rgba(0, 0, 0, 0.6)",

                zIndex: 50
            }}
            label={`${currPageNumber + 1} из ${currentChapter.pages!.length}`} 
        />
    )
}