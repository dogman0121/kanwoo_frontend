import { Typography } from "@mui/material";

export default function MangaCarouselTitle({children}: {children: string | React.ReactElement}) {
    return (
        <Typography
            sx={{
                fontSize: "16px",
                fontWeight: "600"
            }}
        >
            {children}
        </Typography>
    )
}