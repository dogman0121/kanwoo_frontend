import { Typography, TypographyProps } from "@mui/material";

interface WrappedTextProps {
    lines: number
}

export default function WrappedText({lines, sx, ...props}: TypographyProps & WrappedTextProps) {
    return (
        <Typography 
            sx={{
                lineClamp: lines,
                "-webkit-line-clamp": lines,
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",

                ...sx
            }}
            
            {...props}
        />
    )
}