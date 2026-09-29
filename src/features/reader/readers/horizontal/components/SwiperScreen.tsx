"use client"

import { Box, BoxProps, styled } from "@mui/material"
import { useAppSelector } from "@/lib/state/hooks"
import EndOfChapter from "./ChapterFooter"
import ReaderPage, { ReaderPageProps } from "../../../components/ReaderPage"
import { selectChapters } from "@/features/reader/states/reader/selectors"
import useSwipeController from "@/features/reader/readers/horizontal/hooks/controllers/useSwipeController"
import useScreenWidth from "@/features/reader/hooks/useScreenWidth"
import ReaderVariant from "@/features/reader/interfaces/reader"
import ChapterFooter from "./ChapterFooter"
import OffsetContainer from "@/features/reader/components/ui/OffsetContainer"
import { selectOffsetEnabled } from "@/features/reader/states/reader.slice"
import { transitionProperty } from "@dnd-kit/sortable/dist/hooks/defaults"

function PageContainer({sx, ...props}: BoxProps){
    return (
        <Box
            sx={{
                minWidth: "var(--page-width)",
                minHeight: "100%",

                position: "relative",

                flexShrink: 0,
                flexGrow: 0,
                ...sx
            }}
            {...props} 
        />
    )
}

const StyledReaderPage = ({sx, ...props}: ReaderPageProps) => {
    return (
        <ReaderPage 
            sx={{
                margin: "0 auto",
                display: "block",

                maxWidth: "100%",
                maxHeight: "100%",

                position: "absolute",
                left: "50%",
                top: "50%",

                transform: "translate(-50%, -50%)",
                
                ...sx
            }} 
            {...props}
        />
    )
}

export interface SwiperScreen extends ReaderVariant {

}

export default function SwiperScreen({
    onPageChange,
    onLoadNextChapter
}: ReaderVariant) {
    const chapters = useAppSelector(selectChapters)

    const {
        playgroundRef,
        swipeableRef
    } = useSwipeController({
        onPageChange: onPageChange,
        onLoadNextChapter: onLoadNextChapter
    })

    const offsetEnabled = useAppSelector(selectOffsetEnabled)

    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <OffsetContainer
                ref={playgroundRef}
                onDragStart={(event) => {
                    event.preventDefault()
                }}
                onPointerCancel={(event) => {
                    console.log(event.target)
                }}
                sx={{
                    overflowX: "hidden",
                    position: "relative",

                    height: "100dvh",
                    maxWidth: "100%",

                    isolation: "isolate", 
                    backfaceVisibility: "hidden",
                    willChange: "transform", 

                    touchAction: "none",

                    "@property --page-width": {
                        syntax: '"<length>"',
                        inherits: "true",
                        initialValue: "0px",
                    },

                    "--page-width": offsetEnabled
                        ? "calc(100vw - 400px)"
                        : "calc(100vw - 0px)",
                    transition: "--page-width 300ms ease",
                }}
            >
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: "row",

                        height: "100%",

                        transitionProperty: "transform",
                        transitionTimingFunction: "ease-out",
                        transitionDelay: "0ms"
                    }}
                    ref={swipeableRef}
                >
                    {chapters.map((chapter) => (
                        <Box key={`reader_chapter_${chapter.id}`}
                            sx={{
                                display: "flex",
                                flexDirection: "row",

                                flexShrink: 0,
                            }}
                        >
                            {chapter.pages!.map((page, ind) => (
                                <PageContainer
                                    key={`reader_chapter_${chapter.id}_page_${ind}`}
                                >
                                    <StyledReaderPage page={page} />
                                </PageContainer>
                            ))}
                            <PageContainer
                            >
                                <ChapterFooter chapter={chapter}/>
                            </PageContainer>
                        </Box>
                    ))}
                </Box>
            </OffsetContainer>
        </Box>
    )
}