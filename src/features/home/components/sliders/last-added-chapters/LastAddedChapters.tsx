import { homeClientAPI } from "@/features/home/api/client.api";
import { HomeMapItem } from "@/features/home/types/hero";
import { CursorPagination } from "@/lib/fetch/api-response.types";
import { Chapter, ChapterContext } from "@/types/chapter";
import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ChapterItem from "./ChapterItem";

export default function LastAddedChapters({
    item
}: {
    item: HomeMapItem
}) {

    const [chapters, setChapters] = useState<Chapter[]>([])
    const [chaptersContexts, setChaptersContexts] = useState<ChapterContext[]>([]) 
    const loadingRef = useRef(false)
    const loadedRef = useRef(false)
    const cursorRef = useRef<Record<string, unknown> | undefined>(undefined)
    const hasMoreRef = useRef(true)

    const fetchChapters = async () => {
        try {
            loadingRef.current = true

            const response = await homeClientAPI.getLastAddedChapters(cursorRef.current)

            setChapters(prev => [...prev, ...response.data])
            setChaptersContexts(prev => [...prev, ...response.context])
            cursorRef.current = response.pagination.cursor
            hasMoreRef.current = response.pagination.has_more
        } finally {
            loadedRef.current = true
            loadingRef.current = false
        }
    }

    useEffect(() => {
        if (loadedRef.current || loadingRef.current) return

        fetchChapters()
    }, [])

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h3"
            >
                {item.title}
            </Typography>
            <Paper
                elevation={3}
                sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        borderRadius: 2,
                        py: 2,
                        px: 3,

                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    {chapters.map((chapter, ind) => (
                        <Box key={`home_page_${item.type}_${chapter.id}`}>
                            {ind != 0 && (
                                <Divider />
                            )}
                            <ChapterItem 
                                chapter={chapter}
                                chapterContext={chaptersContexts[ind]}
                            />
                        </Box>
                    ))}
                </Paper>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!hasMoreRef.current}
                    onClick={fetchChapters}
                    loading={loadingRef.current}
                    sx={{
                        mt: 2
                    }}
                >
                    Показать еще
                </Button>
            </Paper>
        </Container>
    )
}