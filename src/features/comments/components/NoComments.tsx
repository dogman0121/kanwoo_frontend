import { Box, Typography } from "@mui/material";

export default function NoComments() {
    return (
        <Box
            sx={{
                py: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Typography fontSize={"24px"}>
                Комментариев нет
            </Typography>
            <Typography
                fontSize={"18px"}
            >
                Будтье первыми!
            </Typography>
        </Box>
    )
}