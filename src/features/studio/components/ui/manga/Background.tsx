"use client"

import EditImageInput from "@/components/edit/ImageInput";

export default function BackgroundInput({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {

    return (
        <EditImageInput 
            label="Фон"
            caption="Фоновое изображение тайтла"
            subCaption={`
                Рекомендуемое разрешение не меньше 1920x1080 пикселей в формате PNG или JPG и соотношении сторон 16к9. 
                Нельзя загружать анимированные картинки.
            `}
            value={value}
            onChange={onChange}
            width={1920}
            height={1080}
            aspectRatio={16/9}
            cropperProps={{
                style: {
                    width: "100%",
                    height: "400px"
                }
            }}
            imageStyles={{
                aspectRatio: "16/9",
                width: "320px",
            }}
        />
    )
}