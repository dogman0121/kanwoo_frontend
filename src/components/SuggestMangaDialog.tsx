"use client"

import { clientFetch } from "@/lib/fetch/clientFetch";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import AppSnackbar from "./AppSnackbar";
import { Controller, useForm } from "react-hook-form";

export interface SuggestMangaForm {
    name: string,
    link: string,
    comment: string
}

export default function SuggestMangaDialog({onClose, ...props}: Omit<DialogProps, "children">) {

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

    const {handleSubmit, control, formState: {errors}} = useForm<SuggestMangaForm>({
        mode: "onChange"
    })

    const handleSuggest = async (data: SuggestMangaForm) => {
        await clientFetch.post("/manga/suggest", {
            body: JSON.stringify({
                name: data.name,
                link: data.link,
                comment: data.comment
            })
        })

        setSuccessSnackbarOpen(true)
        onClose?.({}, "escapeKeyDown")
    } 
    
    return (
        <>
            <Dialog onClose={onClose} {...props}>
                <DialogTitle>Предложение манги</DialogTitle>
                <DialogContent
                >
                    <form id="manga-suggest-form" onSubmit={handleSubmit(handleSuggest)}>
                        <Box
                            sx={{
                               display: "flex",
                                flexDirection: "column",
                                rowGap: "15px" 
                            }}
                        >
                            <Controller 
                                name="name"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({field}) => (
                                    <TextField
                                        required
                                        fullWidth 
                                        label="Название"
                                        helperText={ errors.name ? "Это поле должно быть запонено" : "Названиие манги" }
                                        error={errors.name ? true : false}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller 
                                name="link"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({field}) => (
                                    <TextField 
                                        fullWidth
                                        required
                                        label="Ссылка"
                                        type="url"
                                        helperText={ errors.link ? "Это поле должно быть заполнено" : "Ссылка на источник (MAL и др.)" }
                                        error={errors.link ? true : false}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller 
                                name="comment"
                                control={control}
                                render={({field}) => (
                                    <TextField 
                                        fullWidth
                                        label="Комментарий"
                                        helperText="Комментарий к тайтлу (все, что может быть полезно)"
                                        multiline
                                        rows={3}
                                        {...field}
                                    />
                                )}
                            />
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                        onClick={() => onClose?.({}, "escapeKeyDown")}
                    >
                        Отмена
                    </Button>
                    <Button 
                        variant="contained"
                        form="manga-suggest-form"
                        type="submit"
                    >
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message={"Предложение успешно зарегистрировано"}
                variant="success"
            />
        </>
    )
}