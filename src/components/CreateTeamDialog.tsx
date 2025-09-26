"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { teamClientApi } from "@/lib/api/features/team/client";
import AppSnackbar from "./AppSnackbar";
import { useRouter } from "next/navigation";

export default function CreateTeamDialog({onClose, ...props}: DialogProps){
    const [teamName, setTeamName] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const router = useRouter()

    const handleAddTeam = async() => {
        try {
            const team = await teamClientApi.addTeam(teamName);

            router.push(`/teams/${team.slug}`)

            setTeamName("")

            onClose?.({}, "backdropClick")
        }
        catch (e) {
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
                        value={teamName}
                        label="Название"
                        onInput={(event: ChangeEvent<HTMLInputElement>) => {
                            setTeamName(event.target.value)
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