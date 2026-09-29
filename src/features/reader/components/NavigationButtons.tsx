"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, IconButton, IconButtonProps, SvgIcon, useTheme } from "@mui/material";
import ArrowBackIosRounded from "@mui/icons-material/ArrowBackIosRounded"
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded"
import { useRouter } from "next/navigation";
import { routes, toHref } from "@/constants/routes/main.routes";
import useHorizontalCenter from "../hooks/useHorizontalCenter";
import { selectCommentsPanelOpen, selectEndOfChapterReached, selectNavOpen, setCommentsPanelOpen } from "../states/reader.slice";
import { selectCurrentChapter } from "../states/reader/selectors";


export function NavigationButtonsShadow() {
    return (
        <Box
            sx={{
                minHeight: "50px",
                boxSizing: "content-box",
                pt: 4,
                pb: 5,
            }}
        >

        </Box>
    )
}

function NavigationButton({sx, ...props}: IconButtonProps) {
    return (
        <IconButton
            disableRipple
            sx={{
                bgcolor: "#000000",
                width: "40px",
                height: "40px",
                p: "25px",

                "&.Mui-disabled": {
                    bgcolor: "#000000"
                },
                boxShadow: "0 0 3px rgba(255, 255, 255, 0.2)",
                ...sx
            }}
            {...props}
        />
    )
}

export interface NavigationButtonsProps {
    disabled?: boolean,
}

export default function NavigationButtons({
    disabled
}: NavigationButtonsProps) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const theme = useTheme()

    const navOpen = useAppSelector(selectNavOpen)
    const endReached = useAppSelector(selectEndOfChapterReached)
    const drawerOpen = useAppSelector(selectCommentsPanelOpen)
    const currentChapter = useAppSelector(selectCurrentChapter)
    const leftStyle = useHorizontalCenter()

    const handlePrev = () => {
        if (!currentChapter?.prev_chapter_id) return 

        router.replace(toHref(routes.chapters.item, {id: currentChapter.prev_chapter_id.toString()}))
    }

    const handleNext = () => {
        if (!currentChapter?.next_chapter_id) return 

        router.replace(toHref(routes.chapters.item, {id: currentChapter.next_chapter_id.toString()}))
    }

    const handleCommentsOpen = () => {
        dispatch(setCommentsPanelOpen(!drawerOpen))
    }

    const open = navOpen || endReached

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    bottom: "25px",
                    left: leftStyle,
                    transform: "translateX(-50%)",
                    zIndex: 5,

                    opacity: open ? 1 : 0,
                    visibility: open ? "visible" : "hidden",
                
                    flexDirection: "row",
                    gap: "20px",
                    transition: theme.transitions.create(["left"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),

                    display: "flex",
                }}
            >
                <NavigationButton
                    disabled={currentChapter?.prev_chapter_id == undefined}
                    onClick={handlePrev}
                >
                    <ArrowBackIosRounded />
                </NavigationButton>
                <NavigationButton
                    onClick={handleCommentsOpen}
                >
                    <SvgIcon>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </SvgIcon>
                </NavigationButton>
                <NavigationButton
                    disabled={currentChapter?.next_chapter_id == undefined}
                    onClick={handleNext}
                >
                    <ArrowForwardIosRounded />
                </NavigationButton>
            </Box>
        </>
    )
}