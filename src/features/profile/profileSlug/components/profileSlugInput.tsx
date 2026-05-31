"use client"

import { CircularProgress, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function ProfileSlugInput({value, defaultValue, slugChecking, error, ...props}: TextFieldProps & {slugChecking?: boolean}) {
    return (
        <TextField
            sx={{
                mt: "10px"
            }}
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                    endAdornment: 
                        <>
                            {value && value != defaultValue && (
                                <InputAdornment position="end">
                                    {slugChecking ? 
                                        <CircularProgress
                                            size={"20px"}
                                        />
                                        :
                                        <>
                                            {(!error) && (
                                                <CheckCircleRoundedIcon color="success"/>
                                            )}
                                            {(error) && (
                                                <ErrorRoundedIcon color="error"/>
                                            )}
                                        </>
                                    }
                                </InputAdornment>
                            )}
                        </>
                }
            }} 
            error={error}
            value={value}
            {...props}
        />
    )
}