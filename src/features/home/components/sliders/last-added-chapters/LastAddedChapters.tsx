import { homeClientAPI } from "@/features/home/api/client.api";
import { Chapter, ChapterContext } from "@/types/chapter";
import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState, useTransition } from "react";
import ChapterItem from "./ChapterItem";
import { useAppSelector } from "@/lib/state/hooks";
import { selectBlockByHash } from "@/features/home/states/home-page/slice";
import LastAddedChaptersSkeleton from "./LastAddedChaptersSkeleton";
import { range } from "lodash";
import { selectDeviceType } from "@/features/global/states/app/slice";
import { HomeChapter, LastAddedChaptersBlock } from "@/features/home/types/hero";

export default function LastAddedChapters({
    hash
}: {
    hash: string
}) {
    const deviceType = useAppSelector(selectDeviceType)

    const block = useAppSelector(state => selectBlockByHash(state, hash))

    const [isLoading, setIsLoading] = useTransition()

    const [results, setResults] = useState<HomeChapter[]>([])
    const [cursor, setCursor] = useState<Record<string, unknown>>({})
    const [hasMore, setHasMore] = useState(false)

    const loadChapters = async () => {
        setIsLoading(async () => {
            const response = await homeClientAPI.getLastAddedChapters(cursor)

            setResults(prev => [...prev, ...response.data])
            setCursor(response.pagination.cursor)
            setHasMore(response.pagination.has_more)
        })
    }

    useEffect(() => {
        if (!block?.data) return

        setResults((block.data as LastAddedChaptersBlock).chapters)
        setCursor((block.data as LastAddedChaptersBlock).pagination.cursor)
        setHasMore((block.data as LastAddedChaptersBlock).pagination.has_more)
    }, [block])

    return (
        <Box>
            <Container maxWidth="lg">
                <Typography variant="h3">
                    Последние обновления
                </Typography>
            </Container>
            <Container 
                maxWidth="lg"
                sx={{
                    px: deviceType != "desktop" ? 0 : undefined
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        mt: 3,
                        pt: 3,
                        px: 2,
                        pb: 4,
                        borderRadius: "0",
                        borderTopLeftRadius: "18px",
                        borderTopRightRadius: "18px",
                    }}
                >
                    <Stack
                        direction="column"
                        spacing={2}
                        divider={
                            <Divider />
                        }
                    >
                        {block?.status != "loaded" ?
                            range(0, 4).map((idx) => (
                                <LastAddedChaptersSkeleton key={`home_page_last_added_chapters_stub_${idx}`}/>
                            ))
                            :
                            results.map((chapter, ind) => (
                                <Box key={`home_page_last_added_chapters_${chapter.id}`}>
                                    
                                    <ChapterItem 
                                        chapter={chapter}
                                    />
                                </Box>
                            ))
                        }
                    </Stack>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!hasMore}
                        onClick={loadChapters}
                        loading={isLoading}
                        sx={{
                            mt: 3
                        }}
                    >
                        Показать еще
                    </Button>
                </Paper>
            </Container>
        </Box>
    )
}