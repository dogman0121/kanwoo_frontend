"use client"

import Poster from "@/components/Poster";
import { useAppSelector, useAppStore } from "@/lib/state/hooks";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Description from "./_components/Description";
import Genres from "./_components/Genres";
import NameTranslations from "./_components/NameTranslations";
import Persons from "./_components/Persons";
import Similar from "./_components/Similar";
import theme from "@/theme";
import SectionsDesktop from "./_components/SectionsDesktop";
import Manga from "@/types/manga";
import { useRef, useState } from "react";
import { setManga } from "@/lib/state/features/manga/mangaSlice";
import ReportMangaDialog from "@/components/ReportMangaDialog";

export default function MangaPageDesktop({manga}: {manga: Manga}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setManga(manga))
        initialized.current = true
    }

    const similar = useAppSelector(state => state.manga.similar);

    const [reportDialogOpen, setReportDialogOpen] = useState(false);

    if (!manga) 
        return null;

    return (
        <>
            <Box 
                sx={{
                    mt: "55px", 
                    flexGrow: 1 
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container 
                        columns={{lg: 15, md: 13, sm: 8}} 
                        spacing={4} 
                    >
                        <Grid size={{lg: 3, md: 3, sm: 2}}>
                            <Poster 
                                src={manga.poster?.medium || ""}   
                            />
                            <Box
                                sx={{
                                    mt: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: "5px"
                                }}
                            >
                                <Button
                                    sx={{
                                        padding: "5px 0"
                                    }}
                                    fullWidth
                                    variant="contained"
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    fullWidth
                                    color="secondary"
                                    sx={(theme) =>({
                                        color: theme.typography.caption.color
                                    })}
                                    variant="text"
                                    onClick={() => setReportDialogOpen(true)}
                                >
                                    Пожаловаться
                                </Button>
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
                                    <Typography
                                        lineHeight={"1.2"}
                                    >
                                        {manga.type.name} / {manga.year} / {manga.status.name}
                                    </Typography>
                                    <Typography
                                        fontWeight={600}
                                        fontSize={"24px"}
                                        lineHeight={"1.2"}
                                        mt={"5px"}
                                    >
                                        {manga?.name}
                                    </Typography>
                                </Box>
                                <Button 
                                    sx={{
                                        py: "5px",
                                        px: "50px",
                                        fontSize: "16px"
                                    }}
                                    variant="contained"
                                >
                                    Читать
                                </Button>
                            </Box>
                            <Grid 
                                sx={{
                                    mt: "15px"
                                }}
                                container 
                                columns={{lg: 12, md: 8}}
                            >
                                <Grid size={similar.length == 0 ? 12 : 8}>
                                    <Box
                                        sx={{
                                            mt: "5px",
                                            display: "flex",
                                            flexDirection: "row",
                                            columnGap: "15px"
                                        }}
                                    >
                                        <Typography 
                                            variant="caption"
                                            sx={{
                                                fontSize: "14px",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center"
                                            }}
                                        >
                                            <BookmarkBorderRoundedIcon 
                                                sx={{
                                                    width: "22px",
                                                    height: "22px",
                                                    mr: "3px"
                                                }}
                                            /> 
                                            {0} сохранений
                                        </Typography>
                                        <Typography 
                                            variant="caption"
                                            sx={{
                                                fontSize: "14px",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center"
                                            }}
                                        >
                                            <VisibilityOutlinedIcon 
                                                sx={{
                                                    width: "22px",
                                                    height: "22px",
                                                    mr: "3px"
                                                }}
                                            /> 
                                            {manga.views} просмотров
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            mt: "15px",
                                            display: "flex",
                                            flexDirection: "column",
                                            rowGap: "20px"
                                        }}
                                    >
                                        <Description />
                                        <Genres />
                                        <NameTranslations />
                                        <Persons />
                                        <SectionsDesktop />
                                    </Box>
                                </Grid>
                                <Grid size={4}>
                                    <Similar />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                {manga.background && (
                    <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "600px",
                        zIndex: "-1",
                        background: `
                            linear-gradient(rgba(${theme.vars?.palette.background.defaultChannel} / 0.9), 
                            rgba(${theme.vars?.palette.background.defaultChannel} / 1)), 
                            url('${manga.background}')
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundPositionY: "0"
                    }}
                >
                </Box>
                )}
                {!manga.background && manga.poster?.medium && (
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "600px",
                            zIndex: "-1",
                            background: `
                                linear-gradient(rgba(${theme.vars?.palette.background.defaultChannel} / 0.9), 
                                rgba(${theme.vars?.palette.background.defaultChannel} / 1)), 
                                url('${manga.poster?.medium}')
                            `,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionY: "0"
                        }}
                    >
                    </Box>
                )}
        
            </Box>
            <ReportMangaDialog 
                open={reportDialogOpen}
                onClose={() => setReportDialogOpen(false)}
            />
        </>
    )
}