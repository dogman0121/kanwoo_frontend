import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Create, { useCreateForm } from "../forms/CreateMangaForm"
import AppSnackbar from "@/components/AppSnackbar"
import { useState } from "react"
import { StudioManga } from "../types/studio-manga.type"

export default function CreateMangaDialog({
    open,
    onCreate,
    onClose
}: {
    open: boolean,
    onCreate?: (manga: StudioManga) => void,
    onClose?: () => void
}) {
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

    const {formState, ...formProps} = useCreateForm()

    const handleCreate = (manga: StudioManga) => {
        setSuccessSnackbarOpen(true)
        onCreate?.(manga)
    }

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
                        onCreate={handleCreate}
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
            <AppSnackbar 
                variant="success"
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message="Манга успешно добавлена"
            />
        </>
    )
}