"use client"

import { Box, BoxProps, styled, useTheme } from "@mui/material"
import { useAppSelector } from "@/lib/state/hooks"
import ReaderPage, { ReaderPageProps } from "../../../components/ReaderPage"
import { selectChapters } from "@/features/reader/states/reader/selectors"
import useSwipeController from "@/features/reader/readers/horizontal/hooks/controllers/useSwipeController"
import ReaderVariant from "@/features/reader/interfaces/reader"
import ChapterFooter from "./ChapterFooter"
import OffsetContainer from "@/features/reader/components/ui/OffsetContainer"
import { selectOffsetEnabled } from "@/features/reader/states/reader.slice"

function PageContainer({sx, ...props}: BoxProps){
    return (
        <Box
            sx={{
                width: "var(--page-width)",
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

const HorizontalReaderContainer = styled(OffsetContainer)(({theme}) => ({
    "--page-width": "100vw",

    overflowX: "hidden",
    position: "relative",

    height: "100dvh",
    maxWidth: "100%",

    isolation: "isolate", 
    backfaceVisibility: "hidden",
    willChange: "transform", 

    touchAction: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
    WebkitUserDrag: "none",
    overscrollBehavior: "contain",

    transition: theme.transitions.create('--page-width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    "@property --page-width": {
        syntax: '"<length>"',
        inherits: "true",
        initialValue: "0px",
    },

    variants: [
        {
            props: ({offsetEnabled}) => offsetEnabled,
            style: {
                "--page-width": "calc(100vw - 400px)",

                transition: theme.transitions.create('--page-width', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }
        }
    ]
}))

export interface SwiperScreen extends ReaderVariant {

}

export default function HorizontalReader({
    onPageChange,
    onLoadNextChapter
}: ReaderVariant) {

    const theme = useTheme()
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
            onPointerCancel = {(e) => {
                console.log(e)
            }}
        >
            <HorizontalReaderContainer
                ref={playgroundRef}
                id="offset-container"
                offsetEnabled={offsetEnabled}
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
                            <PageContainer>
                                <ChapterFooter chapter={chapter}/>
                            </PageContainer>
                        </Box>
                    ))}
                </Box>
            </HorizontalReaderContainer>
        </Box>
    )
}