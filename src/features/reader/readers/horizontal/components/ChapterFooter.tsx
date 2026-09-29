import { Box, SxProps, Typography } from "@mui/material"
import { RefObject } from "react"
import { MAX_CHAPTER_WIDTH } from "@/constants/reader"
import { Chapter } from "@/types/chapter"
import CommentsPreview from "../../../components/comments/CommentsPreview"
import { NavigationButtonsShadow } from "../../../components/NavigationButtons"
import AddSkeleton from "../../../components/ui/AddSkeleton"
import ChapterFooterInner from "@/features/reader/components/ChapterFooterInner"

export interface ChapterFooterProps {
    chapter: Chapter,
    ref?: RefObject<HTMLElement | null>,
    sx?: SxProps
}

export default function ChapterFooter({
    chapter,
    sx
}: ChapterFooterProps) {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "header.main",


                display: "flex",
                flexDirection: "column",
                ...sx
            }}
        >
            <Box
                sx={{
                    pt: "59px",
                    px: 2,
                    pb: 4,

                    height: "100%",
                    overflowY: "auto",

                    display: "flex",
                }}
            >
                <ChapterFooterInner chapter={chapter} />
            </Box>
            <NavigationButtonsShadow />
        </Box>
    )
}