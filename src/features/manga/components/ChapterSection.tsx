"use client"

import WrappedText from "@/components/WrapperTypography"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Avatar, Box, Button, IconButton, Paper, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { MouseEvent, useEffect, useState, useTransition } from "react"
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded"
import NotificationRoundedIcon from "@mui/icons-material/NotificationsRounded"
import { selectManga } from "@/features/manga/states/manga-page/page/slice"
import { fetchChapters, fetchTranslations, reverseChapters, setCurrTranslation, subscribeTranslation } from "@/features/manga/states/manga-page/translations/slice"
import { selectCurrTranslation, selectCurrTranslationChapters, selectCurrTranslationId, selectTranslationById, selectTranslationChaptersError, selectTranslationChaptersLoaded, selectTranslationIsSubscribed, selectTranslations, selectTranslationsError, selectTranslationsLoaded } from "@/features/manga/states/manga-page/translations/selectors"
import { Chapter } from "@/types/chapter"
import LoadingBox from "@/components/LoadingBox"


function ErrorMessage({
    message,
    buttonDisabled = false,
    loading,
    onClick
}: {
    message: string,
    buttonDisabled?: boolean,
    loading?: boolean
    onClick?: () => void
}) {
    return (
        <Box
            sx={{
                mt: 10,

                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Typography color="textSecondary" >{message}</Typography>
            <Button 
                variant="contained"
                color="primary"
                onClick={() => onClick?.() }
                loading={loading}
                sx={{
                    mt: 2
                }}    
            >
                Обновить
            </Button>
        </Box>
    )
}

function NoChapters(){
    return (
        <Typography
            color="textSecondary"
            sx={{
                my: 5,
                textAlign: "center",
                px: "10px"
            }}
        >
            Нет глав
        </Typography>
    )
}

function ChapterItem({chapter}: {chapter: Chapter}) {
    return (
        <Box
            key={`chapter_${chapter.id}`}
            sx={[
                {
                    bgcolor: "#e7e7e7",
                    borderRadius: "12px",
                    boxShadow: "none",
                    p: "10px 25px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                },
                (theme) => theme.applyStyles("dark", {
                    backgroundColor: "#2d2d2d"
                })
            ]}
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
        </Box>
    )
}

function ChaptersListHeader() {
    const dispatch = useAppDispatch()

    const currentTranslation = useAppSelector(selectCurrTranslation)

    const handleReverse = () => {
        if (!currentTranslation) return

        dispatch(reverseChapters(currentTranslation.data.id))
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

    const [isLoading, setIsLoading] = useTransition()

    const currentTranslation = useAppSelector(selectCurrTranslation)
    const error = useAppSelector((state) => selectTranslationChaptersError(state, currentTranslation?.data.id))
    const loaded = useAppSelector((state) => selectTranslationChaptersLoaded(state, currentTranslation?.data.id))
    const chapters = useAppSelector(selectCurrTranslationChapters)

    const loadChapters = () => {
        if (!currentTranslation) return

        dispatch(fetchChapters(currentTranslation.data.id))
    }

    useEffect(() => {
        if (currentTranslation && !loaded){
            loadChapters()
        }

        return () => {}
    }, [currentTranslation, loaded])

    if (error === "api_error"){
        return (
            <ErrorMessage 
                message="При отправке запроса произошла ошибка. Попробуйте позже."
            />
        )
    }

    if (error === "no_internet") {
        return (
            <ErrorMessage 
                message='Произошла ошибка. Проверьте соединение с интернетом и нажмите "Обновить"'
            />
        )
    }

    if (loaded && chapters?.length == 0)
        return <NoChapters />

    return (
        <LoadingBox loading={isLoading}>
            <Box
                sx={{
                    mt: 2,

                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}
            >
                { chapters?.map(chapter => (
                    <ChapterItem chapter={chapter.data} key={`manga_page_chapter_${chapter.data.id}`}/>
                ))}
            </Box>
        </LoadingBox>
    )
}

function TranslationToggleButton({translationId}: {translationId: number}) {

    const translation = useAppSelector(state => selectTranslationById(state, translationId))

    return (
        <ToggleButton
            size={"small"}
            value={translationId}
        >
            <Avatar src={translation.data.owner.avatar}/>
            <Box>
                <Typography>{translation.data.owner.name}</Typography>
                <Typography variant="caption">Кол-во глав: {translation.data.chapters_count}</Typography>
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
                <TranslationToggleButton 
                    translationId={translation.data.id} 
                    key={`manga_page_translation_${translation.data.id}`}
                />
            ))}
        </ToggleButtonGroup>
    )
}

function SubscribeButton() {
    const dispatch = useAppDispatch()
    
    const currTranslation = useAppSelector(selectCurrTranslation)    
    const isSubscribed = useAppSelector((state) => {
        if (!currTranslation) return null

        return selectTranslationIsSubscribed(state, currTranslation.data.id)
    })

    const handleSubscribe = () => {
        if (!currTranslation) return

        dispatch(subscribeTranslation(currTranslation.data.id))
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
    
    const [isLoading, setIsLoading] = useTransition()

    const manga = useAppSelector(selectManga)
    
    const loaded = useAppSelector(selectTranslationsLoaded)
    const error = useAppSelector(selectTranslationsError)

    const loadTranslations = () => {
        if (!manga) return

        setIsLoading(() => {
            dispatch(fetchTranslations(manga.data.slug))
        })
    }

    useEffect(() => {
        if (!loaded)
            loadTranslations()
    }, [manga, loaded])

    const currentTranslation = useAppSelector(selectCurrTranslation)

    if (error === "api_error") {
        return (
            <ErrorMessage 
                loading={isLoading}
                message="При получении данных произошла ошибка. Попробуйте позже"
            />
        )
    }

    if (error === "no_internet") {
        return (
            <ErrorMessage 
                loading={isLoading}
                message='Произошла ошибка. Проверьте соединение с интернетом и нажмите "Обновить"'
                onClick={() => loadTranslations()}
            />
        )
    }

    if (loaded && !currentTranslation)
        return <NoChapters />

    return (
        <LoadingBox loading={isLoading}>
            {!currentTranslation?.data.is_official && (
                <TranslationToggleButtonGroup/>  
            )}
            <ChaptersListHeader />
            <ChaptersList/>   
        </LoadingBox>
    )
}