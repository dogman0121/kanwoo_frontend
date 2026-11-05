import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useAppDispatch } from "@/lib/state/hooks"
import CreateChapterForm, { ChapterCreateFormSchema, useCreateForm } from "../forms/CreateChapterForm"

export default function CreateChapterDialog({ 
    open, 
    onSubmit, 
    onClose 
}: {
    open: boolean,
    onSubmit?: (data: ChapterCreateFormSchema) => Promise<void>,
    onClose?: () => void
}) {
    const methods = useCreateForm();

    const { isSubmitting, isValid } = methods.formState; // Читаем свойства ЯВНО

    console.log(isSubmitting, isValid)

    return (
        <Dialog open={open} onClose={onClose} sx={{ "& .MuiDialog-paper": { width: "960px", maxWidth: "none" } }}>
            <DialogTitle>Создание главы</DialogTitle>
            <DialogContent>
                {/* Просто передаем methods */}
                <CreateChapterForm
                    onSubmit={onSubmit}
                    methods={methods}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>Отмена</Button>
                <Button
                    variant="contained"
                    type="submit"
                    form="chapter-info"
                    loading={isSubmitting}
                    disabled={!isValid}
                >
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    )
}
