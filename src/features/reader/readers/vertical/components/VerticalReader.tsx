"use client"

import { useAppSelector } from "@/lib/state/hooks"
import ChapterBlock from "./ChapterBlock"
import { Box } from "@mui/material"
import useScrollController from "../hooks/controllers/useScrollController"
import ReaderVariant from "../../../interfaces/reader"
import { selectChapters } from "@/features/reader/states/reader/selectors"
import OffsetContainer from "@/features/reader/components/ui/OffsetContainer"

export interface VerticalOptions extends ReaderVariant {

}

export default function VerticalReader({
    onLoadNextChapter,
    onPageChange
}: VerticalOptions) {
    
    const chapters = useAppSelector(selectChapters)

    const {
        playgroundRef,
        chaptersRef
    } = useScrollController({
        onPageChange: onPageChange,
        onLoadNextChapter: onLoadNextChapter
    })

    return (
        <Box
            ref={playgroundRef}
        >
            <OffsetContainer>
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
            </OffsetContainer>
        </Box>
    )
}