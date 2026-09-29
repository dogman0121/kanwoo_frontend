"use client"

import { 
    Box,
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    TextField
} from "@mui/material";
import { useState } from "react";
import AppSnackbar from "../../../components/AppSnackbar";
import PrivacySelect from "../../../components/PrivacySelect";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "@/lib/state/hooks";
import { createCollection } from "../states/lib/thunks";

interface CreateCollectionFormSchema {
    name: string
    privacy: number
}


export interface CreateDialogProps {
    open: boolean,
    onClose: () => void,
}

export default function CreateDialog({
    open,
    onClose,
}: CreateDialogProps) {
    const dispatch = useAppDispatch()

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const {control, handleSubmit} = useForm<CreateCollectionFormSchema>({
        defaultValues: {
            name: "",
            privacy: 1
        }
    })

    const onSubmit = async (data: CreateCollectionFormSchema) => {
        try {
            await dispatch(createCollection({name: data.name, privacyId: data.privacy})).unwrap()

            onClose()
        }
        catch (e) {
            setSnackbarOpen(true);
        }
    }

    return (
        <>
            <Dialog 
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Создание списка</DialogTitle>
                <form id="create-collection" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Controller 
                            control={control}
                            name="name"
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
                        onClick={() => onClose?.()}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        form="create-collection"
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={"При создании списка произошла ошибка"}
                variant="error"
            />
        </>
    )
}