import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import AppSnackbar from "@/components/AppSnackbar"
import { useState } from "react"
import CreateTranslationForm, { useCreateForm } from "../forms/CreateTranslationForm"
import { StudioTranslation } from "../types/studio-translation.type"

export default function CreateTranslationDialog({
    open,
    isOfficial,
    onCreate,
    onClose
}: {
    open: boolean,
    isOfficial?: boolean,
    onCreate?: (translation: StudioTranslation) => void,
    onClose?: () => void
}) {
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

    const {formState, ...formProps} = useCreateForm()

    const handleCreate = (translation: StudioTranslation) => {
        setSuccessSnackbarOpen(true)
        onCreate?.(translation)
    }

    const handleError = () => {

    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Создание перевода</DialogTitle>
                <DialogContent>
                    <CreateTranslationForm 
                        onCreate={handleCreate}
                        onError={handleError}
                        isOfficial
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
            <AppSnackbar 
                variant="error"
                open={errorSnackbarOpen}
                onClose={() => setErrorSnackbarOpen(false)}
                message="При создании перевода произошла ошибка"
            />
        </>
    )
}