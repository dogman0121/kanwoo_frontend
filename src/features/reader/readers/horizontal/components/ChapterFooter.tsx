import { Box, SxProps, Typography } from "@mui/material"
import { RefObject } from "react"
import { MAX_CHAPTER_WIDTH } from "@/constants/reader"
import { Chapter } from "@/types/chapter"
import { NavigationButtonsShadow } from "../../../components/NavigationButtons"
import ChapterFooterInner from "@/features/reader/components/ChapterFooterInner"
import OffsetContainer from "@/features/reader/components/ui/OffsetContainer"

export interface ChapterFooterProps {
    chapter: Chapter,
    ref?: RefObject<HTMLElement | null>,
    sx?: SxProps
}

export default function ChapterFooter({
    chapter,
    ref,
    sx
}: ChapterFooterProps) {
    return (
        <Box
            sx={{
                bgcolor: "header.main",

                width: "100%",
                height: "100%",
                display: "flex"
            }}
        >
            <OffsetContainer
                ref={ref}

                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box
                    sx={{
                        pt: "59px",
                        px: 2,
                        pb: "150px",

                        height: "100%",
                        width: "100%",

                        touchAction: "pan-y",
                        overflowY: "auto",

                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <ChapterFooterInner chapter={chapter} />
                </Box>
                <NavigationButtonsShadow />
            </OffsetContainer>
        </Box>
    )
}