import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import AppSnackbar from "@/components/AppSnackbar"
import { useState } from "react"
import CreateTranslationForm, { MangaTranslationCreateFormSchema, useCreateForm } from "../forms/CreateMangaTranslationForm"
import { StudioTranslation } from "../types/studio-translation.type"
import { ApiError } from "@/lib/fetch/api-response.types"
import { useAppDispatch } from "@/lib/state/hooks"
import { openSnackbar } from "@/features/global/states/app/slice"
import { setCreateTranslationDialogOpen } from "../states/profile/page.slice"
import CreateMangaTranslationForm from "../forms/CreateMangaTranslationForm"

export default function CreateMangaTranslationDialog({
    open,
    onCreate,
    onClose
}: {
    open: boolean,
    onCreate?: (data: MangaTranslationCreateFormSchema) => void,
    onClose?: () => void
}) {
    const dispatch = useAppDispatch()

    const {formState, ...formProps} = useCreateForm()

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Создание перевода</DialogTitle>
                <DialogContent>
                    <CreateMangaTranslationForm 
                        onCreate={onCreate}
                        formState={formState}
                        {...formProps}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        form="create-translation"
                        loading={formState.isLoading}
                        disabled={!formState.isValid}
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}