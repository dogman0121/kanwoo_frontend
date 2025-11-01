"use client"

import { useAppSelector, useAppStore } from "@/lib/state/hooks";
import theme from "@/theme";
import { Box, Typography } from "@mui/material";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Poster from "@/components/Poster";
import SectionsMobile from "./_components/SectionsMobile";
import Manga from "@/types/manga";
import { useRef } from "react";
import { setManga } from "@/lib/state/features/manga/mangaSlice";

export default function MangaPageMobile({manga}: {manga: Manga}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setManga(manga))
        initialized.current = true
    }

    // const similar = useAppSelector(state => state.manga.similar);

    return (
        <Box
            sx={{
                maxWidth: "720px",
                margin: "auto"
            }}
        >
            <Box
                sx={{
                    p: "10px 15px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    width: "100%",
                    zIndex: "-1",
                    background: `
                        linear-gradient(rgba(${theme.vars?.palette.background.defaultChannel} / 0.7), 
                        rgba(${theme.vars?.palette.background.defaultChannel} / 1)), 
                        url('${manga?.background}')
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
                    <WestRoundedIcon />
                    <MoreVertRoundedIcon />
                </Box>
                <Box
                    sx={{
                        margin: "15px auto 0",
                        minWidth: "160px",
                        maxWidth: "200px",
                        width: "50%"

                    }}
                >
                    <Poster 
                        src={manga?.poster.medium || ""}
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
                    <Typography
                        sx={{
                            lineHeight: "1.2",
                        }}
                    >
                        {manga?.type.name} / {manga?.year} / {manga?.status.name}
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: "1.2",
                            fontSize: "24px",
                            fontWeight: "600",
                            mt: "5px",
                            textAlign: "center"
                        }}
                    >
                        {manga?.name}
                    </Typography>
                </Box>
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
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <BookmarkBorderRoundedIcon 
                            sx={{
                                width: "18px",
                                height: "18px",
                                mr: "3px"
                            }}
                        /> 
                        {0} сохранений
                    </Typography>
                    <Typography 
                        variant="caption"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <VisibilityOutlinedIcon 
                            sx={{
                                width: "18px",
                                height: "18px",
                                mr: "3px"
                            }}
                        /> 
                        {manga?.views} просмотров
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    p: "0 15px 15px",
                    mt: "20px"
                }}
            >
                <SectionsMobile />
            </Box>
            
        </Box>
    )
}