import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Create, { MangaCreateFormSchema, useCreateForm } from "../forms/CreateMangaForm"
import AppSnackbar from "@/components/AppSnackbar"
import { useState } from "react"
import { StudioManga } from "../types/studio-manga.type"
import { useAppDispatch } from "@/lib/state/hooks"
import { openSnackbar } from "@/features/global/states/app/slice"
import { setCreateMangaDialogOpen } from "../states/profile/page.slice"

export default function CreateMangaDialog({
    open,
    onCreate,
    onClose
}: {
    open: boolean,
    onCreate?: (data: MangaCreateFormSchema) => void,
    onClose?: () => void
}) {
    const dispatch = useAppDispatch()

    const {formState, ...formProps} = useCreateForm()

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiDialog-paper": {
                        width: "960px",
                        maxWidth: "none"
                    },
                }}
            >
                <DialogTitle>Создание тайтла</DialogTitle>
                <DialogContent>
                    <Create 
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
                        form="manga-info"
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