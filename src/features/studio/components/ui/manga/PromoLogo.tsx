"use client"

import EditImageInput from "@/components/edit/ImageInput";

export default function PromoLogoInput({
    value,
    onChange
}: {
    value: File | string | null,
    onChange: (file: File | null) => void,
}) {
    

    return (
        <EditImageInput 
            label="Промо лого"
            caption="Герой или символ тайтла. Используется в промо материалах, например, на главной странице."
            subCaption={`
                Максимальный размер файла не должен превышать 4мб.
            `}
            value={value}
            onChange={onChange}
            aspectRatio={1}
            cropperDisabled
            imageStyles={{
                width: "150px",
                aspectRatio: "4/7"
            }}
            maxFileSize={4 * 1024 * 1024}
        />
    )
}