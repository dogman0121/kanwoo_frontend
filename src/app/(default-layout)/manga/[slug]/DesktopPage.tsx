"use client"

import Poster from "@/components/poster/Poster";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";
import Similar from "./_components/Similar";
import { useEffect } from "react";
import Stats from "@/features/manga/components/Stats";
import { selectSection, setSection } from "@/lib/state/features/manga-page/page/slice";
import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import ReadingButton from "./_components/ReadingButton";
import ChaptersSection from "./_components/ChapterSection";
import CommentsSection from "./_components/desktop/CommentSection";
import { Manga } from "@/types/manga";
import { openCollectionDialog, openReportDialog } from "@/features/global/states/app/slice";
import Metadata from "@/features/manga/components/Metadata";
import Description from "@/features/manga/components/Description";
import Genres from "@/features/manga/components/Genres";
import NameTranslations from "@/features/manga/components/NameTranslations";


export default function DesktopPage({
    manga
}: {
    manga: Manga
}) {
    const dispatch = useAppDispatch()

    const theme = useTheme()

    const section = useAppSelector(selectSection)

    const handleChangeSection = (_event: React.SyntheticEvent, newValue: string) => {
        dispatch(setSection(newValue));
    };

    useEffect(() => {
        if (!manga) return () => {};

        navigator.sendBeacon(`/api/manga/${manga.slug}/views`)

    }, [manga])

    if (!manga) 
        return null;

    const backgroundURL = manga.background ?? manga.poster.medium 
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
                                src={manga.poster.medium || ""}   
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
                                    onClick={() => dispatch(openCollectionDialog({slug: manga.slug}))}
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
                                    onClick={() => dispatch(openReportDialog({type: "manga", entityID: manga.slug}))}
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
                                    type={manga.type}
                                    status={manga.status}
                                    year={manga.year}
                                />
                                <Typography variant="h1">
                                    {manga.name}
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
                                <Stats size="medium" views={manga.stats.views} saves={manga.stats.saves} boxProps={{sx:{mt: 1}}}/>
                                <Box
                                    sx={{
                                        mt: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 4
                                    }}
                                >
                                    <Description description={manga.description}/>
                                    <Genres genres={manga.genres} />
                                    <NameTranslations nameTranslations={manga.name_translations}/>
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
                                <Similar />
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