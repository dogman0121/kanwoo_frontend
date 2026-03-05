"use client"

import EditInput from "@/features/edit/components/EditInput";
import { Box, TextFieldProps } from "@mui/material";


export default function ProfileName({...props}: TextFieldProps) {
    return (
        <EditInput
            label={"Название профиля"}
            caption={"Отображается рядом с аватаром."}
            sx={{
                mt: "10px"
            }}
            {...props}
        />
    )
}