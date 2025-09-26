"use client"

import { 
    Box,
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogProps, 
    DialogTitle, 
    FormControl, 
    IconButton, 
    InputLabel, 
    ListItemIcon, 
    MenuItem,
    Select,  
    styled, 
    TextField, 
    Typography
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import AppSnackbar from "./AppSnackbar";
import { clientFetch } from "@/lib/api/clientFetch";
import { useAppSelector } from "@/lib/state/hooks";

const MySelect = styled(Select)(() => ({
    borderRadius: "12px"
}))

export default function ReportMangaDialog({onClose, ...props}: Omit<DialogProps, "children">) {
    const mangaSlug = useAppSelector(state => state.manga.manga?.slug)

    const [comment, setComment] = useState("");

    const [reportType, setReportType] = useState("")

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

    const handleReport = async () => {
        const formData = new FormData();

        formData.append("type", reportType);
        formData.append("comment", comment);

        const response = await clientFetch.post(`/manga/${mangaSlug}/reports`, {
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
            <Dialog 
                onClose={onClose}
                {...props}
            >
                <DialogTitle>Жалоба</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="report-label">Доступ</InputLabel>
                        <MySelect
                            labelId="report-label"
                            required
                            id="report-select"
                            fullWidth
                            value={reportType}
                            label="Доступ"
                            onChange={(event) => {
                                setReportType(event.target.value as string);
                            }}
                        >
                            <MenuItem value={"1"}>
                                <Typography>Неверная информация</Typography>
                            </MenuItem>
                            <MenuItem value={"2"}>
                                <Typography>Дубликат</Typography>
                            </MenuItem>
                            <MenuItem value={"3"}>
                                <Typography>Запрещенный контент</Typography>
                            </MenuItem>
                            <MenuItem value={"4"}>
                                <Typography>Запрещенный контент</Typography>
                            </MenuItem>
                        </MySelect>
                    </FormControl> 
                    <TextField 
                        fullWidth
                        multiline
                        rows={3}
                        value={comment}
                        label="Комментарий"
                        onInput={(event: ChangeEvent<HTMLInputElement>) => {
                            setComment(event.target.value)
                        }}
                        sx={{
                            mt: "15px"
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
                        onClick={handleReport}
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message={"Жалоба успешно отправлена"}
                variant="success"
            />
        </>
    )
}