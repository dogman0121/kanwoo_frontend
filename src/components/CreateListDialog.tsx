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
    InputLabel, 
    ListItemIcon, 
    MenuItem,
    Select,  
    styled, 
    TextField, 
    Typography
} from "@mui/material";
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import List from "@/types/list";
import AppSnackbar from "./AppSnackbar";

const MySelect = styled(Select)(() => ({
    borderRadius: "12px"
}))

export default function CreateListDialog({onClose, ...props}: Omit<DialogProps, "children">) {
    const [listName, setListName] = useState("");
    const [listVisibility, setListVisibility] = useState<"private" | "public" | "link">("private");

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const router = useRouter()

    const handleAddList = async () => {
        try {
            
            onClose?.({}, "backdropClick")
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
                <DialogTitle>Создание списка</DialogTitle>
                <DialogContent>
                    <TextField 
                        fullWidth
                        value={listName}
                        label="Название"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setListName(event.target.value)
                        }}
                    />
                    <FormControl fullWidth
                        sx={{
                            mt: "15px"
                        }}
                    >
                        <InputLabel id="visibility-label">Доступ</InputLabel>
                        <MySelect
                            labelId="visibility-label"
                            id="visibility-select"
                            fullWidth
                            value={listVisibility}
                            label="Доступ"
                            onChange={(event) => {
                                setListVisibility(event.target.value as "private" | "public" | "link");
                            }}
                            renderValue={(selected: unknown) => (
                                <Typography>
                                    {selected == "public" && "Публичный"}
                                    {selected == "link" && "По ссылке"}
                                    {selected == "private" && "Приватный"}
                                </Typography>
                            )}
                        >
                            <MenuItem value={"public"}>
                                <ListItemIcon>
                                    <PublicRoundedIcon />
                                </ListItemIcon>
                                <Box>
                                    <Typography>Публичный</Typography>
                                    <Typography variant="caption">Доступен всем пользователям</Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem value={"link"}>
                                <ListItemIcon>
                                    <LinkRoundedIcon />
                                </ListItemIcon>
                                <Box>
                                    <Typography>По ссылке</Typography>
                                    <Typography variant="caption">Доступен тем, у кого есть ссылка</Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem value={"private"}>
                                <ListItemIcon>
                                    <LockRoundedIcon />
                                </ListItemIcon>
                                <Box>
                                    <Typography>Приватный</Typography>
                                    <Typography variant="caption">Доступен только вам</Typography>
                                </Box>
                            </MenuItem>
                        </MySelect>
                    </FormControl>   
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
                        onClick={handleAddList}
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