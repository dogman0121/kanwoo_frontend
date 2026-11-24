"use client"

import EditImageInput from "@/components/edit/ImageInput";

export default function PosterInput({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    

    return (
        <EditImageInput 
            label="Постер"
            caption="Главное изображение тайтла"
            subCaption={`
                Рекомендуемое разрешение не меньше 600x900 пикселей в формате PNG или JPG и соотношении сторон 2к3. 
                Нельзя загружать анимированные картинки.
            `}
            value={value}
            onChange={onChange}
            aspectRatio={2/3}
            cropperDisabled
            imageStyles={{
                width: "150px",
                aspectRatio: "2/3"
            }}
        />
    )
}