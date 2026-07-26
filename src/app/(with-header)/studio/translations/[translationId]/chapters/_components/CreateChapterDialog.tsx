import ChapterChapter from "@/app/(with-header)/studio/_features/chapter/ChapterChapter"
import ChapterName from "@/app/(with-header)/studio/_features/chapter/ChapterName"
import ChapterPages from "@/app/(with-header)/studio/_features/chapter/ChapterPages"
import ChapterPrivacy from "@/app/(with-header)/studio/_features/chapter/ChapterPrivacy"
import AppSnackbar from "@/components/AppSnackbar"
import { Privacy } from "@/components/PrivacySelect"
import { EditFile } from "@/features/edit/components/EditMultipleFilesInput"
import EditPageContainer from "@/features/edit/components/EditPageContainer"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

export interface ChapterCreateForm {
    chapter: number,
    name: string,
    privacy: number,
    pages: EditFile[],
}

export function convertSchemaToFormData(data: ChapterCreateForm) {
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

    return formData
}


export default function CreateChapterDialog({
    open, 
    onClose,
    onSend,
    ...props
}: DialogProps & {onSend: (data: ChapterCreateForm) => void}) {
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

    const onSubmit = async (data: ChapterCreateForm) => {
        try {
            await onSend(data)

            setSuccessSnackbarOpen(true)
        } catch(e) {
            setErrorSnackbarOpen(true)
        }
    }

    const { 
        control,
        reset, 
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

    useEffect(() => {
        return () => {
            reset()
        }
    }, [open])


    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                {...props}
                sx={{
                    "&  .MuiDialog-paper": {
                        maxWidth: "1200px",
                        width: "100%",
                        height: "80%",   
                    }
                }}
            >
                <DialogTitle>Создание главы</DialogTitle>
                <DialogContent>
                    <form id="chapter-info" onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            sx={{
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
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => onClose?.({}, "backdropClick")}
                        variant="outlined"
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        form="chapter-info"
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                variant="success"
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message="Манга успешно добавлена"
            />
            <AppSnackbar 
                variant="error"
                open={errorSnackbarOpen}
                onClose={() => setErrorSnackbarOpen(false)}
                message="При добавлении манги произошла ошибка"
            />
        </>
    )
}