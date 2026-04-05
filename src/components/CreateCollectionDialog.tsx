"use client"

import { 
    Box,
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogProps, 
    DialogTitle,
    Select,  
    styled, 
    TextField
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import AppSnackbar from "./AppSnackbar";
import PrivacySelect from "./PrivacySelect";
import { Controller, useForm } from "react-hook-form";
import { clientFetch } from "@/lib/fetch/clientFetch";
import ProfileCollection from "@/types/profile/profileCollection";
import Collection from "@/types/collection/collection";

interface CreateCollectionFormSchema {
    name: string
    privacy: number
}

export default function CreateCollectionDialog({
    onClose, 
    onCreate, 
    ...props
}: DialogProps & {onCreate: (collection: Collection) => void}) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const {control, handleSubmit} = useForm<CreateCollectionFormSchema>({
        defaultValues: {
            name: "",
            privacy: 1
        }
    })

    const onSubmit = async (data: CreateCollectionFormSchema) => {
        try {
            const response = await clientFetch.post<ProfileCollection>("/collections", {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        name: data.name,
                        privacy: data.privacy
                    }
                )
            })
            
            onCreate(response.data)
        }
        catch (e) {
            setSnackbarOpen(true);
        }
    }

    return (
        <>
            <Dialog 
                onClose={onClose}
                {...props}
            >
                <form id="create-collection" onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Создание списка</DialogTitle>
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
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={() => onClose?.({}, "escapeKeyDown")}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Создать
                        </Button>
                    </DialogActions>
                </form>
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