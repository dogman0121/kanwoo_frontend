"use client"

import EditHeader from "@/features/edit/components/EditHeader"
import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { setStudioPageTranslationChapters } from "@/lib/state/features/studioPage/studioPageTranslationSlice"
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/state/hooks"
import { ROUTES } from "@/routes"
import Chapter from "@/types/chapter/chapter"
import { Box, Button, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { useRef, useState } from "react"
import CreateChapterDialog, { ChapterCreateForm, convertSchemaToFormData } from "./_components/CreateChapterDialog"
import { setStudioPageChapter } from "@/lib/state/features/studioPage/studioPageChapterSlice"

export default function Page() {
    const store = useAppStore()

    const [createDialogOpen, setCreateDialogOpen] = useState(false)

    const translation = useAppSelector(state => state.studioPageTranslation.translation)    

    const dispatch = useAppDispatch()
    const chapters = useAppSelector(state => state.studioPageTranslation.chapters)

    const initialized = useRef(false);

    const handleAddChapter = async(data: ChapterCreateForm) => {
        if (!translation) return;
        
        const formData = convertSchemaToFormData(data)

        const response = await clientFetch.post<Chapter>(`/studio/translations/${translation.id}/chapters`, {
            body: formData
        })
        
        if (chapters)
            dispatch(setStudioPageTranslationChapters([response.data, ...chapters]))
        else
            dispatch(setStudioPageTranslationChapters([response.data]))

        setCreateDialogOpen(false)
    }

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
                    <Button
                        variant="contained"
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        Создать    
                    </Button>  
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
                    <Link href={ROUTES.STUDIO.CHAPTER.MAIN(chapter.id)} key={`chapter_${chapter.id}`}>
                        <Paper
                            sx={{
                                boxShadow: "none",
                                borderRadius: "8px",

                                p: "10px 15px",
                                
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <Typography>
                                    {chapter.chapter}
                                </Typography>
                                <Typography
                                    sx={{
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    }}
                                >{chapter.name}</Typography>
                            </Box>
                            <Typography>
                                {new Date(chapter.created_at).toLocaleDateString()}
                            </Typography>
                        </Paper>
                    </Link>
                ))}
            </EditPageContainer>
            <CreateChapterDialog 
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSend={handleAddChapter}
            />
        </>
    )
}