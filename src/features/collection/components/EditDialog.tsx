import PrivacySelect from "@/components/PrivacySelect";
import { useAppDispatch } from "@/lib/state/hooks";
import { Collection } from "@/types/collection";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { updateCollection } from "../states/lib/thunks";

export interface EditFormSchema {
    name: string,
    privacy: number
}

export default function EditDialog({
    collection,
    open,
    onClose,
    onUpdate
}: {
    collection: Collection,
    open: boolean,
    onClose: () => void,
    onUpdate?: (collection: Collection) => void
}) {
    const dispatch = useAppDispatch()

    const {control, handleSubmit} = useForm<EditFormSchema>({
        defaultValues: {
            name: collection.name,
            privacy: collection.privacy.id
        }
    })

    const onSubmit = (data: EditFormSchema) => {
        dispatch(updateCollection({
            collectionID: collection.id, 
            name: data.name, 
            privacyID: data.privacy
        })).unwrap()

        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Изменение коллекции</DialogTitle>
            <form id="update-collection" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: true
                    }}
                    render={({field}) => (
                        <TextField 
                            fullWidth
                            label="Название"
                            {...field}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="privacy"
                    render={({field: {value, onChange}}) => (
                        <PrivacySelect
                            value={value}
                            onChange={onChange}
                        /> 
                    )}
                /> 
            </DialogContent>
            </form>
            <DialogActions>
                <Button 
                    variant="outlined"
                    color="primary"
                    onClick={() => onClose()}
                >
                    Отменить
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    form="update-collection"
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}