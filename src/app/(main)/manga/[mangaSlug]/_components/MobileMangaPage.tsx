"use client"

import { useAppSelector } from "@/lib/state/hooks";
import theme from "@/theme";
import { Box, IconButton, Typography } from "@mui/material";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Poster from "@/components/Poster";
import { useState } from "react";
import MobileOptions from "./MobileOptions";
import { useRouter } from "next/navigation";
import MobileSections from "./MobileSections";
import MobileReadingButton from "./MobileReadingButton";
import { mangaService } from "../_services/mangaService";

export default function MobileMangaPage() {
    const manga = useAppSelector(state => state.mangaPage.manga)

    const similar = useAppSelector(state => state.mangaPage.similar);

    const [optionsOpen, setOptionsOpen] = useState(false)

    const router = useRouter()

    if (!manga)
        return

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
                        p: "10px 10px 0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                        width: "100%",
                        zIndex: "-1",
                        background: `
                            linear-gradient(rgba(${theme.vars?.palette.background.defaultChannel} / 0.6), 
                            rgba(${theme.vars?.palette.background.defaultChannel} / 1)), 
                            url('${manga.background || manga.poster.small}')
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
                            margin: "10px auto 0",
                            minWidth: "160px",
                            maxWidth: "200px",
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
                        <Typography
                            sx={{
                                lineHeight: "1.2",
                            }}
                        >
                            {manga.type.name} / {manga.year} / {manga.status.name}
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
                            {manga.views} просмотров
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        px: "10px",
                        mt: "10px",
                        width: "100%"
                    }}
                >
                    <MobileReadingButton />
                </Box>
                <Box
                    sx={{
                        p: "0 10px 15px",
                        mt: "20px"
                    }}
                >
                    <MobileSections />
                </Box>
                
            </Box>
            <MobileOptions 
                open={optionsOpen}
                onClose={() => setOptionsOpen(false)}
            />
        </>
    )
}