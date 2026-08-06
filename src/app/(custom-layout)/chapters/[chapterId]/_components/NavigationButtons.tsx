"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, IconButton, IconButtonProps, SvgIcon, useTheme } from "@mui/material";
import ArrowBackIosRounded from "@mui/icons-material/ArrowBackIosRounded"
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded"
import { useContext, useState } from "react";
import NavOpenContext from "../_contexts/navOpenContext";
import CommentsModal from "./CommentsModal";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

export function NavigationButtonsShadow() {
    return (
        <Box
            sx={{
                width: "190px",
                height: "50px",
                mt: "50px",
                mx: "auto"
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
                bgcolor: "#121212",
                width: "40px",
                height: "40px",
                p: "25px",

                "&.Mui-disabled": {
                    bgcolor: "#121212"
                },
                ...sx
            }}
            {...props}
        />
    )
}

export default function NavigationButtons() {
    const router = useRouter()
    
    const {open} = useContext(NavOpenContext)
    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)

    const [modalOpen, setModalOpen] = useState(false)

    // const handleLoadChapter = async (chapterId: number) => {
    //     const response = await clientFetch.get<{chapter: Chapter}>(`/chapters/${chapterId}`)

    //     dispatch(setReadingProgress(undefined))
    //     dispatch(initChapterPageChapter(response.data.chapter))

    //     router.replace(ROUTES.CHAPTER(chapterId))
    // }


    if (!currentChapter) return

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    bottom: "25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 5,
                
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",

                    opacity: open ? 1 : 0,
                    transition: "0.3s"
                }}
            >
                <NavigationButton
                    disabled={!currentChapter.prev_chapter_id}
                    onClick={() => router.replace(ROUTES.CHAPTER(currentChapter.prev_chapter_id))}
                >
                    <ArrowBackIosRounded />
                </NavigationButton>
                <NavigationButton
                    onClick={() => setModalOpen(true)}
                >
                    <SvgIcon>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </SvgIcon>
                </NavigationButton>
                <NavigationButton
                    disabled={!currentChapter.next_chapter_id}
                    onClick={() => router.replace(ROUTES.CHAPTER(currentChapter.next_chapter_id))}
                >
                    <ArrowForwardIosRounded />
                </NavigationButton>
            </Box>
            <CommentsModal 
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    )
}