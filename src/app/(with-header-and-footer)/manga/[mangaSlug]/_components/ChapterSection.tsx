"use client"

import { clientFetch } from "@/lib/fetch/clientFetch"
import { useAppSelector } from "@/lib/state/hooks"
import Chapter from "@/types/chapter/chapter"
import Translation from "@/types/translation/translation"
import { Avatar, Box, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import Link from "next/link"
import { MouseEvent, useEffect, useState } from "react"

export default function ChaptersSection() {
    const translations = useAppSelector(state => state.mangaPage.translations)

    const [currTranslation, setCurrTranslation] = useState<Translation | null>(null)

    const [translationChapters, setTranslationChapters] = useState<Chapter[]>([]);

    const handleTranslation = (_event: MouseEvent<HTMLElement>, newTranslation: Translation) => {
        setCurrTranslation(newTranslation)
    }

    useEffect(() => {
        setCurrTranslation(translations.find(t => t.is_official) || translations?.[0] || null)
    }, [translations])

    useEffect(() => {
        if (!currTranslation) return;

        clientFetch.get<Chapter[]>(`/translations/${currTranslation.id}/chapters`)
            .then(data => {
                setTranslationChapters(data.data)
            })
    }, [currTranslation])
    
    return (
        <>
            {currTranslation ?
                <>
                    {!currTranslation.is_official && (
                        <ToggleButtonGroup
                            exclusive
                            onChange={handleTranslation}
                            value={currTranslation}

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
                    )}
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
                            {translationChapters.map(chapter => (
                                <Paper
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
                                        <Typography
                                            sx={{
                                                "&:hover": {
                                                    textDecoration :"underline"
                                                }
                                            }}
                                        >
                                            Глава {chapter.chapter}
                                        </Typography>
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