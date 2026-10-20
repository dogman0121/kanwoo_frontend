import { Box, Button, CSSProperties, Paper, Typography } from "@mui/material"
import EditLabel from "./Label"
import EditCaption from "./Caption"
import { ChangeEvent, useEffect, useState } from "react"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageCropperDialog from "../ImageCropperDialog"
import { ReactCropperProps } from "react-cropper";

export default function EditImageInput({
    label,
    caption,
    subCaption,
    onChange,
    value,
    cropperDisabled,
    width,
    height,
    aspectRatio,
    cropperProps,
    imageStyles,
    maxFileSize
}: {
    label: string,
    caption: string,
    subCaption?: string,
    value: File | null | string,
    onChange?: (value: File | null) => void,
    cropperDisabled?: boolean,
    width?: number,
    height?: number,
    aspectRatio?: number,
    maxFileSize?: number,
    cropperProps?: ReactCropperProps,
    imageStyles?: CSSProperties
}) {
    const defaultMaxSize = 10 * 1048 * 1048

    const [innerValue, setInnerValue] = useState<string | null>(null)

    const [cropperURL, setCropperURL] = useState("")
    const [cropperOpen, setCropperOpen] = useState(false)

    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files?.length)
            return;

        const file = files[0]
        if (file.size > (maxFileSize ?? defaultMaxSize)) {
            throw new Error("The file size is too large")
        }

        const avatarBytes = URL.createObjectURL(file);

        event.target.value = "";

        URL.revokeObjectURL(cropperURL)

        if (!cropperDisabled) {
            setCropperURL(avatarBytes)
            setCropperOpen(true)
        } else {
            onChange?.(file)
        }
    }

    useEffect(() => {
        if (value instanceof File) {
            setInnerValue(URL.createObjectURL(value))

            return () => {innerValue != null && URL.revokeObjectURL(innerValue)}
        } else if (typeof value == "string") {
            setInnerValue(value)
        } else {
            setInnerValue(null)
        }
    }, [value])

    return (
        <Box>
            {label && (
                <EditLabel>{label}</EditLabel>
            )}
            {caption && (
                <EditCaption>{caption}</EditCaption>
            )}
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    columnGap: "20px"
                }}
            >
                {innerValue == null ?
                    <Paper
                        sx={{
                            borderRadius: 1,
                            border: "2px dashed",
                            borderColor: "divider",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "none",
                            ...imageStyles                     
                        }}
                    >   
                        <UploadFileIcon/>
                        <Typography
                            mt={1}
                        >
                            Файл не выбран
                        </Typography>
                    </Paper>
                    :
                    <img  
                        src={innerValue}
                        style={{
                            borderRadius: "6px",
                            ...imageStyles
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
                    {subCaption && (
                        <EditCaption
                            sx={{
                                py: "20px",
                                maxWidth: "300px"
                            }}
                        >
                            {subCaption}
                        </EditCaption>
                    )}
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
                        <ImageCropperDialog
                            imageSrc={cropperURL}
                            width={width}
                            height={height}
                            aspectRatio={aspectRatio}
                            open={cropperOpen}
                            onClose={() => setCropperOpen(false)}
                            onCropp={onChange}
                            cropperProps={cropperProps}
                        />
                        <Button 
                            variant="contained" 
                            color="inherit" 
                            sx={{ml: "5px"}}
                            onClick={() => onChange?.(null)}
                        >
                            Удалить
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}