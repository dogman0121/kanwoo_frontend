import EditInputCaption from "@/features/edit/EditInputCaption";
import EditInputLabel from "@/features/edit/EditInputLabel";
import { Box, Button, Paper, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import theme from "@/theme";
import { ChangeEvent, useEffect, useState } from "react";
import AvatarCropper from "@/components/AvatarCropper";


export default function PromoBackground({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    const [backgroundUrl, setBackgroundUrl] = useState<null | string>(null);
    
    const [cropperOpen, setCropperOpen] = useState(false)

    const [uncroppedSrc, setUncroppedSrc] = useState("");

    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files?.length)
            return;

        const avatarBytes = URL.createObjectURL(files[0]);

        event.target.value = "";

        URL.revokeObjectURL(uncroppedSrc)

        setUncroppedSrc(avatarBytes);
        setCropperOpen(true);
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
            <EditInputLabel>Фон</EditInputLabel>
            <EditInputCaption>Показывается на главной странице в главном слайдере. Если не задано, используется обычный фон</EditInputCaption>
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
                            aspectRatio:"2/1",
                            width: "300px",
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
                            aspectRatio: "2/1",
                            width: "300px",
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
                        Рекомендуемое разрешение не меньше 1600x800 пикселей в формате PNG или JPG. Нельзя загружать анимированные картинки.
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
                        <AvatarCropper
                            src={uncroppedSrc}
                            width={1600}
                            height={800}
                            open={cropperOpen}
                            onClose={() => setCropperOpen(false)}
                            onCrop={onChange}
                            aspectRatio={2/1}
                        />
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