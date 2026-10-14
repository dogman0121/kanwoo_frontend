"use client"

import EditInput from "@/components/edit/EditInput";
import { TextFieldProps } from "@mui/material";

export default function MangaName({value, error, helperText, ...props}: TextFieldProps) {
    return (
        <EditInput 
            label="Название"
            caption="На русском языке (обязательно)"
            inputProps={{
                placeholder: "Введите название",
                error: error,
                value: value,
                helperText: helperText,
                ...props
            }}
        />
    )
}