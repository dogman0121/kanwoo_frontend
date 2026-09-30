"use client"

import WrappedText from "@/components/WrapperTypography"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Avatar, Box, Button, IconButton, Paper, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { MouseEvent, useEffect, useState } from "react"
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded"
import NotificationRoundedIcon from "@mui/icons-material/NotificationsRounded"
import { selectManga } from "@/features/manga/states/manga-page/page/slice"
import { fetchChapters, fetchTranslations, reverseChapters, setCurrTranslation, subscribeTranslation } from "@/features/manga/states/manga-page/translations/slice"
import { selectCurrentTranslationChaptersIsLoading, selectCurrTranslation, selectCurrTranslationChapters, selectCurrTranslationId, selectCurrTranslationIsSubscribed, selectIsLoaded, selectIsLoading, selectTranslationBlockById, selectTranslationById, selectTranslations } from "@/features/manga/states/manga-page/translations/selectors"
import { Chapter } from "@/types/chapter"


function NoChapters(){
    return (
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
    )
}

function ChapterItem({chapter}: {chapter: Chapter}) {
    return (
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
                        columnGap: 4,
                        alignItems: "center"
                    }}
                >
                    <Typography
                        sx={{
                            whiteSpace: "nowrap",

                            lineHeight: 1,
                            fontWeight: 600,
                            fontSize: "20px",
                            fontStyle: "italic"
                        }}
                    >
                        {chapter.chapter}
                    </Typography>
                    <WrappedText
                        lines={1}
                        variant="caption"
                        color="textSecondary"
                        lineHeight={1}
                    >
                        {chapter.name ? chapter.name : "Без названия"}
                    </WrappedText>
                </Box>
            </Link>
            <Typography
                variant="caption"
                color="textSecondary"
            >
                {new Date(chapter.created_at).toLocaleDateString()}
            </Typography>
        </Paper>
    )
}

function ChaptersListHeader() {
    const dispatch = useAppDispatch()

    const currentTranslation = useAppSelector(selectCurrTranslation)

    const handleReverse = () => {
        if (!currentTranslation) return

        dispatch(reverseChapters(currentTranslation.id))
    }

    return (
        <Box
            sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Typography>Список глав</Typography>
            {/* Панелька сортировки */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1
                }}
            >
                <SubscribeButton />
                <Tooltip title="Сортировать">
                    <IconButton 
                        size="small"
                        onClick={handleReverse}
                    >
                        <SwapVertRoundedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

function ChaptersList() { 
    const dispatch = useAppDispatch()

    const currentTranslation = useAppSelector(selectCurrTranslation)
    const isLoading = useAppSelector(selectCurrentTranslationChaptersIsLoading)
    const chapters = useAppSelector(selectCurrTranslationChapters)

    useEffect(() => {
        if (currentTranslation && !isLoading && chapters == undefined){
            dispatch(fetchChapters(currentTranslation.id))
        }

        return () => {}
    }, [currentTranslation, isLoading, chapters])

    if (!chapters || !currentTranslation) return

    return (
        <Box
            sx={{
                mt: 2,

                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
        >
            { chapters.map(chapter => (
                <ChapterItem chapter={chapter} key={`manga_page_chapter_${chapter.id}`}/>
            ))}
        </Box>
    )
}

function TranslationToggleButton({translationId}: {translationId: number}) {

    const translation = useAppSelector(state => selectTranslationById(state, translationId))

    return (
        <ToggleButton
            size={"small"}
            value={translationId}
        >
            <Avatar src={translation.owner.avatar}/>
            <Box>
                <Typography>{translation.owner.name}</Typography>
                <Typography variant="caption">Кол-во глав: {translation.chapters_count}</Typography>
            </Box>
        </ToggleButton>
    )
}

function TranslationToggleButtonGroup() {
    const dispatch = useAppDispatch()

    const translations = useAppSelector(selectTranslations)
    const currTranslationId = useAppSelector(selectCurrTranslationId)

    const handleChangeTranslation = (_event: MouseEvent, value: number) => {
        dispatch(setCurrTranslation(value))
    }

    return (
        <ToggleButtonGroup
            exclusive
            value={currTranslationId}
            onChange={handleChangeTranslation}

            sx={{
                columnGap: 2,

                "& .MuiToggleButton-root": {
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 2,
                    textAlign: "left",

                    px: 2,
                    py: 1,

                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
                    borderBottom: 0,
                    borderRadius: 2,

                    textTransform: "none"
                }
            }}
        >
            {translations.map(translation => (
                <TranslationToggleButton translationId={translation.id} key={`manga_page_translation_${translation.id}`}/>
            ))}
        </ToggleButtonGroup>
    )
}

function SubscribeButton() {
    const dispatch = useAppDispatch()
    
    const currTranslation = useAppSelector(selectCurrTranslation)    
    const isSubscribed = useAppSelector(selectCurrTranslationIsSubscribed)

    const handleSubscribe = () => {
        if (!currTranslation) return

        dispatch(subscribeTranslation(currTranslation.id))
    }

    if (!currTranslation) return null

    return (
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
                onClick={handleSubscribe}
            >
                Уведомления {isSubscribed ? "вкл" : "выкл"}
            </Button>
        </Box>
    )
}

export default function ChaptersSection() {
    const dispatch = useAppDispatch()
    
    const manga = useAppSelector(selectManga)

    const loaded = useAppSelector(selectIsLoading)
    const loading = useAppSelector(selectIsLoaded) 

    useEffect(() => {
        if (manga && !loaded && !loading) {
            dispatch(fetchTranslations(manga.slug))
        }
    }, [manga])

    const currTranslation = useAppSelector(selectCurrTranslation)

    if (!currTranslation)
        return <NoChapters />

    return (
        <>
            {!currTranslation.is_official && (
                <TranslationToggleButtonGroup/>  
            )}
            <ChaptersListHeader />
            <ChaptersList/>   
        </>
    )
}