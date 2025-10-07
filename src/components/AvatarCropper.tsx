"use client"
import { Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { v4 as uuidv4 } from 'uuid';

interface AvatarCropperProps {
    src: string,
    width: number,
    height: number,
    aspectRatio: number,
    open: boolean,
    onClose: () => void,
    onCrop: (file: File) => void
}

export default function AvatarCropper({
    src, 
    open, 
    onClose, 
    width, 
    height, 
    onCrop
}: AvatarCropperProps) {
    const cropperRef = useRef<ReactCropperElement | null>(null);

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

            const file = new File([blob], `${uuidv4()}.jpg`, {
                type: 'image/jpeg'
            });
            onCrop(file);
        }, 'image/jpeg', 0.95);

        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "600px"
                }
            }}
        >
            <DialogTitle>Добавление изображения</DialogTitle>
            <DialogContent >
                <Cropper
                    style={{height: "400px", width: "100%"}} 
                    aspectRatio={1}
                    ref={cropperRef}
                    cropBoxResizable={false}
                    cropBoxMovable={false}
                    viewMode={1}
                    dragMode="move"
                    src={src}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>Отменить</Button>
                <Button variant="contained" onClick={handleCrop}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    )
}