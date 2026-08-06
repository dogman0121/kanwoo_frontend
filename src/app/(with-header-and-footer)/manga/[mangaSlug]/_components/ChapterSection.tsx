"use client"

import WrappedText from "@/components/WrapperTypography"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { setMangaPageCurrentTranslation, setMangaPageTranslationChapters } from "@/lib/state/features/mangaPage/mangaSlice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import Chapter from "@/types/chapter/chapter"
import Translation from "@/types/translation/translation"
import { Avatar, Box, Button, IconButton, Paper, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { MouseEvent, useEffect } from "react"
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded"
import NotificationRoundedIcon from "@mui/icons-material/NotificationsRounded"

export default function ChaptersSection() {
    const dispatch = useAppDispatch()

    const translations = useAppSelector(state => state.mangaPage.translations)
    const currentTranslation = useAppSelector(state => state.mangaPage.currentTranslation)
    const chapters = useAppSelector(state => state.mangaPage.chapters)


    const handleTranslation = (_event: MouseEvent<HTMLElement>, newTranslation: Translation) => {
        if (newTranslation)
            dispatch(setMangaPageCurrentTranslation(newTranslation))
    }

    useEffect(() => {
        dispatch(setMangaPageCurrentTranslation(translations.find(t => t.is_official) || translations?.[0] || null))
    }, [translations])

    useEffect(() => {
        if (!currentTranslation || chapters[currentTranslation.id]) return;

        clientFetch.get<Chapter[]>(`/translations/${currentTranslation.id}/chapters`)
            .then(response => {
                dispatch(setMangaPageTranslationChapters({
                    translation: currentTranslation, 
                    chapters: response.data
                }))
            })
    }, [currentTranslation])

    return (
        <>
            {currentTranslation ?
                <>
                    {!currentTranslation.is_official ? (
                            <ToggleButtonGroup
                                exclusive
                                onChange={handleTranslation}
                                value={currentTranslation}

                                sx={{
                                    columnGap: 2,

                                    "& .MuiToggleButton-root": {
                                        display: "flex",
                                        flexDirection: "row",
                                        columnGap: 2,
                                        textAlign: "left",

                                        px: 2,

                                        borderRadius: "8px",
                                        borderLeft: 0,
                                        borderRight: 0,
                                        borderTop: 0,
                                        borderBottom: 0,

                                        textTransform: "none"
                                    }
                                }}
                            >
                                {translations.map(translation => (
                                    <ToggleButton
                                        size={"small"}
                                        value={translation}
                                        key={`manga_page_translation_${translation.id}`}  
                                    >
                                        <Avatar src={translation.owner.avatar}/>
                                        <Box>
                                            <Typography>{translation.owner.name}</Typography>
                                            <Typography variant="caption">Кол-во глав: {translation.chapters_count}</Typography>
                                        </Box>
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        )
                        :
                        (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    size="small"
                                    endIcon={<NotificationRoundedIcon />}
                                >
                                    Уведомления вкл.
                                </Button>
                            </Box>
                        )
                    }
                    <Box
                        sx={{
                            mt: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Typography>Список глав</Typography>
                            <Box>
                                <Tooltip title="Сортировать">
                                    <IconButton size="small">
                                        <SwapVertRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                mt: "10px",

                                display: "flex",
                                flexDirection: "column",
                                gap: "5px"
                            }}
                        >
                            {chapters[currentTranslation.id]?.map(chapter => (
                                <Paper
                                    elevation={3}
                                    key={`chapter_${chapter.id}`}
                                    sx={{
                                        borderRadius: "12px",
                                        boxShadow: "none",
                                        p: "10px 25px",

                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Link href={`/chapters/${chapter.id}`}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                columnGap: 2
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                Глава {chapter.chapter}
                                            </Typography>
                                            {chapter.name && (
                                                <WrappedText
                                                    lines={1}
                                                    variant="caption"
                                                >
                                                    {chapter.name}
                                                </WrappedText>
                                            )}
                                        </Box>
                                    </Link>
                                    <Typography>
                                        {new Date(chapter.created_at).toLocaleDateString()}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                </>
                :
                <>
                    <Typography
                        sx={{
                            fontSize: "20px",
                            mt: "25px",
                            textAlign: "center",
                            px: "10px"
                        }}
                    >
                        Тут пусто
                    </Typography>
                </>
            }        
        </>
    )
}