"use client"

import theme from "@/constants/themes/main.theme";
import { Box, IconButton, Typography } from "@mui/material";
import Poster from "@/components/poster/Poster";
import Stats from "@/features/manga/components/ui/Stats";
import Metadata from "@/features/manga/components/ui/Metadata";
import { Manga } from "@/types/manga";
import Header from "../components/mobile/Header";
import ReadingButton from "../components/ReadingButton";
import MobileSections from "../components/mobile/MobileSections";
import { Entity } from "@/lib/types/Entity.type";
import { MangaContext, MangaPermission } from "../types";
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import { useAppDispatch } from "@/lib/state/hooks";
import { useEffect } from "react";
import { addManga } from "../states/manga/slice";
import { initializeMangaPage } from "../states/manga-page/page/slice";
import { initializeTranslations, setTranslations } from "../states/manga-page/translations/slice";


export default function MangaMobilePage({
    manga,
    readingProgress
}: {
    manga: Entity<Manga, MangaContext, MangaPermission>
    readingProgress: Entity<ReadingProgress, ReadingProgressContext>
}) {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(addManga(manga))

        dispatch(initializeTranslations())
        dispatch(initializeMangaPage({
            mangaSlug: manga.data.slug,
            readingProgress: readingProgress
        }))
    }, [manga, readingProgress])

    const backgroundURL = manga.data?.background ?? manga.data.poster?.medium 
    const backgroundColor = theme.vars?.palette.background.defaultChannel

    return (
        <>
            <Box
                sx={{
                    maxWidth: "720px",
                    margin: "auto"
                }}
            >
                <Box
                    sx={{
                        pt: 2,
                        px: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                        width: "100%",
                        zIndex: "-1",
                        background: backgroundURL && (`
                            linear-gradient(rgba(${backgroundColor} / 0.6), 
                            rgba(${backgroundColor} / 1)), 
                            url('${backgroundURL}')
                        `),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundPositionY: "0"
                    }}
                >
                    <Header />
                    <Box
                        sx={{
                            mt: 2,
                            mx: "auto",
                            minWidth: "140px",
                            maxWidth: "180px",
                            width: "50%"

                        }}
                    >
                        <Poster 
                            src={manga.data.poster?.medium}
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Metadata 
                            status={manga.data.status}
                            type={manga.data.type}
                            year={manga.data.year}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                textAlign: "center"
                            }}
                        >
                            {manga.data.name}
                        </Typography>
                    </Box>
                    <Stats 
                        views={manga.data.stats.views} 
                        saves={manga.data.stats.saves} 
                        size="small" 
                        sx={{
                            mt: 2
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        px: 2,
                        mt: 2,
                        width: "100%"
                    }}
                >
                    <ReadingButton fullWidth />
                </Box>
                <Box
                    sx={{
                        px: 2,
                        pb: 3,
                        mt: 4
                    }}
                >
                    <MobileSections />
                </Box>
            </Box>
        </>
    )
}