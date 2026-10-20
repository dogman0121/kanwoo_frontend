import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRef } from "react";
import { Cropper, ReactCropperElement, ReactCropperProps } from "react-cropper";
import { v4 as uuid } from "uuid";
import "cropperjs/dist/cropper.css";

export default function ImageCropperDialog({
    imageSrc,
    open,
    onCropp,
    onClose,
    width,
    height,
    aspectRatio,
    cropperProps
}: {
    imageSrc: string,
    open: boolean,
    width?: number,
    height?: number,
    aspectRatio?: number,
    onCropp?: (file: File) => void,
    onClose: () => void,
    cropperProps?: ReactCropperProps
}) {
    const cropperRef = useRef<ReactCropperElement>(null)

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;

        if (!cropper)
            return;
        
        const canvas = cropper.getCroppedCanvas({
            width: width, 
            height: height,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });

        canvas.toBlob((blob) => {
            if (!blob)
                return;

            const file = new File([blob], `${uuid()}.jpg`, {
                type: 'image/jpeg'
            });

            onCropp?.(file);
        }, 'image/jpeg', 0.95);

        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiPaper-root": {
                    maxWidth: "none",
                    width: "auto",
                }
            }}
        >
            <DialogTitle>Обработка изображения</DialogTitle>
            <DialogContent
                sx={{
                    overflow: "hidden"
                }}
            >
                <Cropper 
                    ref={cropperRef}
                    src={imageSrc}
                    cropBoxResizable={false}
                    cropBoxMovable={false}
                    viewMode={1}
                    dragMode="move"
                    aspectRatio={aspectRatio}
                    {...cropperProps}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => onClose()}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handleCrop()}
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}