"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import Page from "@/types/chapter/page";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { 
    appendChapterPageChapter,
    setChapterPageCurrentChapter,
    setChapterPageCurrentChapterPage
} from "@/lib/state/features/chapterPage/chapterPageSlice";
import { NavigationButtonsShadow } from "./NavigationButtons";
import ChapterEnd from "./ChapterEnd";
import { useContext, useEffect, useRef, useState } from "react";
import NavOpenContext from "../_contexts/navOpenContext";
import { Controller } from "swiper/modules";
import { chapterService } from "../_services/chapterService";
import { throttle } from "lodash";
import Chapter from "@/types/chapter/chapter";
import Image from "next/image";
import "swiper/css"
import "swiper/css/navigation"
import { Swiper as SwiperType } from "swiper/types";

function PageBlock({
    page, 
    onPageActive
}: {
    page: Page, 
    onPageActive: (page: Page) => void
}) {
    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)
    const chapterPageNumber = useAppSelector(state => state.chapterPage.currentChapterPage)

    const {isActive} = useSwiperSlide();

    
    useEffect(() => {
        if (!currentChapter) return
        if (typeof chapterPageNumber == "undefined") return

        if (isActive){
            onPageActive(page)
        }
    }, [isActive])

    return (
        <Box
            sx={{
                mx: "auto",
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <img
                alt={`page_${page.uuid}`} 
                src={page.link}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                }}
            />
        </Box>
    )
}

function HorizontalChapterEnd({
    onActive,
}: {
    onActive: () => void,
}) {
    const {isActive} = useSwiperSlide();

    const [nextChapterIsLoading, setNextChapterIsLoading] = useState(false)

    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)
    const currentChapterList = useAppSelector(state => state.chapterPage.chaptersList)


    useEffect(() => {
        if (!currentChapter || !currentChapterList) return
        if (nextChapterIsLoading) return

        if (isActive) {
            onActive()
        }
    }, [isActive])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ChapterEnd />
            </Box>
            <NavigationButtonsShadow />
        </Box>
    )
}


export default function HorizontalScreen() {
    const nextChapterIsLoading = useRef(false)

    const dispatch = useAppDispatch()

    const chaptersList = useAppSelector(state => state.chapterPage.chaptersList)
    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)
    const readingProgress = useAppSelector(state => state.chapterPage.readingProgress)

    const {setOpen, setEndOpen} = useContext(NavOpenContext)

    const swiperRef = useRef<SwiperType | null>(null);

    const handleSwipe = throttle(async (chapter: Chapter, page: number) => {
        await chapterService.saveProgress(chapter, page)
    }, 4000)

    useEffect(() => {
        const handleOpenHeader = () => {
            setOpen((open) => !open)
        }

        document.addEventListener("click", handleOpenHeader)

        return () => {
            document.removeEventListener("click", handleOpenHeader)
        }
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row"
            }}
        >
            <Swiper
                modules={[Controller]}
                initialSlide={readingProgress?.page}
                direction="horizontal"
                onSwiper={(swiper) => {swiperRef.current = swiper}}
                style={{
                    minWidth: "100vw",
                    minHeight: "100vh"
                }}
            >
                {chaptersList?.map(chapter => (
                    <>
                        {chapter.pages?.map((page, ind) => (
                            <SwiperSlide 
                                key={`chapter_${chapter.id}_page_${page.uuid}`} 
                            >
                                <PageBlock 
                                    page={page}
                                    onPageActive={() => {
                                        if (currentChapter != chapter) {
                                            window.history.pushState({}, '', `/chapters/${chapter.id}`);

                                            dispatch(setChapterPageCurrentChapter(chapter)) 
                                        }

                                        dispatch(setChapterPageCurrentChapterPage(ind))

                                        handleSwipe(chapter, ind)

                                        setEndOpen(false)
                                    }}    
                                />
                            </SwiperSlide>
                        ))}
                        <SwiperSlide key={`chapter_${chapter.id}_end`}>
                            <HorizontalChapterEnd 
                                onActive={async () => {
                                    if (currentChapter != chapter) {
                                        window.history.pushState({}, '', `/chapters/${chapter.id}`);

                                        dispatch(setChapterPageCurrentChapter(chapter))
                                    }

                                    if (!nextChapterIsLoading.current && chapter == chaptersList[chaptersList.length - 1]){
                                        if (chapter.next_chapter_id){
                                            nextChapterIsLoading.current = true

                                            const nextChapter = await chapterService.getNextChapter(chapter)

                                            dispatch(appendChapterPageChapter(nextChapter))
                                            nextChapterIsLoading.current = false
                                        }
                                    }

                                    setEndOpen(true)
                                }}
                            />
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </Box>
    )
}