"use client"

import { useAppSelector } from "@/lib/state/hooks"
import ChapterBlock from "./ChapterBlock"
import { Box } from "@mui/material"
import useScrollController from "../hooks/controllers/useScrollController"
import ReaderVariant from "../../../interfaces/reader"
import { selectChapters } from "@/features/reader/states/reader/selectors"
import OffsetContainer from "@/features/reader/components/ui/OffsetContainer"
import { NavigationButtonsShadow } from "@/features/reader/components/NavigationButtons"
import { selectOffsetEnabled } from "@/features/reader/states/reader.slice"
import { Chapter } from "@/features/chapter/types/chapter.type"
import useNavigationController from "@/features/reader/hooks/controllers/useNavOpen"
import { useCallback } from "react"
import { selectInfinityChapter } from "@/features/reader/states/reading-settings/selectors"

export interface VerticalOptions extends ReaderVariant {

}

export default function VerticalReader({
    onLoadNextChapter,
    onPageChanged,
    onChapterReadingFinished
}: VerticalOptions) {
    
    const chapters = useAppSelector(selectChapters)

    const infinityChapter = useAppSelector(selectInfinityChapter)
    
    const {open, close, toggle} = useNavigationController()

    const handlePageChanged = useCallback((chapterIdx: number, pageIdx: number) => {
        onPageChanged?.({
            value: {
                chapter: chapters[chapterIdx],
                chapterIdx: chapterIdx,
                page: chapters[chapterIdx].pages![pageIdx],
                pageNumber: pageIdx
            }
        })
    }, [chapters])

    const handleChapterEnd = (chapter: Chapter) => {
        onChapterReadingFinished?.({
            value: {
                chapter: chapter
            }
        })
    }
    const handleLoadNextChapter = (chapter: Chapter) => {
        onLoadNextChapter?.({
            value: {
                chapter: chapter
            }
        })
    }

    const handleTopReached = useCallback(() => open(), [open])
    const handleTopLeaved = useCallback(() => open(), [close])
    const handleBottomReached = useCallback(() => open(), [open])
    const handleBottomLeaved = useCallback(() => open(), [close])
    const handleClick = useCallback(() => toggle(), [toggle])
    const handleScroll = useCallback(() => close(), [close])

    const {
        playgroundRef,
        chaptersRef
    } = useScrollController({
        disableInfinityChapter: !infinityChapter,
        onPageChanged: handlePageChanged,
        onLoadNextChapter: handleLoadNextChapter,
        onChapterEnd: handleChapterEnd,
        onTopReached: handleTopReached,
        onTopLeaved: handleTopLeaved,
        onBottomReached: handleBottomReached,
        onBottomLeaved: handleBottomLeaved,
        onClick: handleClick,
        onScroll: handleScroll
    })

    const offsetEnabled = useAppSelector(selectOffsetEnabled)

    return (
        <Box
            ref={playgroundRef}
        >
            <OffsetContainer ref={playgroundRef} offsetEnabled={offsetEnabled}>
                {chapters.map((chapter) => (
                    <ChapterBlock 
                        key={`chapter_page_chapter_${chapter.id}`}
                        chapter={chapter}
                        ref={(node) => {
                            if (node) {
                                chaptersRef.current.set(chapter.id, node)
                            } else {
                                chaptersRef.current.delete(chapter.id)
                            }
                        }}
                    />
                ))}
                <Box sx={{
                    bgcolor: "header.main",
                }}>
                    <NavigationButtonsShadow />
                </Box>
            </OffsetContainer>
        </Box>
    )
}