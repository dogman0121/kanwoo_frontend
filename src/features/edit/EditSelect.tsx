import { Box, Select, SelectProps } from "@mui/material";
import EditInputLabel from "./EditInputLabel";
import EditInputCaption from "./EditInputCaption";

export default function EditSelect({label, caption, sx, ...props}: SelectProps & {caption?: string}) {
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
            <Select
                sx={{
                    mt: (label || caption) ? "10px": undefined,
                    "& .MuiSelect-outlined": {
                        padding: "10px 14px"
                    } ,
                    ...sx
                }}
                {...props}
            />
        </Box>
    )
}