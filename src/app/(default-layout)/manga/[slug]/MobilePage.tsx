"use client"

import theme from "@/constants/themes/main.theme";
import { Box, IconButton, Typography } from "@mui/material";
import Poster from "@/components/poster/Poster";
import { useRouter } from "next/navigation";
import Stats from "@/features/manga/components/Stats";
import Metadata from "@/features/manga/components/Metadata";
import ReadingButton from "./_components/ReadingButton";
import { Manga } from "@/types/manga";
import MobileSections from "./_components/mobile/MobileSections";
import Header from "./_components/mobile/Header";


export default function MobilePage({
    manga
}: {
    manga: Manga
}) {
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