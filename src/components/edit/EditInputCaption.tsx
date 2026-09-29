import { Typography, TypographyProps } from "@mui/material"

export default function EditInputCaption(props: TypographyProps){
    return (
        <Typography 
            variant="caption"
            color="text.secondary"
            {...props}
        />
    )
}