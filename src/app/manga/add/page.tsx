import { Box, Typography } from "@mui/material";

export default function Page() {
    return (
        <Box
            sx={{
                maxWidth: "960px",
                mx: "auto",
                mt: "55px"
            }}
        >
            <Typography
                variant="h1"
            >
                Добавление тайтла
            </Typography>
        </Box>
    )
}