"use client"

import EditHeader from "@/features/edit/components/EditHeader"
import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { setStudioPageTranslationChapters } from "@/lib/state/features/studioPage/studioPageTranslationSlice"
import { useAppSelector, useAppStore } from "@/lib/state/hooks"
import Chapter from "@/types/chapter/chapter"
import { Box, Button, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { useRef } from "react"

export default function Page() {
    const store = useAppStore()

    const translation = useAppSelector(state => state.studioPageTranslation.translation)    

    const chapters = useAppSelector(state => state.studioPageTranslation.chapters)
    const initialized = useRef(false);

    if (!initialized.current && translation) {
        initialized.current = true
        clientFetch.get<Chapter[]>(`/studio/translation/${translation.id}/getChapters`).then((response) => {
            store.dispatch(setStudioPageTranslationChapters(response.data))
        })
    }

    return (
        <>
            <EditHeader>
                Главы
            </EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Link
                            href={`/studio/translation/${translation?.id}/chapters/new`}
                        >
                            <Button
                                variant="contained"
                            >
                                Создать    
                            </Button> 
                        </Link>  
                    </>
                }
            />
            <EditPageContainer
                sx={{
                    py: "20px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px"
                }}
            >
                {chapters?.map(chapter => (
                    <Box
                        key={`chapter_${chapter.id}`}
                        sx={{
                            bgcolor: "background.paper",
                            borderRadius: "8px",
                            p: "10px 15px",
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "20px"
                        }}
                    >
                        <Typography>{chapter.chapter}</Typography>
                        <Link
                            href={`/studio/chapter/${chapter.id}`}
                        >
                            <Typography
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                            >{chapter.name}</Typography>
                        </Link>
                    </Box>
                ))}
            </EditPageContainer>
        </>
    )
}