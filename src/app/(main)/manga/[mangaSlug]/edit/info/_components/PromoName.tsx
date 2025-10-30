import EditInputCaption from "@/features/edit/EditInputCaption";
import EditInputLabel from "@/features/edit/EditInputLabel";
import { Box, Button, Paper, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import theme from "@/theme";
import { ChangeEvent, useEffect, useState } from "react";
import AvatarCropper from "@/components/AvatarCropper";


export default function PromoName({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    const [nameUrl, setNameUrl] = useState<null | string>(null);
    
    const [cropperOpen, setCropperOpen] = useState(false)

    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const MAX_SIZE = 4 * 1048 * 1048;

        if (!files?.length)
            return;

        const addedFile = files[0];

        if (addedFile.size > MAX_SIZE)
            event.target.value = "";

        onChange(addedFile);
    }

    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            setNameUrl(url)
            return () => {URL.revokeObjectURL(url)}
        }
        else
            setNameUrl(value)
    }, [value])

    return (
        <Box>
            <EditInputLabel>Название</EditInputLabel>
            <EditInputCaption>Название красивым шрифтом в виде картинки. Показывается на главной странице в слайдереа</EditInputCaption>
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    columnGap: "20px"
                }}
            >
                {nameUrl == null ?
                    <Paper
                        sx={{
                            borderRadius: "12px",
                            aspectRatio:"16/9",
                            width: "250px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "none"                        
                        }}
                    >   
                        <UploadFileIcon sx={{width: "32px", height: "32px"}}/>
                        <Typography>Файл не выбран</Typography>
                    </Paper>
                    :
                    <img  
                        src={nameUrl}
                        style={{
                            borderRadius: "12px",
                            maxWidth: "250px",
                        }}
                    />
                }
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <EditInputCaption
                        sx={{
                            py: "20px",
                            maxWidth: "300px"
                        }}
                    >
                        Максимальный размер файла не должен превышать 4МБ. Рекомендуемый формат PNG
                    </EditInputCaption>
                    <Box>
                        <label>
                            <Button 
                                variant="contained"
                                component="span"
                            >
                                Изменить
                            </Button>
                            <input 
                                id="background"
                                type="file"
                                accept=".jpeg, .jpg, .png, .gif"
                                onChange={handleInputFile}
                                hidden
                            />
                        </label>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            sx={{ml: "5px"}}
                            onClick={() => onChange(null)}
                        >
                            Удалить
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}