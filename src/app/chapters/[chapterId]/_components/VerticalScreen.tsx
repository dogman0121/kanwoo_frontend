"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import Chapter from "@/types/chapter/chapter"
import Page from "@/types/chapter/page"
import { Box, BoxProps } from "@mui/material"
import { throttle } from "lodash"
import { useContext, useEffect, useRef, useState } from "react"
import { chapterService } from "../_services/chapterService"
import { 
    appendChapterPageChapter, 
    setChapterPageCurrentChapter, 
    setChapterPageCurrentChapterPage
} from "@/lib/state/features/chapterPage/chapterPageSlice"
import ChapterEnd from "./ChapterEnd"
import { NavigationButtonsShadow } from "./NavigationButtons"
import NavOpenContext from "../_contexts/navOpenContext"

function PageBlock({page, ...props}: {page: Page} & BoxProps) {
    return (
        <Box
            {...props}
        >
            <img 
                style={{
                    width: "100%",
                    height: "100%"
                }}
                src={page.link}
            />
        </Box>
    )
}

function ChapterBlock({chapter, ...props}: BoxProps & {chapter: Chapter}) {
    const dispatch = useAppDispatch()

    const pagesRef = useRef<HTMLDivElement[]>(new Array(chapter.pages?.length || 0))

    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)

    const currentChapterRef = useRef(currentChapter);

    useEffect(() => {
        currentChapterRef.current = currentChapter
    }, [currentChapter])

    const handlePage = throttle(() => {
        if (chapter != currentChapterRef.current) return;

        for (let i = pagesRef.current.length-1; i >= 0; i--) {
            const pageDiv = pagesRef.current[i]
            const pageCords = pageDiv.getBoundingClientRect()

            if (pageCords.top <= 0) {
                const pageNumber = pagesRef.current.indexOf(pageDiv)

                dispatch(setChapterPageCurrentChapterPage(pageNumber))
                break;
            }
        }
    }, 20)

    useEffect(() => {
        document.addEventListener("scroll", handlePage)

        return () => {document.removeEventListener("scroll", handlePage)}
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px"
            }}
            {...props}
        >
            <Box
                sx={{
                    maxWidth: "760px",
                    width: "100%",
                    mx: "auto",
                }}
            >
                {chapter.pages?.map((page, ind) => (
                    <PageBlock 
                        ref={(el: HTMLDivElement) => {
                            pagesRef.current[ind] = el
                        }}
                        key={`chapter_${chapter.id}_page_${page.uuid}`} 
                        page={page} 
                    />
                ))}
            </Box>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    p: "80px 0 20px"
                }}
            >
                <ChapterEnd />
                <NavigationButtonsShadow />
            </Box>
        </Box>
    )
}

export default function VerticalScreen() {
    const dispatch = useAppDispatch()

    const {setOpen} = useContext(NavOpenContext)

    const nextChapterIsLoading = useRef(false)

    const currentChapterPageNumber = useAppSelector(state => state.chapterPage.currentChapterPage)
    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)
    const chaptersList = useAppSelector(state => state.chapterPage.chaptersList)
    const readingSettings = useAppSelector(state => state.readingSettings)

    const chaptersRef = useRef<HTMLDivElement[]>(new Array(chaptersList?.length || 0))

    const chaptersListRef = useRef(chaptersList)
    const currentChapterRef = useRef(currentChapter);
    const pageNumberRef = useRef(currentChapterPageNumber);

    useEffect(() => {
        currentChapterRef.current = currentChapter;
    }, [currentChapter]);

    useEffect(() => {
        pageNumberRef.current = currentChapterPageNumber;
    }, [currentChapterPageNumber]);

    useEffect(() => {
        chaptersListRef.current = chaptersList;
    }, [chaptersList]);

    const handleSave = throttle(async () => {
        if (!currentChapterRef.current) return ;
        if (!pageNumberRef.current) return;
        if (!readingSettings.autoSave) return ;

        chapterService.saveProgress(currentChapterRef.current, pageNumberRef.current)
    }, 5000)

    const handleNextChapter = throttle(async() => {
        if (nextChapterIsLoading.current) return;
        if (!readingSettings.infinityChapter) return;
        if (!chaptersListRef.current || currentChapterRef.current != chaptersListRef.current[chaptersListRef.current.length-1]) return
        if (!chaptersListRef.current[chaptersListRef.current.length-1].next_chapter_id) return

        if (window.scrollY + window.screen.height >= document.body.scrollHeight - 200) {
            nextChapterIsLoading.current = true

            const nextChapter = await chapterService.getNextChapter(chaptersListRef.current[chaptersListRef.current.length-1])

            dispatch(appendChapterPageChapter(nextChapter))

            nextChapterIsLoading.current = false
        }

    }, 500)

    const handleChapter = throttle(() => {
        if (!chaptersListRef.current) return;

        for (let i = chaptersRef.current.length-1; i >= 0; i--) {
            const chapterDiv = chaptersRef.current[i]
            const chapterCords = chapterDiv.getBoundingClientRect()

            if (chaptersList && chapterCords.top <= 0) {
                const chapter = chaptersListRef.current[chaptersRef.current.indexOf(chapterDiv)]
                
                if (currentChapterRef.current != chapter) {
                    window.history.pushState({}, '', `/chapters/${chapter.id}`);
                    dispatch(setChapterPageCurrentChapter(chapter))
                }

                break;
            }
        }
    }, 20)


    useEffect(() => {
        document.addEventListener("scroll", handleChapter)
        document.addEventListener("scroll", handleSave)
        document.addEventListener("scroll", handleNextChapter)

        return () => {
            document.removeEventListener("scroll", handleSave)
            document.removeEventListener("scroll", handleChapter)
            document.removeEventListener("scroll", handleNextChapter)
        }
    }, [])

    // Navigation components open controller
    useEffect(() => {
        const handleOpenHeader = () => {
            setOpen(open => !open)
        }

        const handleScrollHeader = (_event: Event) => {
            if (window.scrollY <= 5 || window.scrollY + window.screen.height >= document.body.scrollHeight)
                setOpen(true)
            else 
                setOpen(false)
        }

        document.addEventListener("click", handleOpenHeader)
        document.addEventListener("scroll", handleScrollHeader)

        return () => {
            document.removeEventListener("click", handleOpenHeader)
            document.removeEventListener("click", handleScrollHeader)
        }
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            {chaptersList?.map((c, ind) => (
                <ChapterBlock
                    chapter={c}
                    key={`chapter_${c.id}`}
                    ref={(el: HTMLDivElement) => {
                        chaptersRef.current[ind] = el
                    }}
                />
            ))}
        </Box>
    )
}