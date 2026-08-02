import { Typography, TypographyProps } from "@mui/material";

interface WrappedTextProps {
    lines: number
}

export default function WrappedText({lines, sx, ...props}: TypographyProps & WrappedTextProps) {
    return (
        <Typography 
            sx={{
                lineClamp: `${lines}`,
                WebkitLineClamp: `${lines}`,
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",

                ...sx
            }}
            
            {...props}
        />
    )
}