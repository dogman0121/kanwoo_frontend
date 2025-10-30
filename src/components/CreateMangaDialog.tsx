"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { profileClientApi } from "@/lib/api/features/profile/client";
import AppSnackbar from "./AppSnackbar";
import { useRouter } from "next/navigation";

export default function CreateMangaDialog({onClose, ...props}: DialogProps){
    const [mangaName, setMangaName] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const router = useRouter()

    const handleAddTeam = async() => {
        try {
            const team = await profileClientApi.addProfile(mangaName);

            router.push(`/teams/${team.slug}`)

            setMangaName("")

            onClose?.({}, "backdropClick")
        }
        catch (_) {
            setSnackbarOpen(true)
        }
    }

    return (
        <>
            <Dialog onClose={onClose} {...props}>
                <DialogTitle>Создание команды</DialogTitle>
                <DialogContent>
                    <TextField 
                        fullWidth
                        value={mangaName}
                        label="Название"
                        onInput={(event: ChangeEvent<HTMLInputElement>) => {
                            setMangaName(event.target.value)
                        }}
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
                        onClick={handleAddTeam}
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