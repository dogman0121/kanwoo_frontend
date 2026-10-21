import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useAppDispatch } from "@/lib/state/hooks"
import CreateChapterForm, { ChapterCreateFormSchema, useCreateForm } from "../forms/CreateChapterForm"

export default function CreateChapterDialog({
    open,
    onCreate,
    onClose
}: {
    open: boolean,
    onCreate?: (data: ChapterCreateFormSchema) => void,
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
                <DialogTitle>Создание главы</DialogTitle>
                <DialogContent>
                    <CreateChapterForm
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
                        form="chapter-info"
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