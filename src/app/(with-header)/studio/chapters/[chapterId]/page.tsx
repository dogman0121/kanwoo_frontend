"use client"

import { Privacy } from "@/components/PrivacySelect"
import EditHeader from "@/features/edit/components/EditHeader"
import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import { EditFile } from "@/features/edit/components/EditMultipleFilesInput"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { useAppSelector } from "@/lib/state/hooks"
import Chapter from "@/types/chapter/chapter"
import { Button } from "@mui/material"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import ChapterChapter from "../../_features/chapter/ChapterChapter"
import ChapterName from "../../_features/chapter/ChapterName"
import ChapterPrivacy from "../../_features/chapter/ChapterPrivacy"
import ChapterPages from "../../_features/chapter/ChapterPages"
import { clientFetch } from "@/lib/fetch/clientFetch"

interface ChapterEditForm {
    name: string,
    chapter: number,
    privacy: Privacy,
    pages: EditFile[]
}

function convertToForm(chapter?: Chapter | null) {
    return {
        name: chapter?.name || "",
        chapter: chapter?.chapter || 1,
        privacy: chapter?.privacy.id || Privacy.PRIVATE,
        pages: chapter?.pages?.map(c => ({uuid: c.uuid, previewLink: c.link})) || [],
    }
}

export default function Page() {
    const chapter = useAppSelector(state => state.studioPageChapter.chapter)

    const { 
        control, 
        handleSubmit,
        setValue, 
        formState: {
            isValid, 
            isDirty, 
            defaultValues
        }, 
        reset 
    } = useForm<ChapterEditForm>({
        mode: "onChange",
        defaultValues: convertToForm(chapter)
    });

    const onSubmit = async (data: ChapterEditForm) => {
        if (!chapter) return;

        const formData = new FormData();

        const pages_order: string[] = [];

        formData.append("chapter", data.chapter.toString())
        formData.append("name", data.name)
        formData.append("privacy", data.privacy.toString())
        
        data.pages.forEach((p) => {
            if (p.file){
                formData.append("pages", p.file)
                pages_order.push(p.file.name)
            } else {
                pages_order.push(p.uuid)
            }
        })         
        formData.append("pages_order", JSON.stringify(pages_order))   

        const response = await clientFetch.put<Chapter>(`/studio/chapters/${chapter.id}`, {
            body: formData
        })

        reset(convertToForm(response.data))
    }

    useEffect(() => {
        reset(convertToForm(chapter))
    }, [chapter])
    
    return (
        <>
            <EditHeader>Основная информация</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="outlined"
                            disabled={!isDirty}
                            type="reset"
                            onClick={() => reset(defaultValues)}
                        >
                            Отменить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={(!isValid || !isDirty)}
                            type="submit"
                            form="chapter-info"
                        >
                            Сохранить
                        </Button>
                    </>
                }
            />
            <form id="chapter-info" onSubmit={handleSubmit(onSubmit)}>
                <EditPageContainer
                    sx={{
                        py: "20px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "15px"
                    }}
                >
                    <Controller 
                        name="chapter"
                        control={control}
                        render={({field}) => (
                            <ChapterChapter
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="name"
                        control={control}
                        render={({field}) => (
                            <ChapterName 
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name="privacy"
                        control={control}
                        render={({field}) => (
                            <ChapterPrivacy 
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name="pages"
                        control={control}
                        render={({field: {value, onChange}}) => (
                            <ChapterPages 
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                </EditPageContainer>
            </form>
        </>
    )
}