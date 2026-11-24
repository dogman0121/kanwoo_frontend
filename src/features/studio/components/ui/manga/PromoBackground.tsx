"use client"

import EditImageInput from "@/components/edit/ImageInput";

export default function PromoBackgroundInput({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    

    return (
        <EditImageInput 
            label="Промо фон"
            caption="Фоновое изображение тайтла. Используется в промо материалах, например, на главной странице."
            subCaption={`
                Рекомендуемое разрешение не меньше 1600x640 пикселей в формате PNG или JPG и соотношении сторон 5к2. 
                Нельзя загружать анимированные картинки.
            `}
            value={value}
            onChange={onChange}
            aspectRatio={5/2}
            imageStyles={{
                width: "300px",
                aspectRatio: "5/2"
            }}
        />
    )
}