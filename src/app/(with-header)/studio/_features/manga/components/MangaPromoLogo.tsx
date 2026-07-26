"use client"

import EditInputCaption from "@/features/edit/components/EditInputCaption";
import EditInputLabel from "@/features/edit/components/EditInputLabel";
import { Box, Button, Paper, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ChangeEvent, useEffect, useState } from "react";



export default function MangaPromoLogo({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    const [backgroundUrl, setBackgroundUrl] = useState<null | string>(null);

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
            setBackgroundUrl(url)
            return () => {URL.revokeObjectURL(url)}
        }
        else
            setBackgroundUrl(value)
    }, [value])

    return (
        <Box>
            <EditInputLabel>Лого</EditInputLabel>
            <EditInputCaption>Изображение героя или символа тайтла. Показывается на главной странице в слайдере</EditInputCaption>
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    columnGap: "20px"
                }}
            >
                {backgroundUrl == null ?
                    <Paper
                        sx={{
                            borderRadius: "12px",
                            aspectRatio:"3/2",
                            width: "260px",
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
                        src={backgroundUrl}
                        style={{
                            borderRadius: "12px",
                            maxWidth: "300px",
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
                        Максимальный размер файла 4МБ. Рекомендуемый формат PNG или GIF
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
                                accept=".jpeg, .jpg, .png, .gif, .webp"
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