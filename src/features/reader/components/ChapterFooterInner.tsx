import { Box } from "@mui/material";
import AddSkeleton from "./ui/AddSkeleton";
import CommentsPreview from "./comments/CommentsPreview";
import { Chapter } from "@/types/chapter";
import { MAX_CHAPTER_WIDTH } from "@/constants/reader";

export default function ChapterFooterInner({
    chapter
}: {
    chapter: Chapter
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 4,

                maxWidth: MAX_CHAPTER_WIDTH,
                width: "100%",

                mx: "auto",
            }}
        >
            <AddSkeleton />
            <CommentsPreview
                chapter={chapter}
            />
        </Box>
    )
}