"use client"

import EditInput from "@/features/edit/components/EditInput";
import { TextFieldProps } from "@mui/material";

export default function MangaYear({...props}: TextFieldProps) {
    return (
        <EditInput 
            label="Год выпуска"
            type="number"
            {...props}
        />
    )
}