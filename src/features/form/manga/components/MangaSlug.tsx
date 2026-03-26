"use client"

import EditInput from "@/features/edit/components/EditInput";
import { CircularProgress, InputAdornment, TextFieldProps } from "@mui/material";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { studioClientApi } from "@/lib/fetch/features/studio/client";
import { clientFetch } from "@/lib/fetch/clientFetch";


export async function validateSlug(slug: string) {
    const response = await clientFetch.get<{available: boolean}>(`/manga/check_slug?slug=${slug}`)

    return response.data.available;
}

export default function MangaSlug({value, slugChecking, defaultValue, error, ...props}: TextFieldProps & {slugChecking: boolean}) {
    return (
        <EditInput 
            label="Тег манги"
            caption="Уникальная последовательность из цифр и латинских букв. Используется в url. (обязательно)"
            placeholder="Введите тег"
            value={value}
            error={error}
            {...props}
            slotProps={{
                input: {
                    endAdornment: 
                        <InputAdornment position="end">
                            {(slugChecking) && (
                                <CircularProgress
                                    size={"20px"}
                                />
                            ) }
                            {(!slugChecking && value != "" && value != defaultValue && !error) && (
                                <CheckCircleRoundedIcon color="success"/>
                            )}
                            {(!slugChecking && value != "" && value != defaultValue && error) && (
                                <ErrorRoundedIcon color="error"/>
                            )}
                        </InputAdornment>
                }
            }} 
        />
    )
}