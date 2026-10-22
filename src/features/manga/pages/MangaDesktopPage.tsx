"use client"

import Poster from "@/components/poster/Poster";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";
import Stats from "@/features/manga/components/ui/Stats";
import { initializeMangaPage, selectSection, setSection } from "@/features/manga/states/manga-page/page/slice";
import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import { Manga } from "@/types/manga";
import { openCollectionDialog, openReportDialog } from "@/features/global/states/app/slice";
import Metadata from "@/features/manga/components/ui/Metadata";
import Description from "@/features/manga/components/ui/Description";
import Genres from "@/features/manga/components/ui/Genres";
import NameTranslations from "@/features/manga/components/ui/NameTranslations";
import ReadingButton from "../components/ReadingButton";
import ChaptersSection from "../components/ChapterSection";
import CommentsSection from "../components/desktop/CommentSection";
import SimilarManga from "../components/SimilarManga";
import { Entity } from "@/lib/types/Entity.type";
import { MangaContext, MangaPermission } from "../types";
import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import { useEffect } from "react";
import { addManga } from "../states/manga/slice";


export default function MangaDesktopPage({
    manga,
    readingProgress
}: {
    manga: Entity<Manga, MangaContext, MangaPermission>
    readingProgress: Entity<ReadingProgress, ReadingProgressContext>
}) {
    const dispatch = useAppDispatch()

    const theme = useTheme()

    const section = useAppSelector(selectSection)

    const handleChangeSection = (_event: React.SyntheticEvent, newValue: string) => {
        dispatch(setSection(newValue));
    };

    useEffect(() => {
        dispatch(addManga(manga))

        dispatch(initializeMangaPage({
            mangaSlug: manga.data.slug,
            readingProgress: readingProgress
        }))
    }, [manga, readingProgress])

    if (!manga) 
        return null;

    const backgroundURL = manga.data.background ?? manga.data.poster?.medium 
    const backgroundColor = theme.vars?.palette.background.defaultChannel

    return (
        <>
            <Container 
                maxWidth="lg"
                sx={{
                    mt: 10,
                    flexGrow: 1
                }}
            >
                <Grid
                    container 
                    columns={{lg: 15, md: 13, sm: 8}} 
                    spacing={4} 
                >
                    <Grid 
                        size={{lg: 3, md: 3, sm: 2}}
                    >
                        <Box
                            sx={{
                                position: "sticky",
                                top: "94px"
                            }}
                        >
                            <Poster 
                                src={manga.data.poster?.medium || ""}   
                            />
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: 1
                                }}
                            >
                                <Button
                                    sx={{
                                        py: 1
                                    }}
                                    fullWidth
                                    variant="contained"
                                    onClick={() => dispatch(openCollectionDialog({mangaUUID: manga.data.slug}))}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    fullWidth
                                    disableRipple
                                    sx={{
                                        color: "text.secondary",

                                        bgcolor: "transparent",
                                        ":hover": {
                                            bgcolor: "transparent"
                                        }
                                    }}
                                    onClick={() => dispatch(openReportDialog({type: "manga", entityID: manga.data.slug}))}
                                >
                                    Пожаловаться
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{lg: 12, md: 10, sm:6}}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-between"
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <Metadata 
                                    type={manga.data.type}
                                    status={manga.data.status}
                                    year={manga.data.year}
                                />
                                <Typography variant="h1">
                                    {manga.data.name}
                                </Typography>
                            </Box>
                            <ReadingButton />
                        </Box>
                        <Grid 
                            sx={{
                                mt: 3
                            }}
                            container 
                            columns={{lg: 12, md: 8}}
                        >
                            <Grid size={12}>
                                <Stats 
                                    size="medium" 
                                    views={manga.data.stats.views}
                                    saves={manga.data.stats.saves} 
                                    sx={{mt: 1}}
                                />
                                <Box
                                    sx={{
                                        mt: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 4
                                    }}
                                >
                                    <Description description={manga.data.description}/>
                                    <Genres genres={manga.data.genres} />
                                    <NameTranslations nameTranslations={manga.data.name_translations}/>
                                </Box>
                                <Box
                                    sx={{
                                        mt: 4
                                    }}
                                >
                                    <AppTabContext value={section}>
                                        <AppTabList onChange={handleChangeSection}>
                                            <AppTab label="Главы" value={"chapters"}/>
                                            <AppTab label="Комментарии" value={"comments"}/>
                                        </AppTabList>
                                        <AppTabPanel value={"chapters"}>
                                            <ChaptersSection />
                                        </AppTabPanel>
                                        <AppTabPanel value={"comments"}>
                                            <CommentsSection />
                                        </AppTabPanel>
                                    </AppTabContext>
                                </Box>
                            </Grid>
                            <Grid size={4}>
                                <SimilarManga />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {backgroundURL && (
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "600px",
                        zIndex: "-1",
                        background: `
                            linear-gradient(rgba(${backgroundColor} / 0.9), 
                            rgba(${backgroundColor} / 1)), 
                            url('${backgroundURL}')
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundPositionY: "0"
                    }}
                />
            )}
        </>
    )
}