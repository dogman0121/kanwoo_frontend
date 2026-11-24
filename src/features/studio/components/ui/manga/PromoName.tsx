"use client"

import EditImageInput from "@/components/edit/ImageInput";

export default function PromoNameInput({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    
    return (
        <EditImageInput 
            label="Промо название"
            caption="Название тайтла красивым шрифтом. Используется в промо материалах, например, на главной странице."
            subCaption={`
                Максимальный размер файла не должен превышать 4мб.
            `}
            value={value}
            onChange={onChange}
            aspectRatio={4/1}
            cropperDisabled
            imageStyles={{
                width: "300px",
                aspectRatio: "3"
            }}
            maxFileSize={4 * 1024 * 1024}
        />
    )
}