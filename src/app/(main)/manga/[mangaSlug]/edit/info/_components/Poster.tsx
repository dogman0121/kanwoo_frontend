import EditInputCaption from "@/features/edit/EditInputCaption";
import EditInputLabel from "@/features/edit/EditInputLabel";
import { Box, Button, Paper, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ChangeEvent, useEffect, useState } from "react";
import Poster from "@/components/Poster";


export default function PosterInput({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    const [posterUrl, setPosterUrl] = useState<null | string>(null);

    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const MAX_SIZE = 4 * 1048 * 1048;

        const files = event.target.files;

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
            setPosterUrl(url)
            return () => {URL.revokeObjectURL(url)}
        }
        else
            setPosterUrl(value)
    }, [value])

    return (
        <Box>
            <EditInputLabel>Постер</EditInputLabel>
            <EditInputCaption>Главное изображение тайтла</EditInputCaption>
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    columnGap: "20px"
                }}
            >
                {posterUrl == null ?
                    <Paper
                        sx={{
                            borderRadius: "3% 2%",
                            aspectRatio:"2/3",
                            width: "150px",
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
                    <Poster
                        src={posterUrl}
                        width="150px"
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
                        Максимальный размер файла не должен превышать 4МБ. Рекомендуемое соотношение сторон 2 к 3. Нельзя загружать анимированные картинки.
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