"use client"

import EditInput from "@/components/edit/EditInput";
import { InputAdornment, TextFieldProps, Typography } from "@mui/material";

export default function MangaDescription({value, ...props}: TextFieldProps) {
    return (
        <EditInput 
            label="Описание"
            caption="Помогает читать о тайтле пользователям. Участвует при поиске информации"
            inputProps={{
                placeholder: "Введите описание",
                minRows: 5,
                multiline: true,
                value: value,
                slotProps: {
                    input: {
                        endAdornment: 
                            <InputAdornment position="end"
                                sx={{
                                    alignSelf: "end"
                                }}
                            >
                                <Typography
                                    variant="caption"
                                >
                                    {(value as string | undefined)?.length}/1000
                                </Typography>
                            </InputAdornment>
                    }
                },
                ...props
            }}
        />
    )
}