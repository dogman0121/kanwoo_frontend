"use client"

import { Box, CircularProgress, InputAdornment, TextFieldProps } from "@mui/material";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { profileClientApi } from "@/lib/fetch/features/profile/client.api";
import EditInput from "@/components/edit/EditInput";

export async function validateSlug(slug: string) {
    try {
        const response = await profileClientApi.checkProfileSlug(slug)

        return response.data.available;
    } catch (_) {
        return false;
    }
}


export default function ProfileSlug({value, defaultValue, slugChecking, error, helperText, ...props}: TextFieldProps & {slugChecking: boolean}) {
    return (
        <EditInput
            label={"Тег профиля"}
            caption={`
                Уникальная последовательность из цифр и латинских букв.
                Является уникальным идентификатором.
            `}
            inputProps={{
                error: value != defaultValue && error,
                helperText: value != defaultValue && helperText,
                value: value,
                sx: {
                    mt: "10px"
                },
                slotProps: {
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
                }, 
                ...props
            }}
        />
    )
}