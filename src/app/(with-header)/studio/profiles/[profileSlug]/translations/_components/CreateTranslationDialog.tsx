"use client"

import AppSnackbar from "@/components/AppSnackbar";
import MangaSelectWithSearch from "@/components/MangaSelectWithSearch";
import PrivacySelect, { Privacy } from "@/components/PrivacySelect";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { setStudioPageProfileTranslations } from "@/lib/state/features/studioPage/studioPageProfileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import Manga from "@/types/manga/manga";
import Translation from "@/types/translation/translation";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface CreateTranslationForm {
    manga: Manga | null,
    name: string,
    privacy: number
}

export default function CreateTranslationDialog({
    onClose,
    ...props
}: DialogProps){
    const dispatch = useAppDispatch()
    const translations = useAppSelector(state => state.studioPageProfile.translations || [])
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

    const profile = useAppSelector(state => state.studioPageProfile.profile)

    const {control, handleSubmit, setValue, reset} = useForm<CreateTranslationForm>({
        defaultValues: {
            manga: null,
            name: "",
            privacy: Privacy.PRIVATE
        }
    })

    const onSubmit = async (data: CreateTranslationForm) => {
        try {
            if (!data.manga || !profile) return;

            const res = await clientFetch.post<Translation>(`/studio/profiles/${profile.slug}/translations`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    manga: data.manga.id,
                    name: data.name,
                    privacy: data.privacy
                })
            })

            dispatch(setStudioPageProfileTranslations([...translations, res.data]))
            onClose?.({}, "escapeKeyDown")
            reset()
        } catch (e) {
            setErrorSnackbarOpen(true)
        }
    }

    return (
        <>
            <Dialog
                onClose={onClose}
                {...props}
            >
                <DialogTitle>Создание перевода</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} id="create-translation">
                        <Controller
                            name="manga"
                            control={control} 
                            rules={{
                                required: true,
                            }}
                            render={({field: {value, onChange}}) => (
                                <MangaSelectWithSearch 
                                    value={value}
                                    onChange={(value: Manga | null) => setValue("manga", value)}
                                />
                            )}  
                        />
                        <Controller
                            name="name"
                            control={control} 
                            render={({field}) => (
                                <TextField 
                                    fullWidth
                                    label="Название"
                                    sx={{
                                        mt: 3
                                    }}
                                    {...field}
                                />
                            )}  
                        />
                        <Controller
                            name="privacy"
                            control={control} 
                            render={({field: {value, onChange}}) => (
                                <PrivacySelect
                                    value={value}
                                    onChange={onChange}
                                />
                            )}  
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => onClose?.({}, "backdropClick")}
                    >
                        Отменить
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        form="create-translation"
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                open={errorSnackbarOpen}
                onClose={() => setErrorSnackbarOpen(false)}
                variant="error"
                message="При отправке запроса произошла ошибка."
            />
            <AppSnackbar 
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                variant="error"
                message="Перевод успешно добавлен."
            />
        </>
    )
}