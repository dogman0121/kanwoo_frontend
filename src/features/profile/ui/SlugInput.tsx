"use client"

import { CircularProgress, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EditInput from "@/features/edit/components/EditInput";
import { clientFetch } from "@/lib/fetch/clientFetch";

export async function validateSlug(slug: string) {
    try {
        const response = await clientFetch.get<{available: boolean}>(`/profiles/check_slug?slug=${slug}`)

        return response.data.available;
    } catch (_) {
        return false;
    }
}


export default function SlugInput({value, defaultValue, slugChecking, error, ...props}: TextFieldProps & {slugChecking: boolean}) {
    return (
        <TextField
            sx={{
                mt: "10px"
            }}
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
            error={error}
            value={value}
            {...props}
        />
    )
}