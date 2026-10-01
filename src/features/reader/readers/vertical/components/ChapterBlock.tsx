"use client"

import { Box } from "@mui/material";
import { useAppDispatch } from "@/lib/state/hooks";
import { RefObject, useEffect, useRef } from "react";
import Page from "@/types/chapter/page";
import { Chapter } from "@/types/chapter";
import useWindowWidth from "@/features/reader/hooks/useWindowWidth";
import ReaderPage from "@/features/reader/components/ReaderPage";
import ChapterFooterInner from "@/features/reader/components/ChapterFooterInner";
import { NavigationButtonsShadow } from "@/features/reader/components/NavigationButtons";
import { MAX_CHAPTER_WIDTH } from "@/constants/reader";

function ChapterFooter({
    chapter
}: {
    chapter: Chapter
}) {
    return (
        <Box
            sx={{
                bgcolor: "header.main",
            }}
        >
            <Box
                sx={{
                    pt: 5,
                    px: 2,
                }}
            >
                <ChapterFooterInner chapter={chapter}/>
            </Box>
            <NavigationButtonsShadow />
        </Box>
    )
}

const calculatePagesOffsets = (pages: Page[], windowWidth: number) => {
    const offsets = [0];

    for (let page of pages) {
        const height = page.height * (windowWidth / page.width)

        offsets.push(offsets[offsets.length-1] + height)
    }

    return offsets
}

export interface VerticalChapterProps {
    chapter: Chapter,
    ref?: RefObject<HTMLElement> | ((el: HTMLElement) => void)
}

export const MAX_VERTICAL_CHAPTER_WIDTH = 800;

export default function ChapterBlock({
    chapter,
    ref
}: VerticalChapterProps) {
    const dispatch = useAppDispatch()

    const { width } = useWindowWidth()

    const pages = chapter.pages!

    if (!pages) return

    return (
        <Box
            ref={ref}
        >
            <Box
                sx={{
                    maxWidth: MAX_CHAPTER_WIDTH,
                    width: "100%",
                    mx: "auto",

                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {pages.map((page, ind) => (
                    <ReaderPage
                        key={`reader_chapter_${chapter.id}_page_${page.uuid}`}
                        page={page}
                        //disableRender={ind < startRenderIdx || endRenderIdx < ind}
                    />
                ))}
            </Box>
            <ChapterFooter chapter={chapter}/>
        </Box>
    )
}