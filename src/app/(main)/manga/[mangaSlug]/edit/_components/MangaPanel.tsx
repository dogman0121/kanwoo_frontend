"use client"

import { Avatar, Box, Chip, IconButton, Typography } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useAppSelector, useAppStore } from "@/lib/state/hooks";
import Poster from "@/components/Poster";
import Manga from "@/types/manga";
import { useEffect, useRef } from "react";
import { setManga } from "@/lib/state/features/manga/mangaSlice";

export default function MangaPanel({manga}: {manga: Manga}) {
    const store = useAppStore()

    useEffect(() => {
        store.dispatch(setManga(manga))
    }, [manga])

    const currManga = useAppSelector(state => state.manga.manga)

    if (!currManga)
        return null;

    return (
        <Box
            sx={(theme) => ({
                position: "sticky",
                top: "54px",
                bgcolor: theme.vars?.palette.background.default,
                borderBottom: "1px solid",
                borderColor: "divider",
                zIndex: theme.zIndex.drawer + 1
            })}
        >
            <Box
                sx={{
                    p: "10px 30px 10px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "20px"
                    }}
                >
                    <IconButton>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <Poster
                        width="60px"
                        src={currManga.poster?.small}
                    />
                    <Box>
                        <Typography
                            variant="h1"
                        >
                            {currManga.name}
                        </Typography>
                        <Typography variant="caption">
                            @{currManga.slug}
                        </Typography>
                        <Box>
                            Автор:
                            <Chip 
                                sx={{
                                    ml: "5px"
                                }}
                                avatar={<Avatar src={currManga.creator?.avatar} />}
                                label={currManga.creator.name}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Typography>Дата создания:</Typography>
                    <Typography variant="caption">{new Date(currManga.created_at).toLocaleDateString()}</Typography>
                </Box>
            </Box>
        </Box>
    )
}