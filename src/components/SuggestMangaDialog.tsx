"use client"

import { clientFetch } from "@/lib/api/clientFetch";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import AppSnackbar from "./AppSnackbar";

export default function SuggestMangaDialog({onClose, ...props}: Omit<DialogProps, "children">) {
    const [name, setName] = useState("")

    const [link, setLink] = useState("")

    const [comment, setComment] = useState("")

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

    const handleSuggest = async () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("link", link)
        formData.append("comment", comment);

        const response = await clientFetch.post("/manga/suggestions", {
            body: formData
        })

        const {data} = await response.json()

        if (data?.success) {
            setSuccessSnackbarOpen(true)
            onClose?.({}, "escapeKeyDown")
        }
    } 
    
    return (
        <>
            <Dialog onClose={onClose} {...props}>
                <DialogTitle>Предложение манги</DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "15px"
                    }}
                >
                    <TextField
                        required
                        fullWidth 
                        label="Название"
                        value={name}
                        helperText="Названиие манги"
                        onInput={(event: ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value)
                        }}
                    />
                    <TextField 
                        fullWidth
                        required
                        label="Ссылка"
                        type="url"
                        helperText="Ссылка на источник (MAL и др.)"
                        value={link}
                        onInput={(event: ChangeEvent<HTMLInputElement>) => {
                            setLink(event.target.value)
                        }}
                    />
                    <TextField 
                        fullWidth
                        label="Комментарий"
                        helperText="Комментарий к тайтлу (все, что может быть полезно)"
                        multiline
                        rows={3}
                        value={comment}
                        onInput={(event: ChangeEvent<HTMLInputElement>) => {
                            setComment(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                        onClick={() => onClose?.({}, "escapeKeyDown")}
                    >Отмена</Button>
                    <Button variant="contained"
                        onClick={handleSuggest}
                    >Отправить</Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message={"Предложение было успешно зарегистрировано"}
                variant="success"
            />
        </>
    )
}