"use client"

import EditHeader from "@/features/edit/components/EditHeader"
import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { setStudioPageTranslationChapters } from "@/lib/state/features/studioPage/studioPageTranslationSlice"
import { useAppSelector, useAppStore } from "@/lib/state/hooks"
import { ROUTES } from "@/routes"
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
        clientFetch.get<Chapter[]>(`/studio/translations/${translation.id}/chapters`).then((response) => {
            store.dispatch(setStudioPageTranslationChapters(response.data))
        })
    }

    if (!translation) return

    return (
        <>
            <EditHeader>
                Главы
            </EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Link
                            href={ROUTES.STUDIO.TRANSLATION.CHAPTERS.CREATE(translation.id)}
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
                    <Paper
                        key={`chapter_${chapter.id}`}
                        sx={{
                            boxShadow: "none",
                            borderRadius: "8px",
                            p: "10px 15px",
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "20px"
                        }}
                    >

                        <Link
                            href={ROUTES.STUDIO.CHAPTER.MAIN(chapter.id)}
                        >
                            <Typography>{chapter.chapter}</Typography>
                            <Typography
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                            >{chapter.name}</Typography>
                        </Link>
                    </Paper>
                ))}
            </EditPageContainer>
        </>
    )
}