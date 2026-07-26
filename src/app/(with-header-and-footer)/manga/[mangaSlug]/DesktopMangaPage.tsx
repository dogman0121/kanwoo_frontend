"use client"

import Poster from "@/components/Poster";
import { useAppSelector, useAppStore } from "@/lib/state/hooks";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Description from "./_components/Description";
import Genres from "./_components/Genres";
import NameTranslations from "./_components/NameTranslations";
import Similar from "./_components/Similar";
import theme from "@/theme";
import { useState } from "react";
import DesktopSections from "./_components/desktop/DesktopSections";
import DesktopReadingButton from "./_components/desktop/DesktopReadingButton";
import ReportDialog from "@/components/ReportDialog";
import { mangaService } from "./_services/mangaService";
import dynamic from "next/dynamic";

const CollectionDialog = dynamic(() => import("./_components/CollectionDialog"))

export default function DesktopMangaPage() {
    const manga = useAppSelector(state => state.mangaPage.manga)

    const similar = useAppSelector(state => state.mangaPage.similar);

    const [reportDialogOpen, setReportDialogOpen] = useState(false);

    const [collectionsDialogOpen, setCollectionsDialogOpen] = useState(false)

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
                                    onClick={() => setCollectionsDialogOpen(true)}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    fullWidth
                                    color="secondary"
                                    disableRipple
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
                                        {manga.type?.name} / {manga.year} / {manga.status?.name}
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
                                <DesktopReadingButton />
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
                                        <DesktopSections />
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
            <ReportDialog
                open={reportDialogOpen}
                onClose={() => setReportDialogOpen(false)}
                onSend={async (data) => {
                    await mangaService.reportManga(manga, data.reportType, data.comment)
                }}
            />
            <CollectionDialog
                open={collectionsDialogOpen}
                onClose={() => setCollectionsDialogOpen(false)}
            />
        </>
    )
}