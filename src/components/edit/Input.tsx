import { Box, BoxProps, styled, TextField, TextFieldProps } from "@mui/material";
import EditInputLabel from "./Label";
import EditInputCaption from "./Caption";
import EditInputInput from "./InputInput";

export interface EditInputProps {
    label?: string
    caption?: string
    boxProps?: BoxProps,
    inputProps?: TextFieldProps
}

export default function EditInput({
    label, 
    caption, 
    boxProps, 
    inputProps
}: EditInputProps) {
    return(
        <Box
            {...boxProps}
            sx={{
                display: "flex",
                flexDirection: "column",

                ...boxProps?.sx
            }}
        >
            {label && (
                <EditInputLabel>{label}</EditInputLabel>
            )}
            {caption && (
                <EditInputCaption>{caption}</EditInputCaption>
            )}
            <EditInputInput
                {...inputProps}
                sx={{                    
                    mt: (label || caption) ? "10px": undefined,
                    ...inputProps?.sx
                }}
            />
        </Box>
    )
}