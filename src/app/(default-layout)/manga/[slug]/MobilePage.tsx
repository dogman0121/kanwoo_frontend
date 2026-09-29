"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import theme from "@/constants/themes/main.theme";
import { Box, IconButton, Typography } from "@mui/material";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Poster from "@/components/poster/Poster";
import { useEffect, useState } from "react";
import MobileOptions from "./_components/mobile/MobileOptions";
import { useRouter } from "next/navigation";
import Stats from "@/features/manga/components/Stats";
import { selectManga, selectSection, setSection } from "@/lib/state/features/manga-page/page/slice";
import Metadata from "@/features/manga/components/Metadata";
import ReadingButton from "./_components/ReadingButton";
import { AppTab, AppTabContext, AppTabList, AppTabPanel } from "@/components/AppTabs";
import Description from "@/features/manga/components/Description";
import Genres from "@/features/manga/components/Genres";
import NameTranslations from "@/features/manga/components/NameTranslations";
import Similar from "./_components/Similar";
import ChaptersSection from "./_components/ChapterSection";
import CommentsPreview from "./_components/mobile/CommentsPreview";
import { Manga } from "@/types/manga";


export default function MobilePage({
    manga
}: {
    manga: Manga
}) {
    const dispatch = useAppDispatch()
    
    const section = useAppSelector(selectSection)
    const [optionsOpen, setOptionsOpen] = useState(false)
    const router = useRouter()

    const handleChangeSection = (_event: React.SyntheticEvent, newValue: string) => {
        dispatch(setSection(newValue));
    };

    useEffect(() => {
        if (!manga) 
            return () => {};

        navigator.sendBeacon(`/api/manga/${manga.slug}/views`)

    }, [manga])

    if (!manga)
        return

    const backgroundURL = manga.background ?? manga.poster.medium 
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
                        background: `
                            linear-gradient(rgba(${backgroundColor} / 0.6), 
                            rgba(${backgroundColor} / 1)), 
                            url('${backgroundURL}')
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundPositionY: "0"
                    }}
                >
                    <Box
                        sx={{
                            height: "34px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <IconButton
                            color="inherit"
                            onClick={() => router.back()}
                        >
                            <WestRoundedIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={() => setOptionsOpen(true)}
                        >
                            <MoreVertRoundedIcon />
                        </IconButton>
                    </Box>
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
                            src={manga.poster.medium}
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
                            status={manga.status}
                            type={manga.type}
                            year={manga.year}
                        />
                        <Typography
                            variant="h1"
                            textAlign={"center"}
                        >
                            {manga?.name}
                        </Typography>
                    </Box>
                    <Stats 
                        views={manga.stats.views} 
                        saves={manga.stats.saves} 
                        size="small" 
                        sx={{mt: 2}}
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
                    <AppTabContext value={section}>
                        <AppTabList onChange={handleChangeSection}>
                            <AppTab label="Информация" value={"info"}/>
                            <AppTab label="Главы" value={"chapters"} />
                        </AppTabList>
                        <AppTabPanel value={"info"}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: 3
                                }}
                            >
                                <CommentsPreview />
                                <Description description={manga.description} />
                                <Genres genres={manga.genres}/>
                                <NameTranslations nameTranslations={manga.name_translations} />
                                <Similar />
                            </Box>
                        </AppTabPanel>
                        <AppTabPanel value={"chapters"}>
                            <ChaptersSection />
                        </AppTabPanel>
                    </AppTabContext>
                </Box>
                
            </Box>
            <MobileOptions 
                open={optionsOpen}
                onClose={() => setOptionsOpen(false)}
            />
        </>
    )
}