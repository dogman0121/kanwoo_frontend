"use client"

import EditInput from "@/components/edit/EditInput";

export default function MangaName({value, error, helperText}: {value?: string, error?: boolean, helperText?: string}) {
    return (
        <EditInput 
            label="Название"
            caption="На русском языке (обязательно)"
            inputProps={{
                placeholder: "Введите название",
                error: error,
                value: value,
                helperText: helperText
            }}
        />
    )
}