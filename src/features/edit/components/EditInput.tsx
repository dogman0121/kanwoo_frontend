import { Box, styled, TextField, TextFieldProps } from "@mui/material";
import EditInputLabel from "./EditInputLabel";
import EditInputCaption from "./EditInputCaption";
import EditInputInput from "./EditInputInput";


export default function EditInput({label, caption, sx, ...props}: TextFieldProps & {caption?: string}) {
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            {label && (
                <EditInputLabel>{label}</EditInputLabel>
            )}
            {caption && (
                <EditInputCaption>{caption}</EditInputCaption>
            )}
            <EditInputInput
                sx={{
                    mt: (label || caption) ? "10px": undefined,
                    ...sx
                }}
                {...props}
            />
        </Box>
    )
}