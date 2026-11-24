import { Typography, TypographyProps } from "@mui/material"

export default function EditCaption(props: TypographyProps){
    return (
        <Typography 
            variant="caption"
            color="text.secondary"
            {...props}
        />
    )
}