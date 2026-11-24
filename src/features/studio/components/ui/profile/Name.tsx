"use client"

import EditInput from "@/components/edit/Input";
import { Box, TextFieldProps } from "@mui/material";


export default function ProfileName({...props}: TextFieldProps) {
    return (
        <EditInput
            label={"Название профиля"}
            caption={"Отображается рядом с аватаром."}
            inputProps={{
                sx: {
                    mt: "10px"
                },
                ...props
            }}
        />
    )
}