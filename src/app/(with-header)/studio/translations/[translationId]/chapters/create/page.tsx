"use client"

import ChapterChapter from "@/app/(with-header)/studio/_features/chapter/ChapterChapter"
import ChapterName from "@/app/(with-header)/studio/_features/chapter/ChapterName"
import ChapterPages from "@/app/(with-header)/studio/_features/chapter/ChapterPages"
import ChapterPrivacy from "@/app/(with-header)/studio/_features/chapter/ChapterPrivacy"
import { Privacy } from "@/components/PrivacySelect"
import EditHeader from "@/features/edit/components/EditHeader"
import EditHeaderNav from "@/features/edit/components/EditHeaderNav"
import { EditFile } from "@/features/edit/components/EditMultipleFilesInput"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { clientFetch } from "@/lib/fetch/clientFetch"
import { useAppSelector } from "@/lib/state/hooks"
import { ROUTES } from "@/routes"
import Chapter from "@/types/chapter/chapter"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

interface ChapterCreateForm {
    chapter: number,
    name: string,
    privacy: number,
    pages: EditFile[],
}

export default function Page() {
    const translation = useAppSelector(state => state.studioPageTranslation.translation)
    const router = useRouter()

    const { 
        control, 
        handleSubmit, 
        setValue,
        formState: {
            isValid
        }, 
    } = useForm<ChapterCreateForm>({
        mode: "onChange",
        defaultValues: {
            chapter: 1,
            name: "",
            privacy: Privacy.PRIVATE,
            pages: [],
        }
    });

    const onSubmit = async (data: ChapterCreateForm) => {
        if (!translation) return;

        const formData = new FormData();

        const pages_order: string[] = [];

        formData.append("chapter", data.chapter.toString())
        formData.append("name", data.name)
        formData.append("privacy", data.privacy.toString())
        
        data.pages.forEach((p) => {
            if (p.file){
                formData.append("pages", p.file)
                pages_order.push(p.file.name)
            }
        })         
        formData.append("pages_order", JSON.stringify(pages_order))   

        const response = await clientFetch.post<Chapter>(`/studio/translations/${translation.id}/chapters`, {
            body: formData
        })

        router.push(ROUTES.STUDIO.CHAPTER.MAIN(response.data.id))
    }

    return (
        <>
            <EditHeader>Создание главы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Link
                            href={`/studio/translation/${translation?.id}/chapters`}
                        >
                            <Button
                                variant="outlined"
                            >
                                Отмена
                            </Button>
                        </Link>   
                        <Button
                            variant="contained"
                            disabled={!isValid}
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
                        render={({field: {value}}) => (
                            <ChapterPages 
                                value={value}
                                onChange={(value: EditFile[]) => setValue("pages", value)}
                            />
                        )}
                    />
                </EditPageContainer>
            </form>
        </>
    )
}