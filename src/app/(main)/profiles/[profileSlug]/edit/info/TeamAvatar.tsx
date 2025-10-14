"use client"

import AvatarCropper from "@/components/AvatarCropper"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { TextInputCaption, TextInputLabel } from "./InfoForm"

export default function TeamAvatar({
    value,
    onChange
}: {
    value: File | string | null, 
    onChange: (file: File | null) => void
}) {
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

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
            const url = URL.createObjectURL(value)
            setAvatarSrc(url)

            return () => URL.revokeObjectURL(url)
        } 
        else {
            setAvatarSrc(value)
        }
    }, [value])

    return (
        <Box>
            <TextInputLabel>
                Аватар команды
            </TextInputLabel>
            <TextInputCaption>
                Данная фотография отображается рядом с названием команды
            </TextInputCaption>
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "20px",
                    alignItems: "center"
                }}
            >
                <Avatar 
                    src={avatarSrc || undefined}
                    sx={{
                        width: "140px",
                        height: "140px"
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            py: "20px",
                            maxWidth: "300px"
                        }}
                    >
                        Рекомендуемое разрешение не меньше 96x96 пикселей в формате PNG или JPG.
                        Нельзя загружать анимированные картинки.
                    </Typography>
                    <Box>
                        <label>
                            <Button variant="contained" component="span">Изменить</Button>
                            <input 
                                id="avatar" 
                                type="file"  
                                accept=".jpeg, .jpg, .png, .gif"
                                onChange={handleInputFile}
                                hidden
                            />
                        </label>
                        <AvatarCropper
                            src={uncroppedSrc}
                            width={160}
                            height={160}
                            open={cropperOpen}
                            onClose={() => setCropperOpen(false)}
                            onCrop={onChange}
                            aspectRatio={1}
                        />
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            sx={{ml: "5px"}}
                            onClick={() => {onChange(null)}}
                        >Удалить</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}