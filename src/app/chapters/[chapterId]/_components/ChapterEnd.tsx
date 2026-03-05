import { BoxProps, Typography } from "@mui/material";

export default function ChapterEnd({...props}: BoxProps) {
    return (
        <Typography
            sx={{
                fontSize: "28px",
                textAlign: "center"
            }}
        >
            - Конец главы -
        </Typography>
    )
}