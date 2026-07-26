"use client"

import EditInput from "@/features/edit/components/EditInput";
import { TextFieldProps } from "@mui/material";

export default function MangaName({...props}: TextFieldProps) {
    return (
        <EditInput 
            label="Название"
            caption="На русском языке (обязательно)"
            placeholder="Введите название"
            {...props}
        />
    )
}